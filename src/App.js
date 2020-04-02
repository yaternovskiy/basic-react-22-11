import React, { Component } from 'react'

import { Provider } from 'react-redux'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { routes } from './constants/routes'

import { Navigation } from './components/menu'
import { ArticlesPage } from './pages/articles_page'
import { NotFound } from './pages/not_found'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navigation />

          <Switch>
            <Route path={routes.ROUTE_PROFILE} component={ProfilePage} />
            <Route path={routes.ROUTE_ARTICLES} component={ArticlesPage} />
            <Route path={routes.ROUTE_HOME} exact />
            <Route path="*" render={NotFound} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

const ProfilePage = () => <div>Profile</div>

export default App
