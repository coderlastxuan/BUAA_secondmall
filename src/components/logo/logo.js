import React from 'react'

import './logo.css'
import logo from './buaa.jpg'

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo not found"/>
        </div>
    )
}