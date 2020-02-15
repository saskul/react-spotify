import React, { Fragment } from 'react';
import PlayerUI from './PlayerUI';
import distant_cough from '../../static/distant_cough.mp3';
import './Player.scss';

type Props = {};
type State = {
  selectedTrack?: string | null,
  status: string,
  currentTime?: string | null,
  duration?: number | null
};


const campfireStory = distant_cough;
const bootingUp = distant_cough;

function getTime(time) {
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
      currentTime: null,
      duration: null
    };
  }

  componentDidMount() {
    this.player.addEventListener('ended', e => {
        this.setState({ status: 'stopped' });
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
        this.state.status === "playing" &&
        prevState.status === "paused"
      ) {
        this.player.play();
      }
    }
  }

  handlePlay = () => this.setState({ status: "playing" });
  handlePause = () => this.setState({ status: "paused" });
  handleStop = () => this.setState({ status: "stopped" });


  render() {
    const list = [
      { id: 1, title: "Campfire Story" },
      { id: 2, title: "Booting Up" }
    ].map(item => {
      return (
        <li
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
        >
          {item.title}
        </li>
      );
    });

    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PlayerUI
          onClickPrev={() => console.log('prev')}
          onClickPlay={this.handlePlay}
          onClickPause={this.handlePause}
          onClickStop={this.handleStop}
          onClickNext={() => console.log('next')}
          currentTime={currentTime}
          duration={duration}
          status={this.state.status} />
        {this.state.status === "playing" || this.state.status === "paused" ? (
          <div>
            {currentTime} / {duration}
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