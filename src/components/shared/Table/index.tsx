import React from 'react';
import { connect } from 'react-redux';
import Scrollbar from '../Scrollbar';
import { spotifyActions } from '../../../actions';
import { Token } from '../../../types';
import { uid } from 'react-uid';
import './Table.scss';

const getKeys = (data) => {
  return Object.keys(data);
};

const leaveStrings = (data) => {
  let stringData = { name: '', id: ''};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      stringData[key] = data[key];
    }
  });
  return ({ name: stringData.name, id: stringData.id, ...stringData });
};

const leaveOutTracks = (data) => {
  return data.filter(item => item.type === 'track');
}

interface TableProps {
  data?: any,
  className?: string,
  getTrack?: any,
  token: Token
}

class Table extends React.Component<TableProps> {
  handleValueClick = (ref, item={type: '', id: ''}) => {
    this[ref] && this[ref].select();
    document.execCommand('copy');
    if (item.type === 'track') {
      this.props.getTrack({ id: item.id, token: this.props.token });
    }
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const stringData = leaveStrings(Array.isArray(data) ? data[0] : data);
    const keys = getKeys(stringData);

    return (
      <Scrollbar>
        <table id={`${data.id}-table`} className={`table ${this.props.className}`}>
          {Array.isArray(data) ? this.renderArrBody(data, keys) : this.renderJsonBody(data, keys)}
        </table>
      </Scrollbar>
    );
  }

  renderJsonBody = (data, keys) => {
    return (
      <tbody>
        <tr>
          {keys.map(key => (
            <th style={{ position: 'sticky', top: '0' }} key={key}>{key}</th>
          ))}
        </tr>
        <tr>
          {keys.map(key => (
            <td key={`${key}-value`}>
              <input
                ref={(header) => this[key] = header} value={data[key]}
                onClick={() => this.handleValueClick(key)}
                onChange={() => null}>
              </input>
             </td>
          ))}
        </tr>
      </tbody>
    );
  }

  renderArrBody = (data, keys) => {

    return (
      <tbody>
        <tr>
          {keys.map(key => (
            <th style={{ position: 'sticky', top: '0' }} key={key}>{key}</th>
           ))}
        </tr>
        {leaveOutTracks(data).map(item => {
          return (
          <tr key={uid(item)}>
            {keys.map(key => (
              <td key={uid({ item: item[key] })}>
                <input
                  ref={(header) => this[key] = header}
                  value={item[key]}
                  onClick={() => this.handleValueClick(item[key], item)}
                  onChange={() => null}>
                </input>
              </td>
            ))}
          </tr>
        )})}
      </tbody>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = {
  getTrack: spotifyActions.getTrack
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);