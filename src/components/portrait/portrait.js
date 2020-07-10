import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class Portrait extends Component {
    constructor(props) {
        super(props)
        this.portraitList = []
        for (let i = 1; i < 21; i++) {
            this.portraitList.push({
                text: "头像"+i,
                icon: require(`../../assets/imgs/头像${i}.png`)
            })
        }
    }

    static propTypes = {
        selectPortrait: PropTypes.func.isRequired
    }

    state = {
        icon: ''
    }

    selectPortrait = ({text, icon}) => {
        this.setState({icon})
        this.props.selectPortrait(text)
    }

    render() {
        const {icon} = this.state
        return (
            <List renderHeader={() => !icon ? '请选择头像：' : (
                <div>请选择头像：<img src={icon}/></div>
            )}>
                <Grid data={this.portraitList} columnNum={5} onClick={this.selectPortrait}/>
            </List>
        )
    }
}