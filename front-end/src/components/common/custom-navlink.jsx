import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';

const activeClassName = 'active'

class CustomNavLink extends Component {
    constructor(props) {
        super(props)

        console.log(props)
    }

    render() {
        const { to, text } = this.props;

        return (
            <li className="nav-item">
                <NavLink to={to} activeClassName={activeClassName} className="nav-link">
                    {text}
                </NavLink>
            </li>
        );
    }
}

// const CustomNavLink = (props) => (
//     // <li className="nav-item">
//     //     <NavLink {...props} />
//     // </li>

//     <h1>TEST</h1>
// )

export default CustomNavLink;