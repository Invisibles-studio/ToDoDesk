import React from 'react';
import {Row} from "./Utils";
import {Color} from "../utils/Constants";

export default function Header(){

    const GetUserName = () => {
        return 'ANOIBY'
    }

    let style = {
        headerRow: {
            height: 53,
            background: Color.darkBlue,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            marginLeft: 53,
            color: Color.whiteCoffee,
            fontSize: 20,
            fontWeight: '700',
            userSelect: 'none'
        },
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
        avatar: {
            marginRight: 8,
            height: 40,
            width: 40,
            background: Color.whiteCoffee,
            borderRadius: 20
        },
        avatarText: {
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '700',
            color: Color.darkGreen,
            marginTop: 6,
            marginBottom: 9,
            userSelect: 'none'
        }
    }

    return (
        <Row style={style.headerRow}>
            <p style={style.logo}>DESK</p>
            <Row>
                <Row style={style.searchBlock}>
                    <input style={style.searchBlockInput} placeholder={'search...'}/>
                    <img src={require('../images/searchIcon.png')} style={style.searchBlockImage}/>
                </Row>
                <div style={style.avatar}><p style={style.avatarText}>{GetUserName().slice(0,1)}</p></div>
            </Row>
        </Row>
    )
}
