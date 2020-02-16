import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { spotifyActions } from '../../actions';
import { uid } from 'react-uid';
import Scrollbar from '../shared/Scrollbar';
import './BrowserList.scss';

const CHAR_LIMIT = 20;

// TO-DO: REFACTOR! WORK HAS GONE TOO FAR!!!

type Props = {
  onClick?: any,
  name?: string,
  description?: string,
  onTrackClick?: typeof spotifyActions.getTrack,
  index?: number,
  type?: string,
  id?: string,
  trackList?: any,
  token?: any,
  playlists?: any,
  tracks?: any,
  getTracks?: typeof spotifyActions.getTracks,
  setDetails?: typeof spotifyActions.setDetails,
  getTrack?: typeof spotifyActions.getTrack
};
type State = {};

const ListItem: React.SFC<Props> = ({
  onClick,
  name='',
  description,
  setDetails,
  onTrackClick,
  token,
  index='',
  type='',
  tracks=[],
  id='',
  trackList=[]
}) => {
  const handleListItemClick = (track, token) => {
    typeof setDetails === 'function' && setDetails({ details: track });
    typeof onTrackClick === 'function' && onTrackClick({ id: track.id, token });
  };

  const [isOpen, setOpen] = useState(false);
  return (
    <Fragment>
      <li
        id={id}
        className="--no-select"
        data-type={type}
        onClick={() => {
          typeof onClick === 'function' && onClick(id, tracks['href'], description);
          setOpen(!isOpen);
        }}>
        {type !== 'header' && index + '. '}{name.length > CHAR_LIMIT ? name.slice(0, CHAR_LIMIT) + '...' : name}
      </li>
      {isOpen && trackList[id] && (
        <ul>
          {trackList[id].items.map((item, index) => (
            <ListItem
              key={uid(item)}
              name={item.track.name}
              description={`${item.album} ${item.artists && item.artists[0] && item.artists[0].name}`}
              setDetails={setDetails}
              index={index}
              onClick={() => typeof handleListItemClick === 'function' && handleListItemClick(item.track, token)} />
          ))}
        </ul>
      )}

    </Fragment>
  );
}

class BrowserList extends React.Component<Props, State> {
  handlePlaylistClick = (id, uri, description, isTrack=false) => {
    const { token, getTrack, getTracks, setDetails } = this.props;
    typeof getTracks === 'function' && getTracks({ uri, token, id });
    typeof setDetails === 'function' && setDetails({ details: description });
    typeof getTrack === 'function' && getTrack({ id, token });
  }
  render() {
    return (
      <Scrollbar vertical={true}>
        <div className="browser-list">
          <ul>
            {this.props.playlists.items && this.props.playlists.items.map((item, i) => (
              <ListItem
                id={item.id}
                key={item.id}
                index={i}
                name={item.name}
                description={item.description}
                type="header"
                tracks={item.tracks}
                trackList={this.props.tracks}
                onClick={this.handlePlaylistClick}
                setDetails={this.props.setDetails}
                token={this.props.token}
                onTrackClick={this.props.getTrack} />
            ))}
          </ul>
        </div>
      </Scrollbar>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  playlists: state.spotify.playlists,
  tracks: state.spotify.tracks
});

const mapDispatchToProps = {
  setDetails: spotifyActions.setDetails,
  getTracks: spotifyActions.getTracks,
  getTrack: spotifyActions.getTrack
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowserList);