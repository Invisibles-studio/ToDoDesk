import React from "react";
import {Column, Row} from "../elements/Utils";
import {Color} from "../utils/Constants";
import {useNavigate} from "react-router-dom";

export default function Login(){

    let styles = {
        button: {

        },
        noAccountButton: {
            userSelect: 'none',
            cursor: 'pointer',
            marginTop: 38,
            marginBottom: 24,
            textAlign: 'center',
            color: Color.whiteCoffee,
            fontSize: 13,
            fontWeight: '700'
        }
    }

    const navigation = useNavigate();

    const ToMainScreen = () => {
        return navigation('/ToDoDesk/main')
    }

    return(
        <div className={'MainBackground'}>
            <Row style={{justifyContent: 'center'}}>
                <Column>
                    <p className={'LoginTextLogo'}>DESK</p>
                    <div className={'LoginBlock'}>
                        <Column>
                            <p className={'LoginBlockTitle'}>Авторизация</p>
                            <input className={'LoginTextInput'} placeholder={'Почта'}/>
                            <input style={{marginTop: 13}} className={'LoginTextInput'}  placeholder={'Пароль'} type={'password'}/>
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