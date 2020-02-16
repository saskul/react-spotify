import React from 'react';
import './About.scss';

 type Props = {};
 type State = { content?: string }

class About extends React.Component<Props,State> {
  state = { content: '' };

  render() {
    return (
      <div className="about">
        <div className="about__content"></div><br />
      Made by Filip Sas-Kulczycki @otherutterotter<br />
      <br />
      <br />
       See commit history and docs at:<br />
      <a href="https://github.com/otherutterotter/react-spotify">https://github.com/otherutterotter/react-spotify</a>
      <br /><br /><br />
      Browse your Spotify playlists in a Winamp look-a-like. Enjoy! :)
      <br /><br /><br />
      Instructions:
        <ol>
          <li>You can use the middle screen to browse your account's playlists.</li>
          <li>Once you pick one, each artist and album details from the playlist will be visible in the top-right square.</li>
          <li>You can use the input search button to produce list of matching tracks</li>
          <li>Note that each value that you click on the table will be automatically copied to clipboard</li>
          <li>Once you click on the track it'll be played by the audio player.</li>
        </ol>
      </div>
    );
  }
}

export default About;