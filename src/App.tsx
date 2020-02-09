import React from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { getNews } from './actions';
import './App.scss';

type Props = {
  news: any,
  getNews(): any
};
type State = {};

class App extends React.PureComponent<Props, State> {
  componentDidMount() {
    this.props.getNews();
  }
  render() {
    console.log(this.props.news)
    return (
      <div className="app">
        App
      </div>
    );
  }
}

const mapStateToProps = (state: Props) => ({
  news: state.news
});

const mapDispatchToProps = {
  getNews
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
