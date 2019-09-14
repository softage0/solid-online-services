import React from 'react';
import {Switch, Route} from 'react-router';

import Header from './components/Header/Header'
import HomeView from './views/HomeView';
import SignUpView from './views/SignUpView';
import LoginView from './views/LoginView';
import AdminView from './views/AdminView';
import AccountSettingView from './views/AccountSettingView';


function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={HomeView}/>
        <Route path='/signup' component={SignUpView}/>
        <Route path='/login' component={LoginView}/>
        <Route path='/admin' component={AdminView}/>
        <Route path='/account/:id' component={AccountSettingView}/>
      </Switch>
    </div>
  );
}

export default App;
