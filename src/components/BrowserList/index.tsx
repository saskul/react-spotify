import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { spotifyActions } from '../../actions';
import { uid } from 'react-uid';
import Scrollbar from '../shared/Scrollbar';
import './BrowserList.scss';

const CHAR_LIMIT = 20;

type Props = {
  token?: any,
  playlists?: any,
  tracks?: any,
  getTracks: typeof spotifyActions.getTracks,
  setDetails: typeof spotifyActions.setDetails
};
type State = {};

const ListItem = ({ onClick, name, description, setDetails, index='', type='', tracks=[], id='', trackList=[] }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Fragment>
      <li
        id={id}
        className="--no-select"
        data-type={type}
        onClick={() => {
          onClick(id, tracks['href'], description);
          setOpen(!isOpen);
        }}>
        {type !== 'header' && index + '. '}{name.length > CHAR_LIMIT ? name.slice(0, CHAR_LIMIT) + '...' : name}
      </li>
      {isOpen && trackList[id] && (
        <ul>
          {trackList[id].items.map((item, index) => (
            <ListItem
              key={uid(item)}
              onClick={() => setDetails({ details: item.track })}
              name={item.track.name}
              description={`${item.album} ${item.artists && item.artists[0] && item.artists[0].name}`}
              setDetails={setDetails}
              index={index} />
          ))}
        </ul>
      )}

    </Fragment>
  );
}

class BrowserList extends React.Component<Props, State> {
  handlePlaylistClick = (id, uri, description) => {
    this.props.getTracks({ uri, token: this.props.token, id });
    this.props.setDetails({ details: description });
  }
  render() {
    return (
      <Scrollbar vertical={true}>
        <div className="browser-list">
          <ul>
            {this.props.playlists && this.props.playlists.items.map((item, i) => (
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
                setDetails={this.props.setDetails} />
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
  getTracks: spotifyActions.getTracks
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowserList);