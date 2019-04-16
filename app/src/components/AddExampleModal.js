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
  const {intents, utters, modalClass} = state
  return {
    intentCreate: intents.find(({id}) => id === state.idExampleInModal),
    utterCreate: utters.find(({id}) => id === state.idExampleInModal),
    modalCreate: modalClass
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
      utterCreate,
      intents,
      utters,
      close,
      saveAndClose,
      setModalId,
      entityNames,
      modalCreate,
    } = this.props

    const modalRender = () => {
      let options
      if(modalCreate === 1 && intentCreate){
          options = <div>
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
      }else if(modalCreate === 2 && utterCreate){
        options =  <div>
                    <Editor 
                      example={utterCreate}
                      source={utters}
                      style={{marginBottom:5}}
                      nameComponent="utter"
                      className="utters"
                      />
                    </div>
      }
      return options
    }
    return (
      <Modal
        title='Add example'
        visible={Boolean(intentCreate) || Boolean(utterCreate)}
        onOk={() => saveAndClose("intents")}
        onCancel={() => close()}
        okText='add'
      >
      {
        modalRender()
      }
      </Modal>
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
