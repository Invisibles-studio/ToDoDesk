import React, {useEffect, useState} from "react";
import {Column, Row} from "../elements/Utils";
import {Color, Strings} from "../utils/Constants";
import {useNavigate} from "react-router-dom";
import { Firebase } from "../utils/Firebase.tsx"
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar
} from "@mui/material";

export default function Login(){

    const navigation = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let [showSnackbarError, setShowSnackbarError] = useState(false)
    let [showNotAccountDialog, setShowNotAccountDialog] = useState(false)

    let firebase = new Firebase()

    const ToMainScreen = () => {
        if (email === '' || password === '') {
            setShowSnackbarError(true)
            return
        }
        firebase.signIn(email, password, () => {navigation('/ToDoDesk/main')}, () => setShowSnackbarError(true))
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
                            <p onClick={() => setShowNotAccountDialog(true)}
                               className={'LoginNoAccountButton'}>Нет аккаунта?</p>
                        </Column>
                    </div>
                </Column>
            </Row>

            <Snackbar open={showSnackbarError} autoHideDuration={6000} onClose={() => setShowSnackbarError(false)} anchorOrigin={{ vertical:'bottom', horizontal:'center'}}>
                <Alert onClose={() => setShowSnackbarError(false)} severity="error" sx={{ width: '100%' }}>
                    Неверный логин или пароль!
                </Alert>
            </Snackbar>

            <Dialog open={showNotAccountDialog}>
                <DialogTitle>
                    {"У вас нет аккаунта?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Для входа в систему у вас обязательно должен быть аккаунт. <br/>
                        Если у вас его нет обратитесь к системному администратору. <br/>
                        Если же вы забыли свой пароль, так же обратитесь к системному администратору для востановленеия пароля. <br/><br/>

                        Контактные данные: {'<Тут может быть почта системного администратора>'}<br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowNotAccountDialog(false)
                    }}>
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
