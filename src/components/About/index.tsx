import React from 'react';
import Logo from '../../static/logo.png';
import './About.scss';

 type Props = {};
 type State = { content?: string }

class About extends React.Component<Props,State> {
  state = { content: '' };

  render() {
    return (
      <div className="about">
        <div className="about__content"></div>
      <br />
      Made by <span style={{ color: 'var(--green-color)'}}> Filip Sas-Kulczycki @otherutterotter</span>
      <br />
      <br />
       See commit history and docs at:
      <br />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/otherutterotter/react-spotify">https://github.com/otherutterotter/react-spotify</a>
      <br />
      <img alt="Winampify" src={Logo} className="about__logo"/>
      <br />
      Browse your Spotify playlists in a Winamp look-a-like. Enjoy! :)
      <br />
      <br />
      <p>Instructions:</p>
        <ol>
          <li>You can use the middle screen to browse your account's playlists.</li>
          <li>Once you pick one, each artist and album details from the playlist will be visible in the top-right square.</li>
          <li>You can use the input search button to produce list of matching tracks</li>
          <li>Note that each value that you click on the table will be automatically copied to clipboard</li>
          <li>Once you click on the track it'll be played by the audio player.</li>
          <li>If you like the track, you can then click the link denoted by the green arrow to open its Spotify page.</li>
        </ol>
      </div>
    );
  }
}

export default About;

// THIS CODE LOOKS LIKE DR. HEINZ!!!