import React from 'react';
import { storiesOf } from 'storybook-readme';
import './About.scss';

 type Props = {};
 type State = { content?: string }

class About extends React.Component<Props,State> {
  state = { content: '' };
  componentDidMount() {
    fetch(`${process.env.REACT_APP_WINAMPIFY_ROOT}/readme`)
    .then(res => res.json())
    .then(content => {
      this.setState({ content })
     });
  }

  render() {
    console.log(this.state.content)
    return <div className="about"></div>
  }
}

export default About;