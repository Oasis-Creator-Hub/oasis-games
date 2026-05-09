// ── EMBEDDED CSV DATA ──
const CSV_RAW = `
folder,filename,song_name,alt_versions,tags,duration,energy,brightness,speed,complexity,ben_score
music-loop-bundle-2026-q1,Dani Maccari Asset Pack - Jester's Distraction.ogg,Dani Maccari Asset Pack - Jester's Distraction,FALSE,silly,21.3333560090703,4,4,3,3,3
music-loop-bundle-2026-q1,Dani Maccari Asset Pack - Shadow Lurking.ogg,Dani Maccari Asset Pack - Shadow Lurking,FALSE,,25.2631972789116,2,2,2,3,2
music-loop-bundle-2026-q1,Week 1 - Retro Lounge BASE.ogg,Week 1 - Retro Lounge,TRUE,,27.4285714285714,2,2,2,3,3
music-loop-bundle-2026-q1,Week 1.5 - Super Retro Lounge.ogg,Week 1.5 - Super Retro Lounge,FALSE,chiptune,24,4,5,3,3,5
music-loop-bundle-2026-q1,Week 2 - Ruined Lands HOPE.ogg,Week 2 - Ruined Lands,TRUE,,36,2,2,2,3,3
music-loop-bundle-2026-q1,Week 3 - Waiting Room Ennui.ogg,Week 3 - Waiting Room Ennui,FALSE,,17.4545578231293,2,3,3,2,3
music-loop-bundle-2026-q1,Week 4 - Cloak of Darkness STAGE 1.ogg,Week 4 - Cloak of Darkness,TRUE,electronic,13.7142857142857,5,2,5,1,4
music-loop-bundle-2026-q1,Week 5 - Seven Reasons Why ARP.ogg,Week 5 - Seven Reasons Why,TRUE,,28,2,4,3,3,3
music-loop-bundle-2026-q1,Week 6 - Never Miss FIRE.ogg,Week 6 - Never Miss,TRUE,electronic,27.4285714285714,5,4,4,3,5
music-loop-bundle-2026-q1,Week 7 - Life Is Hard BASE.ogg,Week 7 - Life Is Hard,TRUE,jazz,14.7692517006803,2,2,2,3,3
music-loop-bundle-2026-q1,Week 8 - Sugar Rush LOOP.ogg,Week 8 - Sugar Rush,TRUE,chiptune,12.8,5,5,5,4,4
music-loop-bundle-2026-q1,Week 9 - Graceful Descent FLOATING.ogg,Week 9 - Graceful Descent,TRUE,,25.0871201814059,2,4,1,3,4
music-loop-bundle-2026-q1,Week 10 - Mischief ZOOMIES.ogg,Week 10 - Mischief,TRUE,chiptune,8.5,5,5,4,4,5
music-loop-bundle-2026-q1,Week 11 - Lost in Space.ogg,Week 11 - Lost in Space,FALSE,,49,2,2,2,2,5
music-loop-bundle-2026-q1,Week 12 - Hypnotize Me BOOPS.ogg,Week 12 - Hypnotize Me,TRUE,,25,2,4,2,2,4
music-loop-bundle-2025-q4,Sketchbook 2025-11-12.ogg,Sketchbook 2025-11-12,FALSE,electronic,69.8181859410431,3,5,3,2,4
music-loop-bundle-2025-q4,Sketchbook 2025-11-13.ogg,Sketchbook 2025-11-13,FALSE,electronic,224,4,2,4,3,3
music-loop-bundle-2025-q4,Sketchbook 2025-11-19.ogg,Sketchbook 2025-11-19,FALSE,,44.0816326530612,2,3,2,2,3
music-loop-bundle-2025-q4,Sketchbook 2025-11-23.ogg,Sketchbook 2025-11-23,FALSE,jazz,45.176485260771,2,5,2,1,2
music-loop-bundle-2025-q4,Sketchbook 2025-11-26.ogg,Sketchbook 2025-11-26,FALSE,jazz,70.588253968254,2,4,2,4,3
music-loop-bundle-2025-q4,Sketchbook 2025-12-03.ogg,Sketchbook 2025-12-03,FALSE,dnb,44.021746031746,4,4,4,3,5
music-loop-bundle-2025-q4,Sketchbook 2025-12-11_PIANO BREAK.ogg,Sketchbook 2025-12-11,TRUE,electronic,20.8695691609977,5,4,4,3,4
music-loop-bundle-2025-q4,Sketchbook 2025-12-14.ogg,Sketchbook 2025-12-14,FALSE,electronic,75,5,2,4,2,4
music-loop-bundle-2025-q4,Sketchbook 2025-12-17_CHILL.ogg,Sketchbook 2025-12-17,TRUE,ambient,33.3913151927438,2,2,3,2,3
music-loop-bundle-2024-q1,Sketchbook 2023-11-29.ogg,Sketchbook 2023-11-29,FALSE,ambient,114,1,3,2,2,4
music-loop-bundle-2024-q1,Sketchbook 2024-01-24_01.ogg,Sketchbook 2024-01-24_01,FALSE,ambient,98.1818367346939,1,4,2,1,3
music-loop-bundle-2024-q1,Sketchbook 2024-01-24_02.ogg,Sketchbook 2024-01-24_02,FALSE,jazz,56,3,4,3,3,5
music-loop-bundle-2024-q1,Sketchbook 2024-02-07.ogg,Sketchbook 2024-02-07,FALSE,dnb,84.70589569161,4,4,4,3,5
music-loop-bundle-2024-q1,Sketchbook 2024-02-14_L01.ogg,Sketchbook 2024-02-14,TRUE,ambient,24.6153968253968,1,1,1,2,5
music-loop-bundle-2024-q1,Sketchbook 2024-02-21_01.ogg,Sketchbook 2024-02-21_01,FALSE,silly,72,2,3,2,2,4
music-loop-bundle-2024-q1,Sketchbook 2024-02-21_02.ogg,Sketchbook 2024-02-21_02,FALSE,silly,30,2,4,3,3,5
music-loop-bundle-2024-q1,Sketchbook 2024-02-28_01.ogg,Sketchbook 2024-02-28_01,FALSE,dynamic,100.173922902494,3,4,3,4,4
music-loop-bundle-2024-q1,Sketchbook 2024-02-28_02.ogg,Sketchbook 2024-02-28_02,FALSE,ambient,79.058843537415,1,4,3,1,4
music-loop-bundle-2024-q1,Sketchbook 2024-03-06_01.ogg,Sketchbook 2024-03-06_01,FALSE,ambient,90.352947845805,1,2,1,1,1
music-loop-bundle-2024-q1,Sketchbook 2024-03-06_02.ogg,Sketchbook 2024-03-06_02,FALSE,ambient,69.8181859410431,1,2,1,2,4
music-loop-bundle-2024-q1,Sketchbook 2024-03-20_01.ogg,Sketchbook 2024-03-20_01,FALSE,ambient,60,3,2,2,2,3
music-loop-bundle-2024-q1,Sketchbook 2024-03-20_02.ogg,Sketchbook 2024-03-20_02,FALSE,ambient,85.3333333333333,2,2,2,2,4
music-loop-bundle-2024-q1,Sketchbook 2024-03-30_01_L01.ogg,Sketchbook 2024-03-30_01,TRUE,ambient,48,3,3,3,3,3
music-loop-bundle-2024-q1,Sketchbook 2024-03-30_02.ogg,Sketchbook 2024-03-30_02,FALSE,ambient,90.352947845805,2,4,2,2,3
music-loop-bundle-2024-q2,Sketchbook 2024-04-10.ogg,Sketchbook 2024-04-10,FALSE,jazz,101.647074829932,2,3,2,3,4
music-loop-bundle-2024-q2,Sketchbook 2024-04-24_01.ogg,Sketchbook 2024-04-24_01,FALSE,silly,72,3,4,4,3,4
music-loop-bundle-2024-q2,Sketchbook 2024-04-24_02.ogg,Sketchbook 2024-04-24_02,FALSE,silly,60,2,3,3,3,5
music-loop-bundle-2024-q2,Sketchbook 2024-04-24_03.ogg,Sketchbook 2024-04-24_03,FALSE,ambient,40.4210657596372,2,3,2,2,5
music-loop-bundle-2024-q2,Sketchbook 2024-05-01_01.ogg,Sketchbook 2024-05-01_01,FALSE,ambient,67.764716553288,1,2,1,2,3
music-loop-bundle-2024-q2,Sketchbook 2024-05-01_02.ogg,Sketchbook 2024-05-01_02,FALSE,silly,43.6363718820862,5,4,3,4,5
music-loop-bundle-2024-q2,Sketchbook 2024-05-08.ogg,Sketchbook 2024-05-08,FALSE,electronic,51,3,4,3,2,4
music-loop-bundle-2024-q2,Sketchbook 2024-05-15.ogg,Sketchbook 2024-05-15,FALSE,silly|jazz,56.470589569161,4,4,3,4,4
music-loop-bundle-2024-q2,Sketchbook 2024-05-22.ogg,Sketchbook 2024-05-22,FALSE,funk,50.0869614512472,5,3,4,3,5
music-loop-bundle-2024-q2,Sketchbook 2024-05-29.ogg,Sketchbook 2024-05-29,FALSE,funk,43.8260997732426,5,4,4,4,5
music-loop-bundle-2024-q2,Sketchbook 2024-06-05_01.ogg,Sketchbook 2024-06-05,TRUE,dynamic,38.4,4,5,4,2,4
music-loop-bundle-2024-q2,Sketchbook 2024-06-12.ogg,Sketchbook 2024-06-12,FALSE,ambient,48,2,3,3,2,3
music-loop-bundle-2024-q2,Sketchbook 2024-06-16.ogg,Sketchbook 2024-06-16,FALSE,ambient,44.8695691609977,1,4,1,2,3
music-loop-bundle-2024-q2,Sketchbook 2024-06-19.ogg,Sketchbook 2024-06-19,FALSE,desert,61.5384807256236,3,4,3,4,4
music-loop-bundle-2024-q2,Sketchbook 2024-06-26.ogg,Sketchbook 2024-06-26,FALSE,ambient,78.904126984127,2,5,1,2,3
music-loop-bundle-2024-q3,Interior Birdecorator Decorate.ogg,Interior Birdecorator Decorate,TRUE,jazz|dynamic,87.2727437641723,2,5,3,2,5
music-loop-bundle-2024-q3,Interior Birdecorator Explore.ogg,Interior Birdecorator Explore,FALSE,,101.684217687075,2,5,2,2,5
music-loop-bundle-2024-q3,Interior Birdecorator Menu_LOOP.ogg,Interior Birdecorator Menu,TRUE,jazz,32.7272789115646,2,4,2,2,4
music-loop-bundle-2024-q3,Sketchbook 2024-07-03.ogg,Sketchbook 2024-07-03,FALSE,jazz,60.9230839002268,3,4,3,3,5
music-loop-bundle-2024-q3,Sketchbook 2024-07-04.ogg,Sketchbook 2024-07-04,FALSE,electronic,58.6666666666667,5,4,3,4,5
music-loop-bundle-2024-q3,Sketchbook 2024-07-07.ogg,Sketchbook 2024-07-07,FALSE,ambient,55.8904308390023,1,1,1,2,3
music-loop-bundle-2024-q3,Sketchbook 2024-07-19_L01.ogg,Sketchbook 2024-07-19,TRUE,jazz|ambient,59.0769387755102,1,1,1,2,4
music-loop-bundle-2024-q3,Sketchbook 2024-08-01.ogg,Sketchbook 2024-08-01,FALSE,chiptune|jazz,30,5,5,3,3,5
music-loop-bundle-2024-q3,Sketchbook 2024-08-07.ogg,Sketchbook 2024-08-07,FALSE,dnb,56.470589569161,3,4,4,3,5
music-loop-bundle-2024-q3,Sketchbook 2024-08-13.ogg,Sketchbook 2024-08-13,FALSE,ambient,88.941179138322,2,3,2,5,3
music-loop-bundle-2024-q3,Sketchbook 2024-08-21.ogg,Sketchbook 2024-08-21,FALSE,electronic,65.4545578231293,3,2,3,2,3
music-loop-bundle-2024-q3,Sketchbook 2024-09-04_LOOP.ogg,Sketchbook 2024-09-04,TRUE,,57.3913151927438,5,3,3,3,2
music-loop-bundle-2024-q3,Sketchbook 2024-09-12.ogg,Sketchbook 2024-09-12,FALSE,jazz,103.38462585034,2,4,2,2,3
music-loop-bundle-2024-q3,Sketchbook 2024-09-18.ogg,Sketchbook 2024-09-18,FALSE,jazz,54.8571428571429,2,2,3,4,4
music-loop-bundle-2024-q3,Sketchbook 2024-09-22.ogg,Sketchbook 2024-09-22,FALSE,electronic,67.764716553288,3,4,3,2,4
music-loop-bundle-2024-q3,Sketchbook 2024-09-25.ogg,Sketchbook 2024-09-25,FALSE,lofi,90.352947845805,2,4,3,3,5
music-loop-bundle-2024-q4,Sketchbook 2024-10-13.ogg,Sketchbook 2024-10-13,FALSE,ambient,118.153854875283,1,2,2,2,4
music-loop-bundle-2024-q4,Sketchbook 2024-10-14.ogg,Sketchbook 2024-10-14,FALSE,dnb,36.48,3,3,3,3,4
music-loop-bundle-2024-q4,Sketchbook 2024-10-16.ogg,Sketchbook 2024-10-16,FALSE,ambient,75,3,4,3,2,3
music-loop-bundle-2024-q4,Sketchbook 2024-10-23.ogg,Sketchbook 2024-10-23,FALSE,dnb,60,4,3,4,4,4
music-loop-bundle-2024-q4,Sketchbook 2024-10-26.ogg,Sketchbook 2024-10-26,FALSE,electronic,48,2,4,3,3,4
music-loop-bundle-2024-q4,Sketchbook 2024-10-30.ogg,Sketchbook 2024-10-30,FALSE,electronic,53.5384807256236,5,4,4,3,5
music-loop-bundle-2024-q4,Sketchbook 2024-11-07.ogg,Sketchbook 2024-11-07,FALSE,ambient,115.38462585034,2,3,3,3,5
music-loop-bundle-2024-q4,Sketchbook 2024-11-13.ogg,Sketchbook 2024-11-13,FALSE,ambient,102.4,1,2,1,2,4
music-loop-bundle-2024-q4,Sketchbook 2024-11-20.ogg,Sketchbook 2024-11-20,FALSE,jazz,75.7894784580499,2,4,3,4,5
music-loop-bundle-2024-q4,Sketchbook 2024-11-29.ogg,Sketchbook 2024-11-29,FALSE,electronic,52.8,4,4,3,2,4
music-loop-bundle-2024-q4,Sketchbook 2024-11-30.ogg,Sketchbook 2024-11-30,FALSE,jazz,67.5,3,5,3,4,3
music-loop-bundle-2024-q4,Sketchbook 2024-12-04.ogg,Sketchbook 2024-12-04,FALSE,jazz,59.0769387755102,2,3,2,2,4
music-loop-bundle-2024-q4,Sketchbook 2024-12-05.ogg,Sketchbook 2024-12-05,FALSE,electronic,39.2727437641723,5,3,4,5,3
music-loop-bundle-2024-q4,Sketchbook 2024-12-15.ogg,Sketchbook 2024-12-15,FALSE,,45.176485260771,2,3,3,2,2
music-loop-bundle-2024-q4,Sketchbook 2024-12-18.ogg,Sketchbook 2024-12-18,FALSE,electronic,57.1210884353742,2,3,2,2,4
music-loop-bundle-2024-q4,Sketchbook 2024-12-21.ogg,Sketchbook 2024-12-21,FALSE,electronic,60.6315873015873,4,3,3,3,4
music-loop-bundle-2024-q4,Sketchbook 2024-12-26.ogg,Sketchbook 2024-12-26,FALSE,chiptune,64,4,5,3,2,4
Music-loop-bundle-chiptune,Three Red Hearts Box Jump.ogg,Three Red Hearts Box Jump,FALSE,chiptune,99.0001360544218,4,3,3,3,4
Music-loop-bundle-chiptune,Three Red Hearts Candy.ogg,Three Red Hearts Candy,FALSE,chiptune|jazz,52.1737868480726,5,5,3,4,5
Music-loop-bundle-chiptune,Three Red Hearts Connected.ogg,Three Red Hearts Connected,FALSE,chiptune,96.0097052154195,3,3,3,3,4
Music-loop-bundle-chiptune,Three Red Hearts Deep Blue.ogg,Three Red Hearts Deep Blue,FALSE,chiptune,105.974285714286,3,3,4,2,3
Music-loop-bundle-chiptune,Three Red Hearts Go.ogg,Three Red Hearts Go,TRUE,chiptune,70.5881405895692,4,3,4,3,5
Music-loop-bundle-chiptune,Three Red Hearts Modern Bits.ogg,Three Red Hearts Modern Bits,FALSE,chiptune|electronic,128.160680272109,3,3,3,2,4
Music-loop-bundle-chiptune,Three Red Hearts Out of Time.ogg,Three Red Hearts Out of Time,FALSE,chiptune,61.3395238095238,5,3,5,3,5
Music-loop-bundle-chiptune,Three Red Hearts Penguin Town.ogg,Three Red Hearts Penguin Town,FALSE,chiptune|jazz,35.3007029478458,3,4,3,3,5
Music-loop-bundle-chiptune,Three Red Hearts Penguins vs Rabbits.ogg,Three Red Hearts Penguins vs Rabbits,FALSE,chiptune,61.432947845805,5,5,4,4,5
Music-loop-bundle-chiptune,Three Red Hearts Penultimate.ogg,Three Red Hearts Penultimate,FALSE,chiptune,65.1565306122449,4,3,3,3,4
Music-loop-bundle-chiptune,Three Red Hearts Pixel War 1.ogg,Three Red Hearts Pixel War 1,FALSE,chiptune,53.3368253968254,3,3,3,2,3
Music-loop-bundle-chiptune,Three Red Hearts Pixel War 2.ogg,Three Red Hearts Pixel War 2,FALSE,chiptune,53.3330385487528,3,3,3,2,4
Music-loop-bundle-chiptune,Three Red Hearts Princess Quest.ogg,Three Red Hearts Princess Quest,TRUE,chiptune,89.6089795918367,3,4,3,2,5
Music-loop-bundle-chiptune,Three Red Hearts Puzzle Pieces.ogg,Three Red Hearts Puzzle Pieces,FALSE,chiptune|jazz,91.2104988662132,2,3,2,2,3
Music-loop-bundle-chiptune,Three Red Hearts Rabbit Town.ogg,Three Red Hearts Rabbit Town,FALSE,chiptune,45.4712698412698,3,4,3,2,4
Music-loop-bundle-chiptune,Three Red Hearts Rumble at the Gates.ogg,Three Red Hearts Rumble at the Gates,FALSE,chiptune,90.9338548752834,3,3,3,2,3
Music-loop-bundle-chiptune,Three Red Hearts Sanctuary.ogg,Three Red Hearts Sanctuary,FALSE,chiptune,76.8073696145125,2,5,3,2,5
Music-loop-bundle-chiptune,Three Red Hearts Save the City.ogg,Three Red Hearts Save the City,FALSE,chiptune,102.410362811791,4,2,3,5,4
Music-loop-bundle-chiptune,Three Red Hearts Three Red Hearts.ogg,Three Red Hearts Three Red Hearts,FALSE,chiptune,44.8045124716553,3,4,3,3,4
music-loop-bundle-troubadeck,Troubadeck 01 A Simple Snail.ogg,Troubadeck 01 A Simple Snail,FALSE,acoustic,40.4210657596372,2,3,2,1,2
music-loop-bundle-troubadeck,Troubadeck 02 Leapfrogs.ogg,Troubadeck 02 Leapfrogs,FALSE,acoustic,40.4210657596372,2,4,2,1,3
music-loop-bundle-troubadeck,Troubadeck 03 Frolicking.ogg,Troubadeck 03 Frolicking,FALSE,acoustic,40.4210657596372,2,4,2,2,3
music-loop-bundle-troubadeck,Troubadeck 04 Guinea Pig Jig.ogg,Troubadeck 04 Guinea Pig Jig,FALSE,acoustic,40.4210657596372,2,3,2,1,4
music-loop-bundle-troubadeck,Troubadeck 05 Being Big.ogg,Troubadeck 05 Being Big,FALSE,acoustic,40.4210657596372,2,4,2,2,3
music-loop-bundle-troubadeck,Troubadeck 06 Squeaky Wagon.ogg,Troubadeck 06 Squeaky Wagon,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 07 Hungry.ogg,Troubadeck 07 Hungry,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 08 The Fanciest Mud.ogg,Troubadeck 08 The Fanciest Mud,FALSE,acoustic,40.4210657596372,2,4,2,2,4
music-loop-bundle-troubadeck,Troubadeck 09 A Friend to Stand On.ogg,Troubadeck 09 A Friend to Stand On,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 10 The Answer is Yes.ogg,Troubadeck 10 The Answer is Yes,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 11 Woof Over My Head.ogg,Troubadeck 11 Woof Over My Head,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 12 Good King.ogg,Troubadeck 12 Good King,FALSE,acoustic,40.4210657596372,2,3,2,2,5
music-loop-bundle-troubadeck,Troubadeck 13 Loopy.ogg,Troubadeck 13 Loopy,FALSE,acoustic,40.4210657596372,2,3,2,3,3
music-loop-bundle-troubadeck,Troubadeck 14 Life is Hard.ogg,Troubadeck 14 Life is Hard,FALSE,acoustic,40.4210657596372,2,2,2,2,2
music-loop-bundle-troubadeck,Troubadeck 15 Something in My Eye.ogg,Troubadeck 15 Something in My Eye,FALSE,acoustic,40.4210657596372,2,2,2,1,2
music-loop-bundle-troubadeck,Troubadeck 16 Cloak of Darkness.ogg,Troubadeck 16 Cloak of Darkness,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 17 No Time for Turnips.ogg,Troubadeck 17 No Time for Turnips,FALSE,acoustic,40.4210657596372,2,2,2,2,3
music-loop-bundle-troubadeck,Troubadeck 18 Purrspective.ogg,Troubadeck 18 Purrspective,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 19 Triangles of Time.ogg,Troubadeck 19 Triangles of Time,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 20 Long Lonely Road.ogg,Troubadeck 20 Long Lonely Road,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 21 New Tricks.ogg,Troubadeck 21 New Tricks,FALSE,acoustic,40.4210657596372,2,4,2,2,3
music-loop-bundle-troubadeck,Troubadeck 22 Opposable Thumbs.ogg,Troubadeck 22 Opposable Thumbs,FALSE,acoustic,40.4210657596372,2,2,2,2,3
music-loop-bundle-troubadeck,Troubadeck 23 Soldier's Lament.ogg,Troubadeck 23 Soldier's Lament,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 24 Royal Blue.ogg,Troubadeck 24 Royal Blue,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 25 Deep Dark Sea.ogg,Troubadeck 25 Deep Dark Sea,FALSE,acoustic,40.4210657596372,2,3,2,3,4
music-loop-bundle-troubadeck,Troubadeck 26 Sorcerer's Spell.ogg,Troubadeck 26 Sorcerer's Spell,FALSE,acoustic,40.4210657596372,2,3,2,3,3
music-loop-bundle-troubadeck,Troubadeck 27 Heartstrings.ogg,Troubadeck 27 Heartstrings,FALSE,acoustic,40.4210657596372,2,4,2,1,3
music-loop-bundle-troubadeck,Troubadeck 28 Quaint Questions.ogg,Troubadeck 28 Quaint Questions,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 29 Hare-Raising Tale.ogg,Troubadeck 29 Hare-Raising Tale,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 30 Bandit's Ballad.ogg,Troubadeck 30 Bandit's Ballad,FALSE,acoustic,40.4210657596372,2,3,2,2,4
music-loop-bundle-troubadeck,Troubadeck 31 Thinking Back.ogg,Troubadeck 31 Thinking Back,FALSE,acoustic,40.4210657596372,2,2,2,2,3
music-loop-bundle-troubadeck,Troubadeck 32 Perserverance.ogg,Troubadeck 32 Perserverance,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 33 Bashful.ogg,Troubadeck 33 Bashful,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 34 Prickly Hugs.ogg,Troubadeck 34 Prickly Hugs,FALSE,acoustic,40.4210657596372,2,3,2,3,3
music-loop-bundle-troubadeck,Troubadeck 35 Lambicorn.ogg,Troubadeck 35 Lambicorn,FALSE,acoustic,40.4210657596372,2,4,2,2,3
music-loop-bundle-troubadeck,Troubadeck 36 End of the Rainbow.ogg,Troubadeck 36 End of the Rainbow,FALSE,acoustic,40.4210657596372,2,4,2,3,4
music-loop-bundle-troubadeck,Troubadeck 37 Weight of the Crown.ogg,Troubadeck 37 Weight of the Crown,FALSE,acoustic,40.4210657596372,2,3,2,3,3
music-loop-bundle-troubadeck,Troubadeck 38 Lionheart.ogg,Troubadeck 38 Lionheart,FALSE,acoustic,40.4210657596372,2,3,2,3,3
music-loop-bundle-troubadeck,Troubadeck 39 Flightless Dragon.ogg,Troubadeck 39 Flightless Dragon,FALSE,acoustic,40.4210657596372,2,2,2,3,4
music-loop-bundle-troubadeck,Troubadeck 40 In My Shell.ogg,Troubadeck 40 In My Shell,FALSE,acoustic,40.4210657596372,2,3,2,1,2
music-loop-bundle-troubadeck,Troubadeck 41 Firecat.ogg,Troubadeck 41 Firecat,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 42 Round and Round.ogg,Troubadeck 42 Round and Round,FALSE,acoustic,40.4210657596372,2,4,2,2,4
music-loop-bundle-troubadeck,Troubadeck 43 A Quest for Treats.ogg,Troubadeck 43 A Quest for Treats,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 44 Lucky Rabbit.ogg,Troubadeck 44 Lucky Rabbit,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 45 Esoteric Waterfowl.ogg,Troubadeck 45 Esoteric Waterfowl,FALSE,acoustic,40.4210657596372,2,3,2,2,2
music-loop-bundle-troubadeck,Troubadeck 46 Boar's Day Out.ogg,Troubadeck 46 Boar's Day Out,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 47 Hoof It.ogg,Troubadeck 47 Hoof It,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 48 Defender of the Clouds.ogg,Troubadeck 48 Defender of the Clouds,FALSE,acoustic,40.4210657596372,2,3,2,3,2
music-loop-bundle-troubadeck,Troubadeck 49 Galileo's Revalation.ogg,Troubadeck 49 Galileo's Revalation,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 50 Queen's March.ogg,Troubadeck 50 Queen's March,FALSE,acoustic,40.4210657596372,2,2,2,3,3
music-loop-bundle-troubadeck,Troubadeck 51 Height of Power.ogg,Troubadeck 51 Height of Power,FALSE,acoustic,40.4210657596372,2,3,2,3,2
music-loop-bundle-troubadeck,Troubadeck 52 The Firey Depths.ogg,Troubadeck 52 The Firey Depths,FALSE,acoustic,40.4210657596372,2,3,2,2,3
music-loop-bundle-troubadeck,Troubadeck 53 A Screw Loose.ogg,Troubadeck 53 A Screw Loose,FALSE,acoustic,40.4210657596372,2,3,2,3,3
music-loop-bundle-troubadeck,Troubadeck 54 Infinity.ogg,Troubadeck 54 Infinity,FALSE,acoustic,40.4210657596372,2,2,2,3,3
music-loop-bundle-pre2023,Ludum Dare 28 01.ogg,Ludum Dare 28 01,FALSE,chiptune,118.445328798186,3,3,3,2,3
music-loop-bundle-pre2023,Ludum Dare 28 02.ogg,Ludum Dare 28 02,FALSE,electronic,144.06179138322,2,4,2,2,2
music-loop-bundle-pre2023,Ludum Dare 28 03.ogg,Ludum Dare 28 03,FALSE,electronic,132.42970521542,3,2,3,3,3
music-loop-bundle-pre2023,Ludum Dare 28 04.ogg,Ludum Dare 28 04,FALSE,,128.011541950113,2,3,2,2,2
music-loop-bundle-pre2023,Ludum Dare 28 05.ogg,Ludum Dare 28 05,FALSE,,126.900929705215,3,3,3,2,2
music-loop-bundle-pre2023,Ludum Dare 28 06.ogg,Ludum Dare 28 06,FALSE,,149.923038548753,3,3,3,4,3
music-loop-bundle-pre2023,Ludum Dare 28 07.ogg,Ludum Dare 28 07,FALSE,electronic,107.663560090703,2,2,2,3,4
music-loop-bundle-pre2023,Ludum Dare 28 08.ogg,Ludum Dare 28 08,FALSE,electronic,137.142857142857,4,4,4,3,4
music-loop-bundle-pre2023,Ludum Dare 30 01.ogg,Ludum Dare 30 01,FALSE,,99.7402721088435,2,4,2,2,3
music-loop-bundle-pre2023,Ludum Dare 30 02.ogg,Ludum Dare 30 02,FALSE,spooky,113.142857142857,3,3,2,4,2
music-loop-bundle-pre2023,Ludum Dare 30 03.ogg,Ludum Dare 30 03,FALSE,spooky,86.4,2,3,2,3,3
music-loop-bundle-pre2023,Ludum Dare 30 04.ogg,Ludum Dare 30 04,FALSE,ambient,59.294126984127,5,4,3,3,5
music-loop-bundle-pre2023,Ludum Dare 30 05.ogg,Ludum Dare 30 05,FALSE,ambient,154.5,2,2,1,2,4
music-loop-bundle-pre2023,Ludum Dare 30 06.ogg,Ludum Dare 30 06,FALSE,chiptune,121.263174603175,2,2,2,3,4
music-loop-bundle-pre2023,Ludum Dare 30 07.ogg,Ludum Dare 30 07,FALSE,chiptune,65.1428571428571,4,3,4,3,5
music-loop-bundle-pre2023,Ludum Dare 30 08.ogg,Ludum Dare 30 08,FALSE,electronic,83.0769387755102,4,4,2,4,3
music-loop-bundle-pre2023,Ludum Dare 30 09.ogg,Ludum Dare 30 09,FALSE,electronic,55.5789569160998,4,4,4,3,5
music-loop-bundle-pre2023,Ludum Dare 32 01.ogg,Ludum Dare 32 01,FALSE,chiptune,48.0052154195011,4,3,5,4,4
music-loop-bundle-pre2023,Ludum Dare 32 02.ogg,Ludum Dare 32 02,FALSE,ambient,78,1,4,1,1,3
music-loop-bundle-pre2023,Ludum Dare 32 03.ogg,Ludum Dare 32 03,FALSE,electronic,64,2,2,2,2,2
music-loop-bundle-pre2023,Ludum Dare 32 04.ogg,Ludum Dare 32 04,FALSE,electronic,32,4,3,4,3,3
music-loop-bundle-pre2023,Ludum Dare 32 05.ogg,Ludum Dare 32 05,FALSE,ambient|spooky,63.7168253968254,1,2,2,2,5
music-loop-bundle-pre2023,Ludum Dare 38 01.ogg,Ludum Dare 38 01,FALSE,electronic,67.2,3,5,3,2,3
music-loop-bundle-pre2023,Ludum Dare 38 02.ogg,Ludum Dare 38 02,FALSE,electronic,64,3,4,3,3,2
music-loop-bundle-pre2023,Ludum Dare 38 03.ogg,Ludum Dare 38 03,FALSE,electronic,62.117664399093,2,4,3,2,2
music-loop-bundle-pre2023,Ludum Dare 38 04.ogg,Ludum Dare 38 04,FALSE,electronic,41.1428571428571,5,3,4,4,3
music-loop-bundle-pre2023,Ludum Dare 38 05.ogg,Ludum Dare 38 05,FALSE,ambient,55.9909750566893,1,4,1,2,5
music-loop-bundle-pre2023,Ludum Dare 38 06.ogg,Ludum Dare 38 06,FALSE,,60,4,4,3,3,3
music-loop-bundle-pre2023,Ludum Dare 38 07.ogg,Ludum Dare 38 07,FALSE,spooky,60,3,3,3,4,5
music-loop-bundle-pre2023,Ludum Dare 38 08.ogg,Ludum Dare 38 08,FALSE,spooky,68.5714285714286,2,3,2,3,3
music-loop-bundle-pre2023,Ludum Dare 38 09.ogg,Ludum Dare 38 09,FALSE,chiptune,32.0032879818594,5,5,4,2,4
music-loop-bundle-pre2023,Ludum Dare 38 10.ogg,Ludum Dare 38 10,FALSE,spooky,64.2253741496599,2,3,2,3,3
music-loop-bundle-pre2023,Patreon Challenge 01.ogg,Patreon Challenge 01,FALSE,ambient|spooky,58.4452380952381,1,2,1,2,4
music-loop-bundle-pre2023,Patreon Challenge 02.ogg,Patreon Challenge 02,FALSE,funk,64,2,4,2,3,3
music-loop-bundle-pre2023,Patreon Challenge 03.ogg,Patreon Challenge 03,FALSE,funk,60,4,3,3,3,5
music-loop-bundle-pre2023,Patreon Challenge 04.ogg,Patreon Challenge 04,FALSE,spooky,103.661972789116,2,2,2,2,3
music-loop-bundle-pre2023,Patreon Challenge 05.ogg,Patreon Challenge 05,FALSE,ambient,64,2,4,2,2,4
music-loop-bundle-pre2023,Patreon Challenge 06.ogg,Patreon Challenge 06,FALSE,silly,48,3,5,3,4,5
music-loop-bundle-pre2023,Patreon Challenge 07.ogg,Patreon Challenge 07,FALSE,jazz,76.8,3,2,2,2,4
music-loop-bundle-pre2023,Patreon Challenge 08.ogg,Patreon Challenge 08,FALSE,electronic,62.4390249433107,3,3,3,2,3
music-loop-bundle-pre2023,Patreon Challenge 09.ogg,Patreon Challenge 09,FALSE,ambient,108.099614512472,1,4,1,2,3
music-loop-bundle-pre2023,Patreon Challenge 10_03.ogg,Patreon Challenge 10,TRUE,electronic,22.588253968254,3,3,3,4,5
music-loop-bundle-pre2023,Patreon Challenge 11.ogg,Patreon Challenge 11,FALSE,chiptune,66.6666666666667,1,2,1,3,2
music-loop-bundle-pre2023,Patreon Challenge 12.ogg,Patreon Challenge 12,FALSE,chiptune,36.0002494331066,4,4,4,3,4
music-loop-bundle-pre2023,Patreon Challenge 13.ogg,Patreon Challenge 13,FALSE,,42.6666666666667,3,3,3,2,3
music-loop-bundle-pre2023,Patreon Challenge 14.ogg,Patreon Challenge 14,FALSE,,62.4,3,3,3,2,3
music-loop-bundle-pre2023,The Verdant Grove.ogg,The Verdant Grove,TRUE,,119.230770975057,2,3,3,3,3
music-loop-bundle-pre2023,VGMA Challenge 01.ogg,VGMA Challenge 01,FALSE,,39,2,2,2,3,4
music-loop-bundle-pre2023,VGMA Challenge 02.ogg,VGMA Challenge 02,FALSE,,20.8695691609977,3,4,3,4,3
music-loop-bundle-pre2023,VGMA Challenge 03.ogg,VGMA Challenge 03,FALSE,electronic,19.2,2,3,2,3,2
music-loop-bundle-pre2023,VGMA Challenge 04.ogg,VGMA Challenge 04,FALSE,electronic,16,4,3,3,1,2
music-loop-bundle-pre2023,VGMA Challenge 05.ogg,VGMA Challenge 05,FALSE,jazz,30.3254875283447,2,2,2,3,3
music-loop-bundle-pre2023,VGMA Challenge 06.ogg,VGMA Challenge 06,FALSE,electronic,23.4146485260771,5,3,4,3,4
music-loop-bundle-pre2023,VGMA Challenge 07.ogg,VGMA Challenge 07,FALSE,electronic,21.362380952381,2,4,3,4,4
music-loop-bundle-pre2023,VGMA Challenge 08.ogg,VGMA Challenge 08,FALSE,electronic,15.2380952380952,3,3,3,3,3
music-loop-bundle-pre2023,VGMA Challenge 09.ogg,VGMA Challenge 09,FALSE,electronic,15,3,4,3,3,3
music-loop-bundle-pre2023,VGMA Challenge 10.ogg,VGMA Challenge 10,FALSE,ambient|spooky,17.2973015873016,3,2,2,3,2
music-loop-bundle-pre2023,VGMA Challenge 11.ogg,VGMA Challenge 11,FALSE,ambient|spooky,21.3333333333333,1,1,1,4,3
music-loop-bundle-pre2023,VGMA Challenge 12.ogg,VGMA Challenge 12,FALSE,ambient,23,2,4,1,2,4
music-loop-bundle-pre2023,VGMA Challenge 13.ogg,VGMA Challenge 13,FALSE,electronic,19.3288662131519,3,4,3,2,3
music-loop-bundle-pre2023,VGMA Challenge 14.ogg,VGMA Challenge 14,FALSE,electronic,19.3103628117914,4,4,4,3,3
music-loop-bundle-pre2023,VGMA Challenge 15.ogg,VGMA Challenge 15,FALSE,ambient|spooky,25.7142857142857,1,2,1,2,3
music-loop-bundle-pre2023,VGMA Challenge 16.ogg,VGMA Challenge 16,FALSE,,29.5,1,3,2,4,3
music-loop-bundle-pre2023,VGMA Challenge 17.ogg,VGMA Challenge 17,FALSE,,34.0540589569161,2,4,2,2,2
music-loop-bundle-pre2023,VGMA Challenge 18.ogg,VGMA Challenge 18,FALSE,,30.6347619047619,2,3,2,3,1
music-loop-bundle-pre2023,VGMA Challenge 19.ogg,VGMA Challenge 19,FALSE,electronic,113.132993197279,2,3,2,2,3
music-loop-bundle-pre2023,VGMA Challenge 20.ogg,VGMA Challenge 20,FALSE,electronic,41.1428571428571,5,4,5,3,5
music-loop-bundle-pre2023,VGMA Challenge 21.ogg,VGMA Challenge 21,FALSE,electronic,16,4,3,3,2,3
music-loop-bundle-pre2023,VGMA Challenge 22.ogg,VGMA Challenge 22,FALSE,spooky,40,2,4,2,4,4
music-loop-bundle-pre2023,VGMA Challenge 23.ogg,VGMA Challenge 23,FALSE,,29.5384807256236,3,3,3,5,3
music-loop-bundle-pre2023,VGMA Challenge 24.ogg,VGMA Challenge 24,FALSE,jazz,17.4545578231293,3,3,3,3,1
music-loop-bundle-pre2023,VGMA Challenge 25.ogg,VGMA Challenge 25,FALSE,jazz,24,2,3,2,4,4
music-loop-bundle-pre2023,VGMA Challenge 26.ogg,VGMA Challenge 26,FALSE,ambient,28.9285714285714,2,2,2,3,3
music-loop-bundle-pre2023,VGMA Challenge 27.ogg,VGMA Challenge 27,FALSE,ambient,19.7260317460317,2,4,2,2,3
music-loop-bundle-pre2023,VGMA Challenge 28.ogg,VGMA Challenge 28,FALSE,electronic,37.3333333333333,2,3,2,3,2
music-loop-bundle-pre2023,VGMA Challenge 29.ogg,VGMA Challenge 29,FALSE,electronic,30,3,3,3,3,1
music-loop-bundle-pre2023,VGMA Challenge 30.ogg,VGMA Challenge 30,FALSE,chiptune,27.4285714285714,2,4,2,3,3
music-loop-bundle-pre2023,VGMA Challenge 31.ogg,VGMA Challenge 31,FALSE,chiptune,10.6677777777778,5,5,4,4,5
`;