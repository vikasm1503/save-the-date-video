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

  // Keyframes timeline across 600 frames (20 seconds @ 30 fps):
  // 0 - 90    : [0s - 3s]     Zoomed into Bottom Title
  // 90 - 130  : [3s - 4.3s]   Transition (pull back & pan to Date)
  // 130 - 210 : [4.3s - 7s]   Hold & Zoomed on Date Stamp (30, 31 / 01 / 26)
  // 210 - 250 : [7s - 8.3s]   Transition (pull back & pan to Location)
  // 250 - 330 : [8.3s - 11s]  Hold & Zoomed on Location Stamp (Nagda)
  // 330 - 370 : [11s - 12.3s] Transition (pull back & pan up to Guy's face)
  // 370 - 440 : [12.3s - 14.6s] Hold & Zoomed on Vikas (Guy's Face)
  // 440 - 510 : [14.6s - 17s] Smooth glide to Mansi (Girl's Face)
  // 510 - 580 : [17s - 19.3s] Smooth Pull Back Zoom Out
  // 580 - 600 : [19.3s - 20s] Full Card Reveal Hold
  const keyframes = [
    0, 90,
    130, 210,
    250, 330,
    370, 440,
    510,
    580, 600
  ];

  // Scale (Zoom levels with pull-backs in between)
  const scale = interpolate(
    frame,
    keyframes,
    [
      2.5, 2.5,  // 1. Bottom Title (Zoomed in)
      2.7, 2.7,  // 2. Date Stamp (Zoomed in)
      2.7, 2.7,  // 3. Nagda Location Stamp (Zoomed in)
      2.6, 2.6,  // 4. Guy's Face (Vikas) (Zoomed in)
      2.6,       // 5. Girl's Face (Mansi) (Zoomed in)
      1.0, 1.0   // 6. Full Poster (Completely Zoomed Out)
    ],
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
      0, 0,        // 1. Bottom Title (Center)
      300, 300,    // 2. Date Stamp (Bottom-Left)
      -220, -220,  // 3. Location Stamp (Bottom-Right)
      250, 250,    // 4. Guy's Face (Left Stamp)
      -250,        // 5. Girl's Face (Right Stamp)
      0, 0         // 6. Full Reveal (Center)
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
      -850, -850,  // 1. Bottom Title
      -420, -420,  // 2. Date Stamp
      -580, -580,  // 3. Location Stamp
      380, 380,    // 4. Guy's Face (Vikas)
      380,         // 5. Girl's Face (Mansi)
      0, 0         // 6. Full Reveal
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
