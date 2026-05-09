// ── PARSE CSV ──
function parseCSV(raw) {
  const lines = raw.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    // Simple CSV parse (handles the case where there are no quoted fields with commas)
    const cols = line.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = (cols[i] || '').trim(); });
    return obj;
  }).map(r => ({
    folder: r.folder,
    filename: r.filename,
    song_name: r.song_name,
    alt_versions: r.alt_versions === 'TRUE',
    tags: r.tags ? r.tags.split('|').map(t => t.trim()).filter(Boolean) : [],
		duration: 	r.duration ? parseInt(r.duration) : null,
    energy:     r.energy     ? parseInt(r.energy)     : null,
    brightness: r.brightness ? parseInt(r.brightness) : null,
    speed:      r.speed      ? parseInt(r.speed)      : null,
    complexity: r.complexity ? parseInt(r.complexity) : null,
    ben_score:  r.ben_score  ? parseInt(r.ben_score)  : null,
  }));
}

// ── PARSE DURATION ──
function parseDuration(len) {
	min = Math.floor(len/60);
	sec = Math.floor(len%60);
	sec = (sec < 10) ? '0'+sec : sec;
	return min+':'+sec;
}

const SONGS = parseCSV(CSV_RAW);

// ── STATE ──
const state = {
  search: '',
  onlyAlt: false,
  activeTags: new Set(),
  sliders: {
    energy:     { min: 1, max: 5 },
    brightness: { min: 1, max: 5 },
    speed:      { min: 1, max: 5 },
    complexity: { min: 1, max: 5 },
    ben_score:  { min: 1, max: 5 },
  },
};

let currentAudio = null;
let currentCardEl = null;
let rafId = null;

// ── BUILD SLIDERS ──
const SCORE_FIELDS = [
  { key: 'energy',     label: 'Energy',     cls: 'energy' },
  { key: 'brightness', label: 'Brightness', cls: 'brightness' },
  { key: 'speed',      label: 'Speed',      cls: 'speed' },
  { key: 'complexity', label: 'Complexity', cls: 'complexity' },
  { key: 'ben_score',  label: 'Ben Score',  cls: 'ben_score' },
];

const sliderContainer = document.getElementById('slider-container');

SCORE_FIELDS.forEach(({ key, label }) => {
  const wrap = document.createElement('div');
  wrap.className = 'slider-item';
  wrap.innerHTML = `
    <div class="slider-header">
      <span class="slider-name">${label}</span>
      <span class="slider-val" style="color: var(--${key})" id="val-${key}">1 – 5</span>
    </div>
    <div class="range-wrap" id="rw-${key}">
      <div class="range-track"></div>
      <div class="range-fill" id="rf-${key}" style="background: var(--${key})"></div>
      <input type="range" id="rmin-${key}" min="1" max="5" value="1" step="1">
      <input type="range" id="rmax-${key}" min="1" max="5" value="5" step="1">
    </div>`;
  sliderContainer.appendChild(wrap);

  const rMin = wrap.querySelector(`#rmin-${key}`);
  const rMax = wrap.querySelector(`#rmax-${key}`);
  const valLabel = wrap.querySelector(`#val-${key}`);
  const fill = wrap.querySelector(`#rf-${key}`);

	function updateSlider() {
		let lo = parseInt(rMin.value), hi = parseInt(rMax.value);
		if (lo > hi) { if (this === rMin) { rMin.value = hi; lo = hi; } else { rMax.value = lo; hi = lo; } }
		state.sliders[key].min = lo;
		state.sliders[key].max = hi;
		valLabel.textContent = lo === hi ? `${lo}` : `${lo} – ${hi}`;
		const pct = (v) => ((v - 1) / 4) * 100;
		fill.style.left  = pct(lo) + '%';
		fill.style.right = (100 - pct(hi)) + '%';
		rMin.style.zIndex = (rMin.value == rMin.max) ? 10 : 1;
		rMax.style.zIndex = (rMax.value == rMax.min) ? 10 : 1;
		render();
	}

	rMin.addEventListener('input', updateSlider);
	rMax.addEventListener('input', updateSlider);
  updateSlider.call(rMin);
});

// ── BUILD TAGS ──
const allTags = [...new Set(SONGS.flatMap(s => s.tags))].sort();
const tagCloud = document.getElementById('tag-cloud');
const noTags = document.getElementById('no-tags');

if (allTags.length > 0) {
  noTags.remove();
  allTags.forEach(tag => {
    const chip = document.createElement('button');
    chip.className = 'tag-chip';
    chip.textContent = tag;
    chip.addEventListener('click', () => {
      if (state.activeTags.has(tag)) state.activeTags.delete(tag);
      else state.activeTags.add(tag);
      chip.classList.toggle('active', state.activeTags.has(tag));
      render();
    });
    tagCloud.appendChild(chip);
  });
}

