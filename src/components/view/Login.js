import React from "react";
import {Column, Row} from "../elements/Utils";
import {Color} from "../utils/Constants";
import {useNavigate} from "react-router-dom";

export default function Login(){

    let styles = {
        textLogo: {
            fontSize: 60,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 157,
            color: Color.darkGreen,
            marginBottom: 0,
            userSelect: 'none'
        },
        loginBlock: {
            width: 461,
            borderRadius: 40,
            background: Color.darkBlue,
            marginTop: 45
        },
        loginBlockText: {
            fontSize: 27,
            color: Color.whitePurple,
            marginTop: 30,
            textAlign: 'center',
            marginBottom: 11,
            userSelect: 'none'
        },
        textInput: {
            marginTop: 20,
            marginLeft: 51,
            marginRight: 50,
            height: 32,
            borderRadius: 5,
            background: Color.whiteCoffee,
            borderWidth: 0,
            paddingLeft: 19,
            color: Color.darkGreen,
            fontSize: 16,
            fontWeight: '700',
        },
        button: {
            marginTop: 38,
            marginLeft: 139,
            marginRight: 139,
            height: 32,
            color: Color.darkGreen,
            fontSize: 20,
            fontWeight: '700',
            cursor: 'pointer',
            background: Color.whiteCoffee,
            borderRadius: 5,
            borderColor: Color.whitePurple
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
        <div style={{width: '100%', height: '100vh', background: Color.whiteCoffee}}>
            <Row style={{justifyContent: 'center'}}>
                <Column>
                    <p style={styles.textLogo}>DESK</p>
                    <div style={styles.loginBlock}>
                        <Column>
                            <p style={styles.loginBlockText}>LOGIN</p>
                            <input style={styles.textInput} placeholder={'Email address'}/>
                            <input style={styles.textInput} placeholder={'Password'} type={'password'}/>
                            <input type={'submit'} style={styles.button} value={'SIGN IN'} onClick={ToMainScreen}/>
                            <p onClick={() => console.log("No account button pressed")}
                               style={styles.noAccountButton}>No account?</p>
                        </Column>
                    </div>
                </Column>
            </Row>
        </div>
    )
}