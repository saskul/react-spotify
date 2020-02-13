import React from 'react';
import { connect } from 'react-redux';
import { AuthState } from '../../../types';
import themes from '../../../globals/themes';

interface ComponentWithThemeType extends AuthState {
  theme?: string
};

export default function withUIHelp(WrappedComponent) {
  class ComponentWithTheme extends React.Component<ComponentWithThemeType> {
    render() {
      return (
        <div className={this.props.theme || themes[0]}>
          <WrappedComponent {...this.props } />
        </div>
      );
    }
  }


  const mapStateToProps = (state) => ({
    theme: state.theme && state.theme.current
  });

  return connect(mapStateToProps)(ComponentWithTheme);
}