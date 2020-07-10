import React, {Component} from 'react'
import {connect} from "react-redux";

import UserList from '../../components/userlist/userlist'
import {user_list} from "../../redux/actions";

class Seller extends Component {
    componentDidMount() {
        this.props.user_list('seller')
    }

    render() {
        return (
            <div>
                <UserList userList={this.props.userlist}/>
            </div>
        )
    }
}

export default connect(
    state => ({userlist: state.userlist}),
    {user_list}
)(Seller)