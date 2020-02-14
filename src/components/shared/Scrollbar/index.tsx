import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './Scrollbar.scss';

type Props = {
  vertical?: boolean
}

class Scrollbar extends React.Component<Props> {
  render() {
    if(this.props.vertical) {
      return (
       <Scrollbars
        renderTrackVertical={props => <div {...props} className="track-vertical"/>}
        renderThumbVertical={props => <div {...props} className="thumb-vertical line-gradient"/>}>
        {this.props.children}
      </Scrollbars>
      );
    }
    return (
      <Scrollbars
        renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal line-gradient--bottom"/>}
        renderTrackVertical={props => <div {...props} className="track-vertical"/>}
        renderThumbVertical={props => <div {...props} className="thumb-vertical line-gradient"/>}>
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default Scrollbar;