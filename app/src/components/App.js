// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Spin, Menu, Icon, Switch } from 'antd'
import ExampleTable from './ExampleTable'
import CompatibilityAlert from './CompatibilityAlert'
import { fetchApi } from '../state/actions'

const { SubMenu } = Menu

const { Header, Content, Footer, Sider } = Layout

const mapState = state => ({
  stateIntents: state.intents,
  stateUtters: state.utters,
  stateStories: state.stories
})

class App extends Component {
  constructor () {
    super()
    this.state = {
      mode: 'inline',
      theme: {
        name: 'light',
        hash: '#fff',
        letter: '#000'
      }
    }
  }

  changeMode (value) {
    this.setState({
      mode: value ? 'vertical' : 'inline'
    })
  };

  changeTheme (value) {
    this.setState({
      theme: {
        name: value ? 'dark' : 'light',
        hash: value ? '#061f2f' : '#fff',
        letter: value ? '#fff' : '#000'
      }
    })
  };
  componentDidMount () {
    // this.props.dispatch(fetchApi())
  }

  render () {
    // const { stateIntents, stateUtters, stateStories } = this.props
    // if (!stateIntents) {
    //   return (
    //     <Spin style={{ width: '100%', height: '100%' }}>
    //       <div />
    //     </Spin>
    //   )
    // }

    // const intents = []
    // stateIntents.forEach(({ nameIntent }) => {
    //   if (nameIntent && intents.indexOf(nameIntent) === -1) {
    //     intents.push(nameIntent)
    //   }
    // })

    // const entityNames = []
    // stateIntents.forEach(example => {
    //   example.entities.forEach(({ entity }) => {
    //     if (entity && entityNames.indexOf(entity) === -1) {
    //       entityNames.push(entity)
    //     }
    //   })
    // })
    // const utters = []
    // stateUtters.forEach(({ utter, nameUtter }) => {
    //   if (nameUtter && utters.indexOf(nameUtter) === -1) {
    //     utters.push(nameUtter)
    //   }
    // })
    // const stories = [{ nameIntent: '', nameUtter: '' }]
    // stateStories.forEach(({ nameIntent, nameUtter }) => {
    //   if (nameIntent && nameUtter) {
    //     stories.push({ nameIntent, nameUtter })
    //   }
    // })
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={256} theme={this.state.theme.name}>
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={this.state.mode}
            theme={this.state.theme.name}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>Visualizar Tabelas</span>
                </span>
              }
            >
              <Menu.Item key="3">Intents</Menu.Item>
              <Menu.Item key="4">Utters</Menu.Item>
              <Menu.Item key="5">Stories</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>Adicionar </span>
                </span>
              }
            >
              <Menu.Item key="6">Intents</Menu.Item>
              <Menu.Item key="7">Utters</Menu.Item>
              <Menu.Item key="8">Stories</Menu.Item>
            </SubMenu>
            <Switch onChange={this.changeTheme} /> Modo Noturno
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px', background: this.state.theme.hash }}>
          <Content
            style={{
              background: this.state.theme.hash,
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {/* <ExampleTable intents={intents} entityNames={entityNames} /> */}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default withRouter(connect(mapState)(App))
/* <ExampleTable intents={intents} entityNames={entityNames} header={() => <TopBar />} />
        <AddExampleModal
          intents={intents}
          entityNames={entityNames}
          utters={utters}
          stories={stories}
        /> */
