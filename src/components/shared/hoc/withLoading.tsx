import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../';

interface ComponentWithLoadingType {
  loading?: boolean
};

export default function withUIHelp(WrappedComponent, reducer) {
  class ComponentWithLoading extends React.Component<ComponentWithLoadingType> {
    render() {
      return (
        <Fragment>
          {this.props.loading && <Loader />}
          <WrappedComponent {...this.props } />
        </Fragment>
      );
    }
  }


  const mapStateToProps = (state) => ({
    loading: state[reducer]['loading'] || !state.auth.token
  });

  return connect(mapStateToProps)(ComponentWithLoading);
}