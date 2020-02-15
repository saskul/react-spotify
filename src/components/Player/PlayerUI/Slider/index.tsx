import React from 'react';
import './Slider.scss';

export type SliderType = {
  onSliderChange?: any,
  currentTime?: number,
  duration?: number
};

const MAX = 100;

function getSliderPosition(currentTime:number, duration:number): number {
  if (currentTime && duration) {
    return Math.floor((currentTime / duration) * MAX);
  } else {
    return 0;
  }
}

const Slider: React.SFC<SliderType> = ({ onSliderChange, currentTime, duration }) => {
  let value = 0;
  if (typeof currentTime === 'number' && typeof duration === 'number') {
    value = getSliderPosition(currentTime, duration);
  }

  return (
    <input type="range" className="slider" min="0" max={MAX} onChange={onSliderChange} value={value} />
  );
}

export default Slider;