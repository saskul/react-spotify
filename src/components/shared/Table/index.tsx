import React from 'react';
import Scrollbar from '../Scrollbar';
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

interface TableProps {
  data?: any
}

class Table extends React.Component<TableProps> {
  handleValueClick = (ref) => {
    this[ref] && this[ref].select();
    document.execCommand('copy');
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
        <table id={`${data.id}-table`} className="table">
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
        {data.map(item => (
          <tr key={uid(item)}>
            {keys.map(key => (
              <td key={uid({ item: item[key] })}>
                <input
                  ref={(header) => this[key] = header}
                  value={item[key]}
                  onClick={() => this.handleValueClick(item[key])}
                  onChange={() => null}>
                </input>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default Table;