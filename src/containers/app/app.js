import config from '../../config'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {Error, Header} from '../../components'
import './app.scss'

@connect(state => ({}), dispatch => ({dispatch}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const {location} = this.props

    return (
      <div className='app'>
        <Helmet {...config.app.head}/>
        <Error/>
        <Header pathname={location.pathname}/>

        {this.props.children}
      </div>
    )
  }
}
