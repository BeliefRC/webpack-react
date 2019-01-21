/* eslint-disable react/require-default-props,react/no-unused-prop-types */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Helmet from 'react-helmet'
import queryString from 'query-string'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '../components/container'
import TopicListItem from './list-item'
import { AppState, TopicStore } from '../../store/store'
import { tabs } from '../../util/variable-define'

@observer(['appState', 'topicStore'])
export default class TopicList extends Component {
  static contextTypes={
    router: PropTypes.object,
  }

  static propTypes = {
    appState: PropTypes.instanceOf(AppState),
    topicStore: PropTypes.instanceOf(TopicStore),
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { topicStore } = this.props
    const tab = this.getTab()
    topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    const { location, topicStore } = this.props
    if (nextProps.location.search !== location.search) {
      topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }

  getTab=(search) => {
    const { location } = this.props
    search = search || location.search
    return queryString.parse(search).tab || 'all'
  }

  handleTabChange = (event, value) => {
    const { router } = this.context
    router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }

  goToTopic=(topic) => {
    this.context.router.history.push(`/detail/${topic.id}`)
  }

  asyncBootstrap() {
    const query = queryString.parse(this.props.location.search)
    const tab = query.tab
    return this.props.topicStore.fetchTopics(tab || 'all').then(() => true).catch(() => false)
  }

  render() {
    const {
      topicStore,
    } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    const tab = this.getTab()
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
          <Tabs value={tab} onChange={this.handleTabChange}>
            {Object.keys(tabs).map(tabKey => (
              <Tab
                label={tabs[tabKey]}
                key={tabKey}
                value={tabKey}
              />
            ))}
          </Tabs>
          <List>
            {topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={() => this.goToTopic(topic)}
                topic={topic}
              />
            ))}
          </List>
          {
            syncingTopics ? (
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '40px 0',
              }}
              >
                <CircularProgress color="secondary" size={100} />
              </div>
            ) : null
          }
        </Fragment>
      </Container>
    )
  }
}
