import React, {Component, PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Header} from '../../components';
import Helmet from 'react-helmet';
import config from '../../config';
import './app.scss';

@connect(
  state => ({
    error: state.error.err
  }),
  dispatch => ({dispatch}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    error: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showError: props.error !== null
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextState = this.state;

    if (this.props.error === null && nextProps.error !== null) {
      nextState.showError = true;
    } else if (nextProps.error === null && this.props.error !== null) {
      nextState.showError = false;
    }

    this.setState({...nextState});

  //   if (!this.props.user && nextProps.user) {
  //     // login
  //     this.props.pushState(null, '/loginSuccess');
  //   } else if (this.props.user && !nextProps.user) {
  //     // logout
  //     this.props.pushState(null, '/');
  //   }
  }

  renderError = () => {
    const {error} = this.props;
    const {showError} = this.state;
    const hideError = () => { this.setState({showError: false}); };

    return error === null ? null : (
      <Modal onHide={hideError} show={showError}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>{error.message}</Modal.Body>

        <Modal.Footer>
          <Button onClick={hideError}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <div className='app'>
        <Helmet {...config.app.head}/>
        {this.renderError()}
        <Header/>

        {this.props.children}
      </div>
    );
  }

}
