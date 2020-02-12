import React from 'react';
import { connect } from 'react-redux';
import { AuthState } from '../../../types';
import { getToken } from '../../../actions';

interface ComponentWithAuthProps extends AuthState {
  redirectToLogin: boolean,
  getToken?: typeof getToken
};

export default function withAuth(WrappedComponent) {
  class ComponentWithAuth extends React.Component<ComponentWithAuthProps> {
    componentDidMount() {
      const token = this.props.token;
      if (!token && process.env.REACT_APP_DISABLE_AUTH !== 'true') {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
          this.props.getToken && this.props.getToken({ code })
        } else {
          const { NODE_ENV, REACT_APP_WINAMPIFY, REACT_APP_WINAMPIFY_DEV } = process.env;
          if (NODE_ENV === 'development') {
            window.location.replace(REACT_APP_WINAMPIFY_DEV || '');
          } else {
            window.location.replace(REACT_APP_WINAMPIFY || '');
          }
        }
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.redirectToLogin && prevProps.redirectToLogin !== this.props.redirectToLogin) {
        const redirect_uri = (process.env.NODE_ENV === 'development' ?
          process.env.REACT_APP_WINAMPIFY_DEV : process.env.REACT_APP_WINAMPIFY) || '';
          window.location.replace(redirect_uri);
      }
    }

    render() {
      return <WrappedComponent {...this.props } token={this.props.token} />;
    }
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    redirectToLogin: state.auth.redirectToLogin
  });

  const mapDispatchToProps = {
    getToken
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithAuth);
}