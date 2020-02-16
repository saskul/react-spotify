import React from 'react';
import { connect } from 'react-redux';
import PlayerUI from './PlayerUI';
import moment from 'moment';
import './Player.scss';

type Props = { track: any };
type State = {
  id?: string | null,
  href?: string,
  status: string,
  currentTime?: number,
  duration?: number,
  info: string,
  name?: string
};

export function getTime(time) {
  if (!isNaN(time)) {
    const t = moment.duration(time * 1000);
    const seconds = t.seconds();
    //const minutes = t.minutes();
    //const hours = Math.trunc(moment.duration(time).asHours());
    return `${(seconds < 10 ? '0' : '') + seconds}`;
    //return `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
/*
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
*/
  }
}

class Player extends React.Component<Props, State> {
  private player;

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      href: '',
      status: "stopped",
      currentTime: 0,
      duration: 0,
      info: '',
      name: ''
    };
  }

  componentDidMount() {
    this.player.crossOrigin = "anonymous";
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

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.track && (nextProps.track.id !== nextState.id)) {
      return {
        status: "playing",
        id: nextProps.track.id,
        name: nextProps.track.name,
        href: nextProps.track.preview_url
      };
    }
    return nextState;
  }

  componentDidUpdate(prevProps, prevState) {
    const { href, id } = this.state;

    if (id !== prevState.id) {
      if (href) {
        this.player.src = href;
        this.setState({
          status: "playing",
          duration: this.player.duration,
          info: `${this.state.name}: ${getTime(this.state.duration)}`,
          currentTime: 0
        });
        this.player.currentTime = 0;
        this.player.play();
      }
    }
    if (this.state.status !== prevState.status) {
      if (this.state.status === "paused") {
        this.player.pause();
      } else if (this.state.status === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ currentTime: 0 });
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
    this.player.volume = Number(e.target.value) / 100;
  }


  render() {
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
          info={this.state.info}
          track={this.props.track} />
        <audio id="player" ref={ref => (this.player = ref)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  track: state.spotify.playlist && state.spotify.playlist[0]
});

export default connect(mapStateToProps)(Player);