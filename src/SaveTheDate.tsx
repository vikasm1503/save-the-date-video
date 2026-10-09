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

  // 20-second timeline (600 frames total at 30 fps)
  const keyframes = [
    0, 75,       // 0s - 2.5s: HOLD Bottom Tagline
    105, 195,    // 3.5s - 6.5s: HOLD Date Stamp
    225, 315,    // 7.5s - 10.5s: HOLD Nagda Location
    345, 420,    // 11.5s - 14s: HOLD Vikas Face
    450, 510,    // 15s - 17s: HOLD Mansi Face
    570, 600     // 19s - 20s: Full Reveal Hold
  ];

  // Target Focus Points on the 1080x1920 poster:
  // Center of Canvas = (540, 960)
  // 1. Bottom Tagline: x = 540, y = 1760
  // 2. Date Stamp:     x = 195, y = 1380
  // 3. Nagda Stamp:    x = 750, y = 1560
  // 4. Vikas Face:     x = 300, y = 630
  // 5. Mansi Face:     x = 770, y = 630
  // 6. Full Reveal:    x = 540, y = 960

  const targetX = interpolate(
    frame,
    keyframes,
    [
      540, 540,   // 1. Bottom Tagline
      195, 195,   // 2. Date Stamp
      750, 750,   // 3. Nagda Stamp
      300, 300,   // 4. Vikas Face
      770, 770,   // 5. Mansi Face
      540, 540    // 6. Full Poster
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
      1760, 1760, // 1. Bottom Tagline
      1380, 1380, // 2. Date Stamp
      1560, 1560, // 3. Nagda Stamp
      630, 630,   // 4. Vikas Face
      630, 630,   // 5. Mansi Face
      960, 960    // 6. Full Poster
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
      2.6, 2.6,  // 1. Bottom Tagline
      3.2, 3.2,  // 2. Date Stamp
      3.0, 3.0,  // 3. Nagda Stamp
      2.7, 2.7,  // 4. Vikas Face
      2.7, 2.7,  // 5. Mansi Face
      1.0, 1.0   // 6. Full Poster
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  // Exact formula to bring any (targetX, targetY) dead-center on screen:
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
