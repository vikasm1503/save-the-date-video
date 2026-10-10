import React from 'react';
import {
  AbsoluteFill,
  Img,
  Audio,
  staticFile,
  interpolate,
  useCurrentFrame,
  Easing,
} from 'remotion';

export const SaveTheDate: React.FC = () => {
  const frame = useCurrentFrame();

  // 20-Second Timeline (600 frames total at 30 fps)
  // [0 - 65]    (0s - 2.2s)   : HOLD on Bottom Text (Full text visible, no cutoffs)
  // [65 - 95]   (2.2s - 3.2s) : Glide & punch into Date Stamp
  // [95 - 175]  (3.2s - 5.8s) : HOLD on Date Stamp (30, 31 / 01 / 26)
  // [175 - 205] (5.8s - 6.8s) : Glide & punch into Nagda Stamp
  // [205 - 285] (6.8s - 9.5s) : HOLD on Nagda Stamp (📍 NAGDA & Fort)
  // [285 - 315] (9.5s - 10.5s): Glide up to Vikas (Guy's Face)
  // [315 - 385] (10.5s - 12.8s): HOLD on Vikas's face
  // [385 - 415] (12.8s - 13.8s): Glide across to Mansi (Girl's Face)
  // [415 - 485] (13.8s - 16.2s): HOLD on Mansi's face
  // [485 - 515] (16.2s - 17.2s): Glide to center "VIKAS and MANSI" card
  // [515 - 555] (17.2s - 18.5s): HOLD on "VIKAS and MANSI" card
  // [555 - 585] (18.5s - 19.5s): Smooth pull-back zoom out
  // [585 - 600] (19.5s - 20s)  : Full Card Hold
  const keyframes = [
    0, 65,
    95, 175,
    205, 285,
    315, 385,
    415, 485,
    515, 555,
    585, 600
  ];

  // Target coordinates on the 1080x1920 poster:
  // 1. Bottom Tagline:  x = 540, y = 1750 (Center of lower text area)
  // 2. Date Stamp:      x = 195, y = 1380
  // 3. Nagda Stamp:     x = 750, y = 1560
  // 4. Vikas Face:      x = 300, y = 630
  // 5. Mansi Face:      x = 770, y = 630
  // 6. Vikas & Mansi:   x = 460, y = 1180 (Center box)
  // 7. Full Reveal:     x = 540, y = 960
  const targetX = interpolate(
    frame,
    keyframes,
    [
      540, 540,  // 1. Bottom Tagline (Centered)
      195, 195,  // 2. Date Stamp
      750, 750,  // 3. Nagda Stamp
      300, 300,  // 4. Vikas Face
      770, 770,  // 5. Mansi Face
      460, 460,  // 6. Vikas & Mansi Box
      540, 540   // 7. Full Reveal
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  const targetY = interpolate(
    frame,
    keyframes,
    [
      1750, 1750, // 1. Bottom Tagline
      1380, 1380, // 2. Date Stamp
      1560, 1560, // 3. Nagda Stamp
      630, 630,   // 4. Vikas Face
      630, 630,   // 5. Mansi Face
      1180, 1180, // 6. Vikas & Mansi Box
      960, 960    // 7. Full Reveal
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  const scale = interpolate(
    frame,
    keyframes,
    [
      1.85, 1.85, // 1. Bottom Tagline (Wider framing to capture all words)
      3.2, 3.2,   // 2. Date Stamp (Tight close-up)
      3.0, 3.0,   // 3. Nagda Stamp (Tight close-up)
      2.7, 2.7,   // 4. Vikas Face (Portrait framing)
      2.7, 2.7,   // 5. Mansi Face (Portrait framing)
      2.2, 2.2,   // 6. Vikas & Mansi Box
      1.0, 1.0    // 7. Full Reveal
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  // Mathematical center formula
  const translateX = (540 - targetX) * scale;
  const translateY = (960 - targetY) * scale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#7b4435',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Audio src={staticFile('music.mp3')} />

      <div
        style={{
          width: 1080,
          height: 1920,
          position: 'absolute',
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <Img
          src={staticFile('collage_full.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
