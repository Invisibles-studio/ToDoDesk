import React, {useRef, useState} from 'react';
import {Row} from "./Utils";
import {Color, Strings} from "../utils/Constants";
import {useNavigate} from "react-router-dom";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Firebase} from "../utils/Firebase.tsx";

export default function Header({color = "#144AE4", bottomLine = false, username = ''}){

    const navigation = useNavigate()
    const [open, setOpen] = useState(false)

    let avatarRef = useRef()

    let style = {

        searchBlock: {
            background: Color.whiteCoffee,
            height: 37,
            marginRight: 54,
            borderRadius: 7,
            display: 'flex',
            alignItems: 'center'
        },
        searchBlockInput: {
            background: 'transparent',
            borderWidth: 0,
            marginLeft: 17,
            marginRight: 5,
            width: 130,
            outline: 'none',
            color: Color.darkGreen,
            fontSize: 10
        },
        searchBlockImage: {
            width: 12.45,
            height: 12.45,
            marginRight: 15,
            cursor: 'pointer'
        },
    }

    let mobile = window.innerWidth < 800 && window.innerWidth > 200

    const OpenAndCloseMenu = () => {
        setOpen(value => !value)
    }

    const setAnchorEl = (event) => {
        avatarRef.current = event.target
        OpenAndCloseMenu()
    }

    const logout = () => {
        new Firebase().clearLocalStorage()
        navigation('/ToDoDesk')
    }

    return (
        <div className={'Row HeaderRow'} style={mobile ? {} : {background: color}}>
            <p className={'HeaderLogo'} onClick={() => navigation('/ToDoDesk/main')}>{Strings.LogoName}</p>
            <Row>
                <div className={'HeaderAvatar'} onClick={e => setAnchorEl(e)}><p className={'HeaderAvatarText'}>{username.slice(0,1)}</p></div>
            </Row>

            <Menu
                anchorEl={avatarRef.current}
                open={open}
                onClose={OpenAndCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={logout}>Выход</MenuItem>
            </Menu>
        </div>
    )
}
