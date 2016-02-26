import React, {Component, PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

@connect((state) => ({error: state.error.err}), (dispatch) => ({dispatch}), null)
export default class App extends Component {
  static propTypes = {
    error: PropTypes.object
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

    this.setState(nextState);
  }

  render() {
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
  }
}
