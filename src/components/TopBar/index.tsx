import React from 'react';
import text from '../../globals/text';
import './TopBar.scss';

type Props = {};
type State = {};

class TopBar extends React.Component<Props, State> {
  render() {
    return (
      <nav className="top-bar --no-select">
        <div className="line-through" />
        <main className="--underlight">
          <b>{text.title}</b>
        </main>
        <div className="line-through" />
      </nav>
    );
  }
}

export default TopBar;