import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class SamplePage extends Component {
  render() {
    return (
      <div className='container'>
        <Helmet title='Sample Page' />
        <h1>Sample Page</h1>
        <p>Hello, Dolly.</p>
      </div>
    );
  }
}
