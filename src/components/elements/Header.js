import React from 'react';
import {Row} from "./Utils";
import {Color, Strings} from "../utils/Constants";
import {useNavigate} from "react-router-dom";

export default function Header({color = "#144AE4", bottomLine = false, username = ''}){

    const navigation = useNavigate()

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

    return (
        <div className={'Row HeaderRow'} style={mobile ? {} : {background: color}}>
            <p className={'HeaderLogo'} onClick={() => navigation('/ToDoDesk/main')}>{Strings.LogoName}</p>
            <Row>
                <div className={'Row HeaderSearchBlock'}>
                    <input style={style.searchBlockInput} placeholder={'Поиск...'}/>
                    <img src={require('../images/searchIcon.png')} style={style.searchBlockImage}/>
                </div>
                <div className={'HeaderAvatar'}><p className={'HeaderAvatarText'}>{username.slice(0,1)}</p></div>
            </Row>
        </div>
    )
}
