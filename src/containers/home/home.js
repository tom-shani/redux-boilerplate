import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {app} from '../../config';

export default class Home extends Component {
  render() {
    return (
      <div className='container home'>
        <Helmet title={app.description} />
        <p>Be it ever so humble.</p>
      </div>
    );
  }
}
