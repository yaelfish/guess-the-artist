import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MusicApp from './pages/MusicApp';

import Home from './pages/Home';
import Footer from './cmps/Footer';
import NavBar from './cmps/NavBar';

import './assets/styles/global.scss';

const history = createBrowserHistory();

export default function App() {
  return (
    <div className="App">

      <Router history={history} >
        {/* <NavBar /> */}
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={MusicApp} path="/music" />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

