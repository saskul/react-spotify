import React from 'react';
import PlayerUI from './PlayerUI';
import distant_cough from '../../static/distant_cough.mp3';
import './Player.scss';

type Props = {};
type State = {
  selectedTrack?: string | null,
  status: string,
  currentTime?: number,
  duration?: number,
  info: string
};

const campfireStory = distant_cough;
const bootingUp = distant_cough;

export function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class Player extends React.Component<Props, State> {
  private player;

  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null,
      status: "stopped",
      currentTime: 0,
      duration: 0,
      info: ''
    };
  }

  componentDidMount() {
    this.player.addEventListener('ended', e => {
        this.setState({ status: 'paused' });
    }, false);
    this.player.addEventListener("timeupdate", e => {
      const currentTime = e.target.currentTime;
      const duration = e.target.duration;
      this.setState({
        currentTime,
        duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Campfire Story":
          track = campfireStory;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ status: "playing", duration: this.player.duration });
      }
    }
    if (this.state.status !== prevState.status) {
      if (this.state.status === "paused") {
        this.player.pause();
      } else if (this.state.status === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.status === "playing"
      ) {
        this.player.play();
      }
    }
  }

  handlePlay = () => this.setState({ status: "playing" });
  handlePause = () => this.setState({ status: "paused" });
  handleStop = () => this.setState({ status: "stopped" });
  handleSliderChange = (e) => {
    if (this.state.duration) {
      this.player.currentTime = (Number(e.target.value)/100) * this.state.duration;
      this.player.play();
    }
  }
  handleVolumeChange = (e) => {
    console.log(e.target.value);
    this.player.volume = Number(e.target.value) / 100;
  }


  render() {
    const list = [
      { id: 1, title: "Campfire Story" },
      { id: 2, title: "Booting Up" }
    ].map(item => {
      return (
        <li
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title, status: "playing" })}
        >
          {item.title}
        </li>
      );
    });

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PlayerUI
          onClickPrev={() => console.log('prev')}
          onClickPlay={this.handlePlay}
          onClickPause={this.handlePause}
          onClickStop={this.handleStop}
          onClickNext={() => console.log('next')}
          onSliderChange={this.handleSliderChange}
          onVolumeChange={this.handleVolumeChange}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          status={this.state.status}
          info={this.state.info} />
        {this.state.status === "playing" || this.state.status === "paused" ? (
          <div>
            {getTime(this.state.currentTime)} / {getTime(this.state.duration)}
          </div>
        ) : (
          ""
        )}
                {list}

        <audio id="player" ref={ref => (this.player = ref)} />
      </div>
    );
  }
}

export default Player;