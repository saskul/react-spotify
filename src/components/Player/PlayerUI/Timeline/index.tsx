import React, { Fragment, useRef, useState } from 'react';
import AudioSpectrum from 'react-audio-spectrum';
import './Timeline.scss';

export type TimelineType = {
  currentTime?: string
};

export type State = {
  visualDims: { width: number, height: number },
  meterCount: number,
  meterWidth: number,
  capHeight: number,
  gap: number
};

class Timeline extends React.Component<TimelineType, State> {
  private containerRef;
  constructor(props) {
    super(props);
    this.state = { visualDims: { width: 0, height: 0 }, meterCount: 0, meterWidth: 2, capHeight: 0, gap: 1 };
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { meterWidth, gap } = this.state;
    const visualDims = (
      this.containerRef && this.containerRef.current.getBoundingClientRect()
    ) || { width: 0, height: 0 };
    const meterCount = Math.floor(visualDims.width && visualDims.width / (meterWidth + gap)) || 0;
    this.setState({ visualDims, meterCount });
  }

  render() {
    const { currentTime } = this.props;
    const { visualDims, meterCount, meterWidth, gap, capHeight } = this.state;
    return (
      <div className="timeline" ref={this.containerRef}>
        <div className="timeline__clock --open-24-font">
          {currentTime || '00:00'}
        </div>
        <div className="timeline__visual">
          <AudioSpectrum
            audioId="player"
            height={visualDims.height - 50}
            width={visualDims.width}
            capHeight={capHeight}
            meterWidth={meterWidth}
            meterCount={meterCount}
            meterColor={[
              {stop: 0, color: 'green'},
              {stop: 0.5, color: 'yellow'},
              {stop: 1, color: 'red'}
            ]}
            gap={gap} />
        </div>
      </div>
    );
  }
}

/*  Functional alternative
const Timeline: React.SFC<TimelineType> = ({ currentTime }) => {

  const containerRef = useRef(document.createElement('div'));
  const visual = (containerRef && containerRef.current.getBoundingClientRect()) || { width: 0, height: 0 };
  return (
    ...
  );
}
*/

export default Timeline;