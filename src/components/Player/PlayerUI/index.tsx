import React from 'react';
import Controls, { ControlsType } from './Controls';
import Visual, { VisualType } from './Visual';
import Slider, { SliderType } from './Slider';
import SliderMini, { SliderMiniType } from './SliderMini';
import Info, { InfoType } from './Info';
import "./PlayerUI.scss";

interface PlayerUIType extends ControlsType, VisualType, SliderType, SliderMiniType, InfoType {
  track?: any,
  duration?: number,
  status: string
}

const PlayerUI: React.SFC<PlayerUIType> = ({
  onClickPrev,
  onClickPlay,
  onClickPause,
  onClickStop,
  onClickNext,
  onSliderChange,
  onVolumeChange,
  track,
  currentTime,
  duration,
  status,
  info
}) => {
  return (
    <div className="player-ui grid --column">
      <div className="grid__row --no-border">
        <div className="grid__column --no-border" style={{ 'width': '112px', 'height': 'max-content' }}>
          <Visual currentTime={currentTime} status={status} />
        </div>
        <div className="grid__column --no-border">
          <div className="grid__row --no-border --no-shadow" style={{ 'height': 'max-content' }}>
            <Info track={track} info={info} status={status} />
          </div>
          <div style={{ flexGrow: 2, width: '100%', height: '100%' }} />
          <div className="grid__column --no-border --no-shadow" style={{ alignItems: 'flex-start' }}>
             <SliderMini onVolumeChange={onVolumeChange} />
          <h4>Volume</h4>
          </div>
        </div>
      </div>
      <div className="grid__row --no-border" style={{ 'height': 'max-content' }}>
        <Slider currentTime={currentTime} duration={duration} onSliderChange={onSliderChange} />
      </div>
      <div className="grid__row --no-border" style={{ 'height': 'max-content', justifyContent: 'flex-start' }}>
        <Controls
          onClickPrev={onClickPrev}
          onClickPlay={onClickPlay}
          onClickPause={onClickPause}
          onClickStop={onClickStop}
          onClickNext={onClickNext}
          disabled={track && !track.id}/>
      </div>
    </div>
  );
}

export default PlayerUI;