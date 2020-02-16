import React, { Fragment } from 'react';
import Button from '../../../shared/Button';

export type ControlsType = {
  onClickPrev?: any,
  onClickPlay?: any,
  onClickPause?: any,
  onClickStop?: any,
  onClickNext?: any,
  disabled?: boolean
};

const Controls: React.SFC<ControlsType> = ({
  onClickPrev,
  onClickPlay,
  onClickPause,
  onClickStop,
  onClickNext,
  disabled
}) => {
  return (
    <Fragment>
      <Button disabled={disabled} type="btn_prev" onClick={onClickPrev} />
      <Button disabled={disabled} type="btn_play" onClick={onClickPlay} />
      <Button disabled={disabled} type="btn_pause" onClick={onClickPause} />
      <Button disabled={disabled} type="btn_stop" onClick={onClickStop} />
      <Button disabled={disabled} type="btn_next" onClick={onClickNext} />
    </Fragment>
  );
}

export default Controls;