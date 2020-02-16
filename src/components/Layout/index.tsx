import React, { Fragment } from 'react';
import About from '../About';
import UserProfile from '../UserProfile';
import { Switch, Route } from 'react-router-dom';
import text from '../../globals/text';
import './Layout.scss';

const ENOUGH_TIME_FOR_EQUALIZER = false;
const ENOUGH_TIME_FOR_PLAYLIST = false;

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
                <h2><b>{ENOUGH_TIME_FOR_PLAYLIST ? 'Playlist' :'Readme'}</b></h2>
              </div>
              <div className="line-through" />
            </div>
            <div className="grid__row">
              {ENOUGH_TIME_FOR_PLAYLIST ? Playlist : <About />}
            </div>
            {ENOUGH_TIME_FOR_EQUALIZER && (
             <Fragment>
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
            </Fragment>
            )}
          </div>

          <div className="grid__row --no-border" style={{ width: 'fit-content' }}>
            <Switch>
              <Route exact path="/">
                <div className="grid__column" style={{ minWidth: '200px' }}>
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
              </Route>
              <Route path="/user">
                <UserProfile />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;