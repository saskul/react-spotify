import React from 'react';
import './Info.scss';

export type InfoType = {
  info?: string
};

const Info: React.SFC<InfoType> = ({ info }) => {
  return (
    <div className="info">
      <div className="info__content">
        {info || ''}
      </div>
    </div>
  );
}

export default Info;