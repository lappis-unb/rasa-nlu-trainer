// @flow

import React, { Component } from 'react';
import { Modal, Tabs, Icon } from 'antd'
import { connect } from 'react-redux'
import EntityTable from './EntityTable'
import IntentEditor from './IntentEditor'
import TextEditor from './TextEditor'
import Editor from './Editor'
import * as actions from '../state/actions'

const mapState = (state) => { 
  const {intents, utters, stories, modalClass} = state
  return {
    intentCreate: intents.find(({id}) => id === state.idExampleInModal),
    utterCreate: utters.find(({id}) => id === state.idExampleInModal),
    storyCreate: stories.find(({id}) => id === state.idExampleInModal),
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
      storyCreate,
      intents,
      utters,
      stories,
      close,
      saveAndClose,
      setModalId,
      entityNames,
      modalCreate,
    } = this.props

    const modalRender = () => {
      let options
      if(modalCreate === 'intents' && intentCreate){
          options = <div>
              <TextEditor
                example={intentCreate}
                entityNames={entityNames}
                style={{ marginBottom: 5 }}
                className="intents"
                placeholder="Name Intent"
              />
              <IntentEditor
                example={intentCreate}
                source={intents}
                style={{ marginBottom: 5 }}
                nameComponent="intent"
                className="intents"
                placeholder="Intent"
              />
              <EntityTable
                example={intentCreate}
                entityNames={entityNames}
              />
          </div>
      }else if(modalCreate === 'utters' && utterCreate){
        options =  <div>
                    <TextEditor
                      example={utterCreate}
                      utterNames={utters}
                      style={{ marginBottom: 5 }}
                      className="utters"
                      placeholder="Name Utter"
                    />
                    <TextEditor 
                      example={utterCreate}
                      source={utters}
                      style={{marginBottom:5}}
                      nameComponent="utter"
                      className="utters"
                      placeholder="Utter"
                      />
                    </div>
      }else if(modalCreate === 'stories' && storyCreate){
        options =  <div>
                    <TextEditor
                      example={storyCreate}
                      entityNames={entityNames}
                      style={{ marginBottom: 5 }}
                      className="intents"
                      placeholder="Name Intent"
                    />
                    <TextEditor
                      example={storyCreate}
                      utterNames={utters}
                      style={{ marginBottom: 5 }}
                      className="utters"
                      placeholder="Name Utter"
                    />
                    </div>
      }
      return options
    }
    return (
      <Modal
        title='Add example'
        visible={Boolean(intentCreate) || Boolean(utterCreate) || Boolean(storyCreate)}
        onOk={() => saveAndClose(modalCreate)}
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
