import ListUser from 'features/ListUser';
import Product from 'features/Product';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import CounterFeature from './features/counter/index';
import TodoFeature from './features/Todo';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        {/* <TodoFeature /> */}

        <Switch>
        <Route path="/products">
            <Product />
          </Route>
        <Route path="/listuser">
            <ListUser />
          </Route>
          <Route path="/todo">
            <TodoFeature />
          </Route>
          <Route path="/counter">
            <CounterFeature />
          </Route>
          <Route path="/">
            <TodoFeature />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
