import React from 'react';
import './Info.scss';

export type InfoType = {
  info?: string
};

const Info: React.SFC<InfoType> = ({ info }) => {
  return (
    <div className="info">
      <div className="info__content">
        {info || 'Info kontekt leci se leci jakies minutki 10;0;10; o panie niedlugo poraq na obiad'}
      </div>
    </div>
  );
}

export default Info;