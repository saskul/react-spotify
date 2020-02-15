import React from 'react';
import text from '../../globals/text';
import './Layout.scss';

type Props = {
  TopBar: React.ReactNode,
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
      TopBar,
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
      <div className="grid --column">
        <div className="grid__row --collapsed-height --no-border">{TopBar}</div>
        <div className="grid__row --no-border">
          <div className="grid__column --no-border">
            <div className="grid__row" style={{ height: 'fit-content' }}>
              {Player}
            </div>
            <div className="grid__row --collapsed-height --no-border --padded">
              <div className="line-through" />
              <div>
                <h2><b>{text.playlist}</b></h2>
              </div>
              <div className="line-through" />
            </div>
            <div className="grid__row">
              {Playlist}
            </div>
            <div className="grid__row --collapsed-height --no-border --padded">
              <div className="line-through" />
              <div>
                <h2><b>{text.equalizer}</b></h2>
              </div>
              <div className="line-through" />
            </div>
            <div className="grid__row">
              {Equalizer}
            </div>
          </div>
          <div className="grid__row --no-border">
            <div className="grid__column" style={{ width: '300px' }}>
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
                {Search}
              </div>
              <div className="grid__row">
                {Details}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;