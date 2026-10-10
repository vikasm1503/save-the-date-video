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
  const keyframes = [
    0, 65,        // 0s - 2.2s  : Bottom Taglines (Full view)
    95, 175,      // 3.2s - 5.8s : Date Stamp (30-31 JAN 2027)
    205, 285,     // 6.8s - 9.5s : Nagda Location Stamp
    315, 385,     // 10.5s - 12.8s: Vikas (Guy's Face)
    415, 485,     // 13.8s - 16.2s: Mansi (Girl's Face - Original smile & teeth)
    515, 555,     // 17.2s - 18.5s: "VIKAS and MANSI" Box
    585, 600      // 19.5s - 20s  : Full Card Reveal Hold
  ];

  const targetX = interpolate(
    frame,
    keyframes,
    [
      540, 540,  // Bottom Tagline
      195, 195,  // Date Stamp
      750, 750,  // Nagda Stamp
      300, 300,  // Vikas Face
      770, 770,  // Mansi Face
      460, 460,  // Names Box
      540, 540   // Full Reveal
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
      1750, 1750, // Bottom Tagline
      1380, 1380, // Date Stamp
      1560, 1560, // Nagda Stamp
      630, 630,   // Vikas Face
      630, 630,   // Mansi Face
      1180, 1180, // Names Box
      960, 960    // Full Reveal
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
      1.85, 1.85, // Bottom Tagline
      3.2, 3.2,   // Date Stamp
      3.0, 3.0,   // Nagda Stamp
      2.7, 2.7,   // Vikas Face
      2.7, 2.7,   // Mansi Face
      2.2, 2.2,   // Names Box
      1.0, 1.0    // Full Reveal
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

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

      {/* 2.5D Animated Camera Canvas */}
      <div
        style={{
          width: 1080,
          height: 1920,
          position: 'absolute',
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Original, untouched poster (Original faces, teeth, and smile preserved) */}
        <Img
          src={staticFile('collage_full.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Clean date overlay positioned directly over the old date text */}
        <div
          style={{
            position: 'absolute',
            top: 1308,
            left: 216,
            width: 60,
            height: 98,
            backgroundColor: '#6b1724',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff5ea',
            fontFamily: 'serif',
            textAlign: 'center',
            lineHeight: 1.15,
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>
            30-31
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, marginTop: 2 }}>
            JAN
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, marginTop: 2 }}>
            2027
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
