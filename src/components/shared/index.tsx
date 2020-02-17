import React from 'react';
import LoaderSVG from './LoaderSVG';
import './index.scss';


export const Loader: React.SFC = () => (
  <div className="loader">
    <div style={{ border: '2px sold red', minHeight: '50px', minWidth: '50px' }} />
    <LoaderSVG />
  </div>
);