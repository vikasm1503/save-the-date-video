import React from 'react';
import { Composition } from 'remotion';
import { SaveTheDate } from './SaveTheDate';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SaveTheDate"
      component={SaveTheDate}
      durationInFrames={360} // 12 seconds at 30 fps
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
