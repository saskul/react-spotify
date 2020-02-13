import React, { useState, Fragment } from 'react';
import { AuthState } from '../../../types';
import UIImg from '../../../static/ui.png';

interface ComponentWithUIHelpType extends AuthState {};

export default function withUIHelp(WrappedComponent) {
  const UIHelp = () => {
    const [ UIOpen, setUIOpen ] = useState(false);
    return (
      <Fragment>
        {UIOpen && (
          <img
            style={{ position: 'fixed', opacity: 0.75, left: 0, top: 0 }}
            alt="UI concept"
            src={UIImg} />
        )}
         <button
          style={{ position: 'fixed', opacity: 0.5, left: 0, top: 0 }}
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
          {process.env.REACT_APP_UI_HELP === 'true' && <UIHelp />}
        </Fragment>
      );
    }
  }

  return ComponentWithUIHelp;
}