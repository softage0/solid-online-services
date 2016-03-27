import React from 'react'
import {Route, IndexRoute} from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView'
import SignUpForm from 'forms/SignUpForm'
import LoginView from 'views/LoginView'
import AdminView from 'views/AdminView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path='/signup' component={SignUpForm}/>
    <Route path='/login' component={LoginView}/>
    <Route path='/admin' component={AdminView}/>
  </Route>
)
