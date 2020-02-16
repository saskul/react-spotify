import React, { Fragment } from 'react';
import { getTime } from '../../../Player';
import './Info.scss';

export type InfoType = {
  info?: string,
  status?: string,
  track?: any
};

const getInfoFromTrack = (track) => {
  const { name, album, duration_ms, external_urls } = track;
  return `${name} -- ${album.name} -- ${getTime(duration_ms)} -- ${external_urls.spotify}`;
}

const Info: React.SFC<InfoType> = ({ info, status, track }) => {
  const spotify_url = track ? track.external_urls.spotify : false;
  return (
    <Fragment>
      <div className="info link" style={{ textAlign: 'left'}}>
        <div className={`info__link__arrow ${spotify_url ? 'visible' : ''}`} style={{
          paddingRight: '10px',
          display: 'inline'
        }}>
          ➤
        </div>
        <a href={spotify_url || '#'} target="_blank">{spotify_url || ''}</a>
      </div>
      <div className={`info ${status === 'stopped' && '--stopped'} ${status === 'paused' && '--paused'}`}>
        <div className="info__content">
          {track && getInfoFromTrack(track) || info || ''}
        </div>
      </div>
    </Fragment>
  );
}

export default Info;