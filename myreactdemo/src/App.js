import React, { Component } from 'react';
import Mycalendar from "./common/myCalendar";
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Mycalendar />
        </header>
      </div>
    );
  }
}

export default App;
