// @flow

import React, { Component } from 'react';
import { Modal, Tabs, Icon } from 'antd'
import { connect } from 'react-redux'
import EntityTable from './EntityTable'
import TextEditor from './TextEditor'
import Editor from './Editor'
import * as actions from '../state/actions'

const TabPane = Tabs.TabPane
const mapState = (state) => { 
  const {intents, utters} = state
  return {
    intentCreate: intents.find(({id}) => id === state.idExampleInModal),
    uttersCreate: utters.find(({id}) => id === state.idExampleInModal)
  }
}

const mapActions = dispatch => ({
  close: () => {
    dispatch(actions.closeAddModal())
  },
  saveAndClose: (className) => {
    dispatch(actions.saveAndCloseAddModal(className))
  },
  setModalId: (className) => {
    dispatch(actions.setModalId(className))
  }
})

class ExampleTable extends Component {
  render() {
    const {
      intentCreate,
      uttersCreate,
      intents,
      utters,
      close,
      saveAndClose,
      setModalId,
      entityNames,
    } = this.props
    return (
      <Modal
        title='Add example'
        visible={Boolean(intentCreate)}
        onOk={() => saveAndClose("intents")}
        onCancel={() => close()}
        okText='add'
      >
        <Tabs defaultActiveKey="intents">
      {intentCreate ?
          (<TabPane tab={<span><Icon type="robot" />Intents</span>} key="intents">
            <div>
              <TextEditor
                example={intentCreate}
                entityNames={entityNames}
                style={{ marginBottom: 5 }}
                className="intents"
              />
              <Editor
                example={intentCreate}
                source={intents}
                style={{ marginBottom: 5 }}
                nameComponent="intent"
                className="intents"
              />
              <EntityTable
                example={intentCreate}
                entityNames={entityNames}
              />
            </div>
          </TabPane>
          ):
          <TabPane tab={<span><Icon type="robot" />Intents</span>} key="intents"></TabPane>
          }
          {uttersCreate ? 
          (<TabPane tab={<span><Icon type="robot" />Utters</span>} key="utters">
            {/* <div>
            <Editor
                key={"utter"}
                example={uttersCreate}
                source={utters}
                style={{ marginBottom: 5 }}
                nameComponent="utter"
                className="utters"
              />
            </div> */}
          </TabPane>
          ):<TabPane tab={<span><Icon type="robot" />Utters</span>} key="utters"></TabPane>
          }
        </Tabs>

      </Modal>
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
