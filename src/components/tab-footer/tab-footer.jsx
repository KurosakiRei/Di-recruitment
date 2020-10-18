import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'



class TabFooter extends Component{

    static propTypes = {
        tabList: PropTypes.array.isRequired,
        unReads: PropTypes.number.isRequired,
    }
    

    render() {
        const {tabList, history, location} = this.props

        return (
                <TabBar>
                    {tabList.filter(each => !each.hide).map(each => 
                    <TabBar.Item
                    badge = {each.path === '/message'?this.props.unReads:null}
                    title={each.tab}
                    key={each.path}
                    icon={{uri: require(`../../assets/images/nav/${each.icon}.png`)}}
                    selectedIcon={{uri: require(`../../assets/images/nav/${each.icon}-selected.png`)}}
                    selected={each.path === location.pathname}
                    onPress={() => history.replace(each.path)}
                    ></TabBar.Item>
                    )}
                </TabBar>
        )
    }
}

export default withRouter(TabFooter)