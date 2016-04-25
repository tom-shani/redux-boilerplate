import React from 'react'
import {IndexRoute, Route} from 'react-router'
import * as Containers from './containers'

export default (store) => (
  <Route component={Containers.App} path='/'>
    <IndexRoute component={Containers.Home}/> { /* Home (main) route */ }

    <Route component={Containers.SamplePage} path='sample-page'/>
    <Route component={Containers.NotFound} path='*' status={404}/> { /* Catch all route */ }
  </Route>
)
