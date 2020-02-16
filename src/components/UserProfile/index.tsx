import React from 'react';
import { connect } from 'react-redux';
import './UserProfile.scss';

type Props = {
  name?: string,
  email?: string,
  spotifyLink?: string,
  id?: string
};
type State = {};

class UserProfile extends React.Component<Props, State> {
  render() {
    const { name, email, spotifyLink, id } = this.props;
    return (
      <div className="user-profile__wrapper">
        <div className="line-through" />
        <table className="user-profile">
          <tbody>

            <tr>
              <th>Name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>ID</th>
              <td>{id}</td>
            </tr>
            <tr>
              <th>Spotify</th>
              <td><a target="_blank" href={spotifyLink}>https://open.spotify.com/user</a></td>
            </tr>

          </tbody>
        </table>
        <div className="line-through" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.user.data && state.user.data.id,
  name: state.user.data && state.user.data.display_name,
  email: state.user.data && state.user.data.email,
  spotifyLink: state.user.data && state.user.data.external_urls.spotify
});

export default connect(mapStateToProps)(UserProfile);