import React from 'react';
import SideNav from '../shared/SideNav';
import './Artist.scss';

type Props = { tracks?: any };
type State = {};

class Artist extends React.Component<Props, State> {

  render() {
    return <SideNav query="artists" title="Artists" />;
  }
}

export default Artist;