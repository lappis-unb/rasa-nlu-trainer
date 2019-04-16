// @flow

import React, { Component } from 'react'
import ExampleTable from './ExampleTable'
import TopBar from './TopBar'
import AddExampleModal from './AddExampleModal'
import CompatibilityAlert from './CompatibilityAlert'
import { connect } from 'react-redux'
import { Spin } from 'antd'

const mapState = (state) => ({
  stateIntents: state.intents,
  stateUtters: state.utters,
  stateStories: state.stories
})

class App extends Component {
  render() {
    const { stateIntents, stateUtters, stateStories } = this.props
    if (!stateIntents) {
      return (
        <Spin style={{ width: '100%', height: '100%' }}>
          <div />
        </Spin>
      )
    }

    const intents = []
    stateIntents.forEach(({ intent }) => {
      if (intent && intents.indexOf(intent) === -1) {
        intents.push(intent)
      }
    })

    const entityNames = []
    stateIntents.forEach((example) => {
      example.entities.forEach(({ entity }) => {
        if (entity && entityNames.indexOf(entity) === -1) {
          entityNames.push(entity)
        }
      })
    })
    const utters = []
    stateUtters.forEach(({utter}) => {
      if(utter && utters.indexOf(utter) === -1){
      utters.push(utter)
      }
    })
    const stories = []
    stateStories.forEach(({stories}) => {
      if(stories && stories.indexOf(stories) === -1){
      stories.push(stories)
      }
    })
    return (
      <div>
        <ExampleTable
          intents={intents}
          entityNames={entityNames}
          header={() => <TopBar />}
        />
        <AddExampleModal
          intents={intents}
          entityNames={entityNames}
          utters={utters}
          stories={stories}
        />
        <CompatibilityAlert />
      </div >
    )
  } 
}
export default connect(mapState)(App)
