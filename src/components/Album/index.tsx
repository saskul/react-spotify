import React from 'react';
import SideNav from '../shared/SideNav';
import './Album.scss';

type Props = {};
type State = {};

class Album extends React.Component<Props, State> {
  render() {
    return (
      <SideNav query="album" className="album" title="Album" />
    );
  }
}

export default Album;