import React from 'react';
import CSS from 'csstype';
import btn_next from '../../../static/controls/btn-next.png';
import btn_prev from '../../../static/controls/btn-prev.png';
import btn_pause from '../../../static/controls/btn-pause.png';
import btn_play from '../../../static/controls/btn-play.png';
import btn_slider from '../../../static/controls/btn-slider.png';
import btn_slider_mini from '../../../static/controls/btn-slider-mini.png';
import btn_stop from '../../../static/controls/btn-stop.png';

import './Button.scss';

type ButtonType = {
  onClick?: any,
  type: string
};

interface ButtonStyleType extends CSS.Properties {}

const getImg = (type: string) => {
  switch(type) {
    case 'btn_next': {
      return { src: btn_next, width: '23px', height: '17px' };
    } case 'btn_prev': {
      return { src: btn_prev, width: '23px', height: '17px' };
    } case 'btn_pause': {
      return { src: btn_pause, width: '23px', height: '17px' };
    } case 'btn_stop': {
      return { src: btn_stop, width: '23px', height: '17px' };
    } case 'btn_play': {
      return { src: btn_play, width: '23px', height: '17px' };
    } case 'btn_slider': {
      return { src: btn_slider, width: '29px', height: '10px' };
    } case 'btn_slider_mini': {
      return { src: btn_slider_mini, width: '14px', height: '11px' };
    } default: {
      return { src: btn_play, width: '23px', height: '17px' };
    }
  }
}

const Button: React.SFC<ButtonType> = ({ onClick, type }) => {
  const img = getImg(type);
  const btnStyle: ButtonStyleType = { width: img.width, height: img.height };
  return (
    <button className="img" style={btnStyle}>
      <img
        className="button"
        alt="button"
        src={img.src}
        onClick={onClick} />
    </button>
  );
}

export default Button;