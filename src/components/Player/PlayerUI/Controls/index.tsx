import React, { Fragment } from 'react';
import Button from '../../../shared/Button';

export type ControlsType = {
  onClickPrev?: any,
  onClickPlay?: any,
  onClickPause?: any,
  onClickStop?: any,
  onClickNext?: any,
};

const Controls: React.SFC<ControlsType> = ({ onClickPrev, onClickPlay, onClickPause, onClickStop, onClickNext }) => {
  return (
    <Fragment>
      <Button type="btn_prev" onClick={onClickPrev} />
      <Button type="btn_play" onClick={onClickPlay} />
      <Button type="btn_pause" onClick={onClickPause} />
      <Button type="btn_stop" onClick={onClickStop} />
      <Button type="btn_next" onClick={onClickNext} />
    </Fragment>
  );
}

export default Controls;