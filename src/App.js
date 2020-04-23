import React, { Component } from 'react';
import 'prevent-pull-refresh';
import Auth from './containers/Auth/Auth';
import RandomsList from './containers/RandomsList/RandomsList';
import Queue from './containers/Queue/Queue';

import './components/elements.sass';


class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signIn',
      selectedId: null
    }
  }

  componentDidMount() {
    if(localStorage.getItem('uniqueKey')) {
      this.renderRandomsListsHandler();
    }
  }

  renderRandomsListsHandler = () => {
    this.setState({route: 'randomsList'});
  }

  renderQueueHandler = (index, isParticipating) => {
    this.setState({route: 'queue', selectedRandomInfo: {index, isParticipating}});
  }

  render() {
    return (
      <main>
        {this.state.route === 'signIn' ? <Auth nextRoute={this.renderRandomsListsHandler} /> : this.state.route === 'randomsList' ? <RandomsList renderQueue={this.renderQueueHandler} /> : <Queue renderRandomsLists={this.renderRandomsListsHandler} randomInfo={this.state.selectedRandomInfo}/>}
      </main>
    );
  }
}

export default App;
