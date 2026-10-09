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
  // [0 - 75]    (0s - 2.5s)   : HOLD on Bottom Taglines ("Here's to love..." & "The quirkiest save the date")
  // [75 - 105]  (2.5s - 3.5s) : PULL-BACK transition to Date Stamp
  // [105 - 195] (3.5s - 6.5s) : PUNCH IN & HOLD on Date Stamp (30, 31 / 01 / 26)
  // [195 - 225] (6.5s - 7.5s) : PULL-BACK transition to Location Stamp
  // [225 - 315] (7.5s - 10.5s): PUNCH IN & HOLD on Location Stamp (📍 NAGDA & Fort)
  // [315 - 345] (10.5s - 11.5s): PULL-BACK transition moving up to Vikas
  // [345 - 420] (11.5s - 14s) : PUNCH IN & HOLD on Guy's Face (Vikas - Eye-Level)
  // [420 - 450] (14s - 15s)   : GLIDE across to Mansi
  // [450 - 510] (15s - 17s)   : HOLD on Girl's Face (Mansi - Eye-Level)
  // [510 - 575] (17s - 19.2s) : GRAND ZOOM-OUT REVEAL (Pull back to full poster)
  // [575 - 600] (19.2s - 20s) : Full Poster Hold
  const keyframes = [
    0, 75,
    105, 195,
    225, 315,
    345, 420,
    450, 510,
    575, 600
  ];

  // Dynamic Scale: Punches in on subjects, dips during travel for that cinematic dynamic feel
  const scale = interpolate(
    frame,
    keyframes,
    [
      2.8, 2.8,  // 1. Bottom Tagline punch
      3.2, 3.2,  // 2. Date Stamp punch (close-up)
      3.1, 3.1,  // 3. Nagda Stamp punch (close-up)
      2.8, 2.8,  // 4. Vikas Face punch
      2.8, 2.8,  // 5. Mansi Face punch
      1.0, 1.0   // 6. Complete Poster Reveal
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  // Horizontal tracking (X-axis)
  const translateX = interpolate(
    frame,
    keyframes,
    [
      0, 0,        // 1. Bottom Tagline (Center)
      330, 330,    // 2. Date Stamp (Bottom-Left)
      -220, -220,  // 3. Nagda Stamp (Bottom-Right)
      270, 270,    // 4. Guy's Face (Vikas - Left Stamp center)
      -270, -270,  // 5. Girl's Face (Mansi - Right Stamp center)
      0, 0         // 6. Full Reveal (Center)
    ],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: 'clamp',
    }
  );

  // Vertical tracking (Y-axis)
  const translateY = interpolate(
    frame,
    keyframes,
    [
      -1120, -1120, // 1. Bottom Tagline ("Here's to love..." + "quirkiest save the date")
      -360, -360,   // 2. Date Stamp (Centered directly on 30 31 / 01 / 26)
      -670, -670,   // 3. Nagda Stamp (Centered on 📍 NAGDA and the fort)
      470, 470,     // 4. Guy's Face (Vikas - Head & Eyes level, not chest)
      470, 470,     // 5. Girl's Face (Mansi - Head & Eyes level)
      0, 0          // 6. Full Reveal (Center)
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

      {/* 2.5D Animated Camera Viewport */}
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
