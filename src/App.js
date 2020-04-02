import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'

import history from './history'

import { routes } from './constants/routes'

import { Navigation } from './components/menu'
import { ArticlesPage } from './pages/articles_page'
import { NotFound } from './pages/not_found'
import { LocaleSwitcher } from './components/locale_switcher'

import store from './store'

const lang = {
  ru: {
    Remove: 'Удалить',
    Show_comments: 'Показать комментарии',
    Hide_comments: 'Скрыть комментарии'
  },
  en: {
    Remove: 'Remove',
    Show_comments: 'Show comments',
    Hide_comments: 'Hide comments'
  }
}

export const I18nContext = React.createContext(lang)

class App extends Component {
  state = {
    activeLang: 'en'
  }

  setLang = (lang) => this.setState((state) => ({ ...state, activeLang: lang }))

  render() {
    return (
      <I18nContext.Provider value={lang[this.state.activeLang]}>
        <Provider store={store}>
          <Router history={history}>
            <Navigation />
            <LocaleSwitcher langs={['en', 'ru']} setter={this.setLang} />
            <Switch>
              <Route path={routes.ROUTE_PROFILE} component={ProfilePage} />
              <Route path={routes.ROUTE_ARTICLES} component={ArticlesPage} />
              <Route path={routes.ROUTE_HOME} exact />
              <Route path="*" render={NotFound} />
            </Switch>
          </Router>
        </Provider>
      </I18nContext.Provider>
    )
  }
}

const ProfilePage = () => <div>Profile</div>

export default App
