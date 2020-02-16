import React from 'react';
import AudioSpectrum from 'react-audio-spectrum';
import { getTime } from '../../../Player';
import './Visual.scss';

export type VisualType = {
  currentTime?: number,
  status: string
};

export type State = {
  visualDims: { width: number, height: number },
  meterCount: number,
  meterWidth: number,
  capHeight: number,
  gap: number
};

class Visual extends React.Component<VisualType, State> {
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
    const meterCount = Math.floor(visualDims.width && visualDims.width / (meterWidth + 0.5 * gap)) || 0;
    this.setState({ visualDims, meterCount });
  }

  render() {
    const { currentTime } = this.props;
    const { visualDims, meterCount, meterWidth, gap, capHeight } = this.state;
    return (
      <div className="timeline" ref={this.containerRef}>
        <div className="timeline__clock --open-24-font">
          {getTime(currentTime)}
        </div>
        <div className="timeline__visual">
          <AudioSpectrum
            audioId="player"
            height={visualDims.height}
            width={visualDims.width}
            capHeight={capHeight}
            meterWidth={meterWidth}
            meterCount={meterCount}
            meterColor={[
              {stop: 0.1, color: 'green'},
              {stop: 0.2, color: 'yellow'},
              {stop: 0.3, color: 'red'}
            ]}
            gap={gap} />
        </div>
      </div>
    );
  }
}

/*  Functional alternative
const Visual: React.SFC<VisualType> = ({ currentTime }) => {

  const containerRef = useRef(document.createElement('div'));
  const visual = (containerRef && containerRef.current.getBoundingClientRect()) || { width: 0, height: 0 };
  return (
    ...
  );
}
*/

export default Visual;