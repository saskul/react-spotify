import React from 'react';
import './SliderMini.scss';

const MAX = 100;

export type SliderMiniType = {
  onVolumeChange: any
};

const SliderMini: React.SFC<SliderMiniType> = ({ onVolumeChange }) => {
  return (
    <input type="range" className="slider-mini" min="0" max={MAX} onChange={onVolumeChange} />
  );
}

export default SliderMini;