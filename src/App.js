import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Clueless from './main/Clueless';


class App extends Component {
  render() {
    return (
      <div className = "App">
        <Clueless/>
      </div>
    );
  }
}
export default App;
