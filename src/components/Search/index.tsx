import React from 'react';
import { connect } from 'react-redux';
import { spotifyActions } from '../../actions';
import text from '../../globals/text';
import './Search.scss';

type Props = { tracks: any, setDetails: typeof spotifyActions.setDetails };
type State = {};

class Search extends React.Component<Props, State> {
  state = { disabledFetch: false };

  handleChange = (value) => {
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