import React from 'react';
import { connect } from 'react-redux';
import { spotifyActions } from '../../actions';
import text from '../../globals/text';
import './Search.scss';

type CallbackType = () => void;

type QueuedTaskType = {
  cb?: CallbackType,
  value?: string,
  isComplete?: boolean
};

type Props = { tracks: any, setDetails: typeof spotifyActions.setDetails };
type State = { disabledFetch: boolean, queuedTask?: QueuedTaskType };

class Search extends React.Component<Props, State> {
  private mounted;

  constructor(props) {
    super(props);
    this.state = { disabledFetch: false };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const prevQueuedTask: QueuedTaskType = prevState.queuedTask || {};
    if(this.state.queuedTask) {
      if(!prevQueuedTask.value) {
          this.mounted && this.addTaskToQueue(this.state.queuedTask);
      } else {
        if(this.state.queuedTask.value !== prevQueuedTask.value) {
          this.mounted && this.addTaskToQueue(this.state.queuedTask, prevQueuedTask);
        }
      }
    }
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State) {
    return nextState;
  }

  addTaskToQueue = (queuedTask: QueuedTaskType, lastQueuedTask: QueuedTaskType = {}) =>  {
    setTimeout(() => {
      if(lastQueuedTask.isComplete && queuedTask.cb) {
        queuedTask.cb();
      } else {
        if (!lastQueuedTask.value && queuedTask.cb) {
          queuedTask.cb();
        }
      }
    }, 400);
  }

  handleChange = (value) => {
    this.setState({ queuedTask: { value, cb: this.queueMapDetailsToState } })
  }

  queueMapDetailsToState = () => {
    const value = this.state.queuedTask && this.state.queuedTask.value;
    if (!value) {
      return null;
    }
    const { tracks } = this.props;
    const results = Object.keys(tracks).map(key => {
      const track = tracks[key];
      return track.items;
    }).flatMap(x => x).map(x => x.track).map(item => {
      let track = item;
      let artist = item.artists[0];
      let album = item.album;
      return ([
        { name: album.name, id: album.id, type: album.type, href: album.href, uri: album.uri },
        { name: artist.name, id: artist.id, type: artist.type, href: artist.href, uri: artist.uri },
        { name: track.name, id: track.id, type: track.type, href: track.href, uri: track.uri }
      ]);
    }).flatMap(x => x);
    const evalResults = results.map(res => {
      const match = res.name.toLowerCase().match((value).toLowerCase());
      return ({
        ...res,
        matchValue: match ? match[0].length : 0
      });
    });
    const sortedResults = evalResults.sort((a, b) => (a.matchValue < b.matchValue) ? 1 : -1);
    sortedResults.length && this.props.setDetails({ details: sortedResults });

    this.setState(prevState => {
      const queuedTask: QueuedTaskType = { ...prevState.queuedTask };
      queuedTask.isComplete = true;
      return ({ queuedTask });
    });
  }

  render() {
    return (
      <div className="search">
        <label>{text.search}</label>
        <input onChange={(e) => this.handleChange(e.target.value)} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  tracks: state.spotify && state.spotify.tracks
});

const mapDispatchToProps = {
  setDetails: spotifyActions.setDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);