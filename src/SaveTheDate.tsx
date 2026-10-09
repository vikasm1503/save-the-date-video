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

  // 20 Seconds Timeline (600 frames at 30 fps)
  // [0, 105]   : Top stamps (Elephants & Fan)
  // [105, 210] : Groom Stamp (Vikas)
  // [210, 315] : Bride Stamp (Mansi)
  // [315, 420] : Names & Date Stamp
  // [420, 510] : Jodhpur Venue Stamp
  // [510, 600] : Full Zoom Out Reveal
  const keyframes = [0, 90, 180, 270, 375, 480, 570, 600];

  // Scale (Zoom levels)
  const scale = interpolate(
    frame,
    keyframes,
    [2.3, 2.3, 2.2, 2.2, 2.1, 2.2, 1.0, 1.0],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  // Horizontal pan (X-axis)
  const translateX = interpolate(
    frame,
    keyframes,
    [
      0,     // Start centered on top stamps
      180,   // Center on Vikas (Left stamp)
      -180,  // Center on Mansi (Right stamp)
      120,   // Center on Date stamp & Names
      -120,  // Center on Jodhpur stamp
      0,     // Center for full reveal
      0,
      0,
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  // Vertical pan (Y-axis)
  const translateY = interpolate(
    frame,
    keyframes,
    [
      650,   // Focus on top (Elephants & Fan)
      250,   // Vikas stamp
      250,   // Mansi stamp
      -100,  // Names & Date
      -450,  // Jodhpur venue stamp
      0,     // Centered full poster
      0,
      0,
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

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
      {/* Background Track */}
      <Audio src={staticFile('music.mp3')} />

      {/* 2.5D Animated Camera Canvas */}
      <div
        style={{
          width: 1080,
          height: 1920,
          position: 'absolute',
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: '50% 50%',
          willChange: 'transform',
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