// ── SEARCH INPUT ──
document.getElementById('search-input').addEventListener('input', e => {
  state.search = e.target.value.toLowerCase();
  render();
});

// ── ALT TOGGLE ──
document.getElementById('filter-alt').addEventListener('change', e => {
  state.onlyAlt = e.target.checked;
  render();
});

// ── FILTER ──
function passes(song) {
  // Name search
  if (state.search && !song.song_name.toLowerCase().includes(state.search)) return false;

  // Alt versions
  if (state.onlyAlt && !song.alt_versions) return false;

  // Tags (song must have ALL active tags)
  if (state.activeTags.size > 0) {
    for (const t of state.activeTags) {
      if (!song.tags.includes(t)) return false;
    }
  }

  // Sliders: only filter if song has a value AND slider isn't at full range
  for (const key of Object.keys(state.sliders)) {
    const { min, max } = state.sliders[key];
    if (min === 1 && max === 5) continue; // full range — skip
    const val = song[key];
    if (val === null) continue; // no value — pass through
    if (val < min || val > max) return false;
  }

  return true;
}

// ── DOT RENDERER ──
function renderDots(val, cls) {
  if (val === null) return '';
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<div class="dot ${i <= val ? 'on ' + cls : ''}"></div>`;
  }
  return `<div class="score-dots">${html}</div>`;
}

// ── TOAST ──
function showToast(folder, filename) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>&#9888; File not found</strong>${folder}/${filename}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4100);
}

// ── PLAY HANDLER ──
function stopCurrent() {
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (currentCardEl) {
    currentCardEl.classList.remove('playing');
    const btn = currentCardEl.querySelector('.play-btn');
    if (btn) btn.textContent = '▶';
    const bar = currentCardEl.querySelector('.progress-bar');
    if (bar) bar.style.width = '0%';
    currentCardEl = null;
  }
}

function togglePlay(song, cardEl) {
  const wasThisCard = currentCardEl === cardEl;
  stopCurrent();
  if (wasThisCard) return;

  const path = `${song.folder}/${song.filename}`;
  const audio = new Audio(path);
  audio.loop = true;

  audio.addEventListener('playing', () => {
    currentAudio = audio;
    currentCardEl = cardEl;
    cardEl.classList.add('playing');
    cardEl.querySelector('.play-btn').textContent = '■';

    const bar = cardEl.querySelector('.progress-bar');
    function tick() {
      if (!currentAudio || currentAudio.duration === 0) return;
      bar.style.width = ((currentAudio.currentTime / currentAudio.duration) * 100) + '%';
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }, { once: true });

  audio.play().catch(() => {
    showToast(song.folder, song.filename);
  });
}

// ── RENDER ──
function render() {
  const filtered = SONGS.filter(passes);
  const resultsEl = document.getElementById('results');
  const countEl = document.getElementById('result-count');

  countEl.textContent = `${filtered.length} / ${SONGS.length} songs`;

  if (filtered.length === 0) {
    resultsEl.innerHTML = '<div class="no-results">No songs match the current filters.</div>';
    return;
  }

  resultsEl.innerHTML = '';
  filtered.forEach((song, i) => {
    const card = document.createElement('div');
    card.className = 'song-card';

    const hasScores = SCORE_FIELDS.some(f => song[f.key] !== null);
    const scoresHTML = hasScores
      ? `<div class="scores">${SCORE_FIELDS.map(f => song[f.key] !== null
          ? `<div class="score-dot-group">
               <span class="score-label-mini">${f.key === 'ben_score' ? 'ben' : f.key === 'brightness' ? 'brt' : f.key.slice(0,3)}</span>
               ${renderDots(song[f.key], f.cls)}
             </div>` : '').join('')} (${parseDuration(song.duration)})</div>`
      : '';

    const tagsHTML = song.tags.length
      ? `<div class="song-tags">${song.tags.map(t => `<span class="song-tag">${t}</span>`).join('')}</div>`
      : '';

    card.innerHTML = `
      <div class="progress-bar"></div>
      <div class="song-info">
        <div class="song-name" title="${song.song_name}">${song.song_name}  </div>
        <div class="song-meta">
          <span class="meta-folder">${song.folder}</span>
          ${song.alt_versions ? '<span class="badge-alt">ALT</span>' : ''}
          ${tagsHTML}
        </div>
      </div>
	${scoresHTML}
      <button class="play-btn" title="Play ${song.song_name}">▶</button>`;

    card.querySelector('.play-btn').addEventListener('click', () => togglePlay(song, card));
    resultsEl.appendChild(card);
  });
}

render();