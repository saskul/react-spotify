import React from 'react';
import './Player.scss';

type Props = {};
type State = {};

class Player extends React.Component<Props, State> {
  render() {
    return (
      <div className="player --underlight-font">Player</div>
    );
  }
}

export default Player;