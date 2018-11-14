/* eslint-disable react/require-default-props,react/no-unused-prop-types */
import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { AppState, TopicStore } from '../../store/store'

@observer(['appState', 'topicStore'])
export default class TopicList extends Component {
  state = {
    tabIndex: 0,
  };

  static propTypes = {
    appState: PropTypes.instanceOf(AppState),
    topicStore: PropTypes.instanceOf(TopicStore),
  }

  componentDidMount() {
    const { topicStore } = this.props
    topicStore.fetchTopics()
  }

  handleTabChange = (event, index) => {
    this.setState({ tabIndex: index });
  }

  listItemClick=() => {

  }

  render() {
    const { tabIndex } = this.state
    const {
      topicStore,
    } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    /*    const topic = {
      title: ' This is title',
      username: 'BeliefRC',
      reply_count: 20,
      visit_count: 30,
      create_at: '2018/11/11 11:11:11',
      tab: 'share',
      image: 'https://avatars0.githubusercontent.com/u/8147202?v=4&s=120',
    } */
    return (
      <Container>
        <Fragment>
          <Helmet>
            <title>
            This is topic list
            </title>
            <meta name="description" content="This is topic list" />
          </Helmet>
          <Tabs value={tabIndex} onChange={this.handleTabChange}>
            <Tab label="全部" />
            <Tab label="分享" />
            <Tab label="工作" />
            <Tab label="问答" />
            <Tab label="精品" />
            <Tab label="测试" />
          </Tabs>
          <List>
            {topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))}
          </List>
          {
            syncingTopics ? (
              <div>
                <CircularProgress color="secondary" size={100} />
              </div>
            ) : null
          }
        </Fragment>
      </Container>
    )
  }
}
