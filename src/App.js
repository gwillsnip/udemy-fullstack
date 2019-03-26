import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './component/CustomNavbar';
import Footer from './component/Footer';
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Footer />
      </Router>
    );
  }
}

export default App;
