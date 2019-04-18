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
    stateIntents.forEach(({ nameIntent }) => {
      if (nameIntent && intents.indexOf(nameIntent) === -1) {
        intents.push(nameIntent)
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
    stateUtters.forEach(({utter, nameUtter}) => {
      if(nameUtter && utters.indexOf(nameUtter) === -1){
      utters.push(nameUtter)
      }
    })
    const stories = [{nameIntent: '', nameUtter: ''}]
    stateStories.forEach(({nameIntent, nameUtter}) => {
      if(nameIntent && nameUtter){
      stories.push({nameIntent, nameUtter})
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
