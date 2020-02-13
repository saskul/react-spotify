import React from 'react';
import text from '../../globals/text';
import './TopBar.scss';

type Props = {};
type State = {};

class TopBar extends React.Component<Props, State> {
  render() {
    return (
      <nav className="top-bar">
        <div className="line-through" />
        <main className="--underlight">
          {text.title.toUpperCase()}
        </main>
        <div className="line-through" />
      </nav>
    );
  }
}

export default TopBar;