import React from 'react'
import { NavLink } from 'react-router-dom';

export function EventMenu() {
    return (
        <div className="menu-container1">
            <NavLink to="/event?type=Football" >Football</NavLink>
            <NavLink to="/event?type=Basketball">Basketball</NavLink>
            <NavLink to="/event?type=Running">Running</NavLink>
            <NavLink to="/event?type=Volleyball">Volleyball</NavLink>
            <NavLink to="/event">All</NavLink>
        </div>
    )
}
