import React from 'react';
import './Layout.scss';

type Props = {
  Player: React.ReactNode,
  Playlist: React.ReactNode,
  Equalizer: React.ReactNode,
  BrowserList: React.ReactNode,
  Artist: React.ReactNode,
  Album: React.ReactNode,
  Search: React.ReactNode,
  Details: React.ReactNode
};
type State = {};

class Layout extends React.Component<Props, State> {
  render() {
    const {
      Player,
      Playlist,
      Equalizer,
      BrowserList,
      Artist,
      Album,
      Search,
      Details
    } = this.props;
    return (
      <div className="grid">
        <div className="grid__column">
          <div className="grid__row">
            {Player}
          </div>
          <div className="grid__row">
            {Playlist}
          </div>
          <div className="grid__row">
            {Equalizer}
          </div>
        </div>
        <div className="grid__row">
          <div className="grid__column">
            {BrowserList}
          </div>
          <div className="grid__column">
            <div className="grid__row">
              <div className="grid__column">
                {Artist}
              </div>
              <div className="grid__column">
                {Album}
              </div>
            </div>
            <div className="grid__row --collapsed-height">
              <div style={{ height: '20px'}}>{Search}</div>
            </div>
            <div className="grid__row">
              {Details}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;