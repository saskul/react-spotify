import React from 'react';
import { connect } from 'react-redux';
import { uniqBy } from 'lodash';
import { spotifyActions } from '../../../actions';
import Scrollbar from '../Scrollbar';
import '../Table/Table.scss';
import './SideNav.scss';

type Props = {
  tracks: any,
  current_track: string,
  query: string,
  title: string,
  setDetails: typeof spotifyActions.setDetails,
  className: string
};
type State = { tracks?: any, current_track?: string, filtered_data?: any };

export function filterUniquePropFromTracks(tracks, currentTrack, query) {
  if (!tracks || !query) {
    return false;
  }
  const track = tracks[currentTrack]
  let results = track && track.items.map(
    item => item.track[query]
  );

  results = results && results.length && [...results].flatMap(x => x);
  return results && uniqBy([...results], 'id');
}

class SideNav extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { filtered_data: [] };
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State): State {
    if(
      nextProps.tracks !== nextState.tracks ||
      nextProps.current_track !== nextState.current_track
    ) {
      return ({
        tracks: nextProps.tracks,
        current_track: nextProps.current_track,
        filtered_data: filterUniquePropFromTracks(nextProps.tracks, nextProps.current_track, nextProps.query)
      });
    }
    return nextState;
  }

  handleValueClick = (ref, index) => {
    this[ref].select();
    document.execCommand('copy');
    this.props.setDetails({ details: this.state.filtered_data[index] });
  }

  render() {
    const filtered_data = this.state.filtered_data;
    const data = filtered_data ? filtered_data.map(artist => artist.name) : false;

    return (
      <div className="sidenav">
        <div className="sidenav__title">{this.props.title || ''}</div>
        <Scrollbar>
          <table id={`${this.props.query}-table`} className={`table ${this.props.className}`}>
            <tbody>
                {data && data.map((value, index) => (
                <tr key={`${index}.${value}`}>
                <td>
                  <input
                    ref={(header) => this[value] = header} value={value}
                    onClick={() => this.handleValueClick(value, index)}
                    onChange={() => null}>
                  </input>
                 </td>
                 </tr>
                ))}
            </tbody>
          </table>
        </Scrollbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.spotify && state.spotify.tracks,
  current_track: state.spotify && state.spotify.current_track
});

const mapDispatchToProps = {
  setDetails: spotifyActions.setDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);