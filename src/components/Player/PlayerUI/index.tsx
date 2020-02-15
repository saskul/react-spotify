import React from 'react';
import Controls, { ControlsType } from './Controls';
import Timeline, { TimelineType } from './Timeline';
import "./PlayerUI.scss";

interface PlayerUIType extends ControlsType, TimelineType {
  track?: any,
  duration?: string,
  status: string
}

const PlayerUI: React.SFC<PlayerUIType> = ({
  onClickPrev, onClickPlay, onClickPause, onClickStop, onClickNext, track, currentTime, duration, status
}) => {
  return (
    <div className="player-ui grid --column">
      <div className="grid__row --no-border">
        <div className="grid__column --no-border" style={{ 'width': 'max-content' }}>
          <Timeline currentTime={currentTime} status={status} />
        </div>
        <div className="grid__column --no-border">
          <div className="grid__row --no-border">
            Info
          </div>
          <div className="grid__row --no-border" style={{ 'height': 'max-content' }}>
             {/*<Button type="btn_slider_mini"/>*/}
          </div>
        </div>
      </div>
      <div className="grid__row --no-border" style={{ 'height': 'max-content' }}>
        {/*<Button type="btn_slider"/>*/}
      </div>
      <div className="grid__row --no-border" style={{ 'height': 'max-content', justifyContent: 'flex-start' }}>
        <Controls
          onClickPrev={onClickPrev}
          onClickPlay={onClickPlay}
          onClickPause={onClickPause}
          onClickStop={onClickStop}
          onClickNext={onClickNext} />
      </div>
    </div>
  );
}

export default PlayerUI;