import { Outlet } from "react-router-dom"
import React, {useContext} from 'react'
import {ThemeContext} from '../context/ViewMode'
import Header from './Header'
import './Layout.css'

export default function Layout(){
    const {mode} = useContext(ThemeContext)

    return(
        <div className={`backgroundColor${mode}`}>
            <Header />
            <Outlet />
        </div>
    )
}