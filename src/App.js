import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'

import history from './history'

import { routes } from './constants/routes'

import { Navigation } from './components/menu'
import { ArticlesPage } from './pages/articles_page'
import { NotFound } from './pages/not_found'

import store from './store'

console.log({ history })

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
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
