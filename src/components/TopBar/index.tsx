import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

// import { RouteComponentProps } from 'react-router';

import text from '../../globals/text';
import './TopBar.scss';

/*
export type RouteComponentProps<TParams = {}> = Partial<TParams> & {
    path?: string;
    default?: boolean;
    location?: WindowLocation;
    navigate?: NavigateFn;
    uri?: string;
};
*/

type Props = {
};
type State = {};

class TopBar extends React.Component<Props & RouteComponentProps, State> {
  render() {
  const { history } = this.props;
  const userPath = '/user';
  const pathname = history && (this.props.location as any).pathname;
  const label = pathname === userPath ? 'Return' : 'User';
  const to = pathname === userPath ? '/' : userPath;
  const className = pathname === userPath ? ' --return' : '';
    return (
      <nav className="top-bar --no-select">
        <div className="line-through" />
        <main className="--underlight">
          <b>{text.title}</b>
        </main>
        <div className="line-through" />
        <Link className={"top-bar__user --underlight" + className} to={to}>{label}</Link>
      </nav>
    );
  }
}

export default withRouter(TopBar);