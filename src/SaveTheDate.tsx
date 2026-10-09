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

  // Keyframes timeline (at 30 fps):
  // 0s-2.5s (0-75)     : Top decorative stamps & header
  // 2.5s-5s (75-150)   : Bride & Groom playing cards
  // 5s-7.5s (150-225)  : Center Names & Date stamp
  // 7.5s-10s (225-300) : Venue & Fort stamp at the bottom
  // 10s-12s (300-360)  : Smooth zoom out revealing the entire collage
  const frames = [0, 75, 150, 225, 300, 360];

  const scale = interpolate(
    frame,
    frames,
    [2.6, 2.8, 2.5, 2.7, 1.0, 1.0],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      extrapolateRight: 'clamp',
    }
  );

  const translateX = interpolate(
    frame,
    frames,
    [20, -110, 80, -40, 0, 0],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      extrapolateRight: 'clamp',
    }
  );

  const translateY = interpolate(
    frame,
    frames,
    [-420, -120, 160, 480, 0, 0],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
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

      {/* Dynamic 2.5D Camera Viewport */}
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
