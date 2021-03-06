import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

// import Test from '../../containers/test'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props
        return (

            <WingBlank style={{marginBottom: 50, marginTop: 50}}>
                <QueueAnim type='scale'>
                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace/>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        thumb={require(`../../assets/imgs/${user.portrait || '头像1'}.png`)}
                                        extra={user.username}
                                    />
                                    <Body>
                                        <div>商品: {user.commodity}</div>
                                        {user.brand ? <div>品牌: {user.brand}</div> : null}
                                        {user.price ? <div>价格: {user.price}</div> : null}
                                        <div>描述: {user.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)