import React, { Component } from 'react';
import './App.css';
import { } from 'redux';
import { } from 'react-redux';
import './types';
import './action';
import './reducer';
import PeopleSearch from './PeopleSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PeopleSearch />
      </div>
    );
  }
}

export default App;
