import React from 'react'
import {IndexRoute, Route} from 'react-router'
import {
  App,
  Home,
  NotFound,
  SamplePage
} from './containers'

export default (store) => (
  <Route component={App} path='/'>
    <IndexRoute component={Home}/> { /* Home (main) route */ }

    <Route component={SamplePage} path='/sample-page'/>
    <Route component={NotFound} path='*' status={404}/> { /* Catch all route */ }
  </Route>
)
