/* eslint-disable no-unused-vars */
import {
  observable, toJS, computed, action, extendObservable,
} from 'mobx'
import { get } from '../util/http'
import { topicSchema } from '../util/variable-define'

const createTopic = topic => Object.assign({}, topicSchema, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing=false
}

export default class TopicStore {
  @observable topics

  @observable syncing

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  changeSyncing(state = false) {
    this.syncing = state
  }

  @action.bound
  async fetchTopics(tab) {
    try {
      this.syncing = true
      this.topics = []
      const resp = await get('/topics', {
        mdrender: false,
        tab,
      })
      if (resp.success) {
        resp.data.forEach((topic) => {
          this.addTopic(topic)
        })
      }
    } finally {
      this.changeSyncing()
    }
  }
}
