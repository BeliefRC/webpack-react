import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'

export default () => (
  <Fragment>
    <Route path="/" render={() => <Redirect to="/list" />} exact />
    <Route path="/list" component={TopicList} exact />
    <Route path="/detail" component={TopicDetail} />
  </Fragment>
)
