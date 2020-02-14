import React from 'react';
import { connect } from 'react-redux';
import Table from '../shared/Table';
import text from '../../globals/text';
import './Details.scss';

type Props = { details: any };
type State = {};

class Details extends React.Component<Props, State> {
  render() {
    if (typeof this.props.details !== 'string') {
      return <div className="details"><Table data={this.props.details} /></div>
    }
    if (Array.isArray(this.props.details)) {
      return <div className="details"><p>{this.props.details || text['no_description']}</p></div>
    }
    return (
      <div className="details"><p>{this.props.details || text['no_description']}</p></div>
    );
  }
}

const mapStateToProps = state => ({
  details: state.spotify.details
});

export default connect(mapStateToProps)(Details);