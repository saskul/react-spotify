import React, { useState, Fragment } from 'react';
import { AuthState } from '../../../types';

interface ComponentWithUIHelpType extends AuthState {};

interface UIHelpProps {
 src: string,
};


export default function withUIHelp(WrappedComponent, src) {
  const UIHelp: React.SFC<UIHelpProps> = ({ src }) => {
    const [ UIOpen, setUIOpen ] = useState(false);
    const localStorageItem = localStorage.getItem('ui-help');
    const storedSettings = localStorageItem ? JSON.parse(localStorageItem) : {};
    const [ horizontalDirection, setHorizontalDirection ] = useState(storedSettings.horizontalDirection || 'left');
    const [ verticalDirection, setVerticalDirection ] = useState(storedSettings.verticalDirection || 'top');

    const handleHorizontalDirectionChange = () => {
      const direction = horizontalDirection === 'right' ? 'left' : 'right';
      setHorizontalDirection(direction);
      localStorage.setItem('ui-help', JSON.stringify({ horizontalDirection: direction, verticalDirection }));
    }
    const handleVerticalDirectionChange = () => {
      const direction = verticalDirection === 'top' ? 'bottom' : 'top';
      setVerticalDirection(direction);
      localStorage.setItem('ui-help', JSON.stringify({ horizontalDirection, verticalDirection: direction }));
    }

    return (
      <Fragment>
        {UIOpen && (
          <div style={{
            position: 'fixed',
            opacity: 0.75,
            left: horizontalDirection === 'left' ? 0 : 'auto',
            right: horizontalDirection === 'right' ? 0 : 'auto',
            top: verticalDirection === 'top' ? 0 : 'auto',
            bottom: verticalDirection === 'bottom' ? 0 : 'auto',
            zIndex: 1000000,
            display: 'inline-block'
          }}>
            <img
              alt="UI concept"
              src={src} />
            <div>
              <button style={{ cursor: 'pointer' }} onClick={() => handleHorizontalDirectionChange()}>
                {horizontalDirection === 'left' ? '→' : '←'}
              </button>
              <button style={{ cursor: 'pointer' }} onClick={() => handleVerticalDirectionChange()}>
                {verticalDirection === 'top' ? '↓' : '↑'}
              </button>
            </div>
          </div>
        )}
         <button
          style={{ cursor: 'pointer', position: 'fixed', opacity: 0.5, left: 0, top: 0, zIndex: 1000001 }}
          onClick={() => setUIOpen(!UIOpen)}>
            UI
          </button>
      </Fragment>
    );
  }

  class ComponentWithUIHelp extends React.Component<ComponentWithUIHelpType> {
    render() {
      return (
        <Fragment>
        <WrappedComponent {...this.props } />
          {process.env.REACT_APP_UI_HELP === 'true' && <UIHelp src={src} />}
        </Fragment>
      );
    }
  }

  return ComponentWithUIHelp;
}