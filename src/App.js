import React, { Component } from 'react';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';
import Routes from './components/Routes';

class App extends Component {
  
  render() {
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          
          <main id="content" className="p-5">
          <Routes/>
          </main>
          <Footer />
        </div>
    );
  }
}

export default App;
