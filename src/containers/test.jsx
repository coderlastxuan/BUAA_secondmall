import React from 'react'
import {connect, useSelector} from "react-redux";

const Test = (props) => (
    <ul>
        {props.user._id}
    </ul>
)

export default connect(
    state => ({user: state.user})
)(Test)