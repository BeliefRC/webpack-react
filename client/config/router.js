import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import TestApi from '../views/test/api.test'

export default () => (
  <Fragment>
    <Route path="/" render={() => <Redirect to="/list" />} exact />
    <Route path="/list" component={TopicList} exact />
    <Route path="/detail" component={TopicDetail} />
    <Route path="/test" component={TestApi} />
  </Fragment>
)
