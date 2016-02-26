import config from '../../config';
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {initLocation, updateLocation} from '../../redux/modules/router';
import {Error, Header} from '../../components';
import './app.scss';

@connect(state => ({}), dispatch => ({dispatch}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatch(initLocation(this.props.location));
  }

  componentDidMount() {
    const {dispatch} = this.props;

    this.context.router.listenBefore((location) => {
      dispatch(updateLocation(location));
      return true;
    });
  }

  render() {
    return (
      <div className='app'>
        <Helmet {...config.app.head}/>
        <Error/>
        <Header/>

        {this.props.children}
      </div>
    );
  }

}
