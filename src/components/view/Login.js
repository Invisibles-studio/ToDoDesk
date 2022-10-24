import React, {useEffect, useState} from "react";
import {Column, Row} from "../elements/Utils";
import {Color, Strings} from "../utils/Constants";
import {useNavigate} from "react-router-dom";
import { Firebase } from "../utils/Firebase.tsx"

export default function Login(){

    const navigation = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let firebase = new Firebase()

    const ToMainScreen = () => {
        firebase.signIn(email, password)
        navigation('/ToDoDesk/main')
    }

    useEffect(() => {
        if (firebase.getMyUserUid() !== null){
            console.log("We are authed")
            navigation('/ToDoDesk/main')
        }
    })


    return(
        <div className={'MainBackground'}>
            <Row style={{justifyContent: 'center'}}>
                <Column>
                    <p className={'LoginTextLogo'}>{Strings.LogoName}</p>
                    <div className={'LoginBlock'}>
                        <Column>
                            <p className={'LoginBlockTitle'}>Авторизация</p>
                            <input className={'LoginTextInput'} placeholder={'Почта'} onChange={evt => setEmail(evt.target.value)}/>
                            <input style={{marginTop: 13}} className={'LoginTextInput'}  placeholder={'Пароль'} type={'password'} onChange={evt => setPassword(evt.target.value)}/>
                            <input type={'submit'} className={'LoginButton'} value={'Вход'} onClick={ToMainScreen}/>
                            <p onClick={() => console.log("No account button pressed")}
                               className={'LoginNoAccountButton'}>Нет аккаунта?</p>
                        </Column>
                    </div>
                </Column>
            </Row>
        </div>
    )
}
