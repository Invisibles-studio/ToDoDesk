import React, {useState} from "react";
import Header from "../elements/Header";
import {Column, Row} from "../elements/Utils";
import {Color} from "../utils/Constants";
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export default function MainScreen(){

    let [selectedPoint, setSelectedPoint] = useState(1)
    let [projects, setProjects] = useState(['create'])
    let [projects2, setProjects2] = useState([['create']])
    let [users, setUsers] = useState(['TEST','TEST','TEST'])

    let [addUser, setAddUser] = useState('hidden')
    let [selectOrganization, setSelectOrganization] = useState('hidden')
    let [userProfile, setUserProfile] = useState('hidden')
    let [userProfileData, setUserProfileData] = useState({})

    let style = {
        controlBlock: {
            background: Color.darkBlue,
            marginTop: 65,
            marginLeft: '21.771vw',
            borderRadius: 15,
            width: 247
        },
        controlBlockText: {
            color: Color.whiteCoffee,
            fontWeight: '500',
            fontSize: 15,
            margin: 0,
            userSelect: 'none'
        },
        controlBlockRow: {
            alignItems: 'center',
            marginTop: 8,
            cursor: 'pointer',
            borderRadius: 4
        },
        projectsBlock: {
            marginTop: 65,
            marginLeft: 37
        },
        projectsBlockTitle: {
            fontSize: 30,
            fontWeight: '700',
            marginTop: 0,
            color: Color.darkGreen,
            userSelect: 'none',
            marginBottom: 30
        },
        createProjectBlock: {
            background: Color.darkGreen,
            borderRadius: 13,
            width: 188,
            height: 116,
            alignItems: 'center',
            cursor: 'pointer'
        },
        createProjectBlockTitle: {
            color: Color.whiteCoffee,
            fontSize: 14,
            marginTop: 42,
            userSelect: 'none',
            marginBottom: 4
        },
        projectBlock: {
            background: Color.darkGreen,
            borderRadius: 13,
            width: 188,
            height: 116,
            alignItems: 'center',
            cursor: 'pointer',
            marginRight: 20,
            marginBottom: 10
        },
        projectBlockTitle: {
            color: Color.whiteCoffee,
            fontSize: 14,
            marginTop: 42,
            userSelect: 'none',
            marginBottom: 4
        },
        userItem: {
            width: 652,
            height: 50,
            background: Color.darkGreen,
            marginTop: 19,
            borderRadius: 13,
            alignItems: 'center'
        },
        avatar: {
            marginLeft: 17,
            height: 40,
            width: 40,
            background: Color.whiteCoffee,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        avatarText: {
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '700',
            color: Color.darkGreen,
            userSelect: 'none'
        },
        userItemName: {
            color: Color.whiteCoffee,
            fontWeight: '700',
            fontSize: 16,
            marginTop: 0,
            marginBottom: 0,
        },
        userItemEmail: {
            color: Color.whiteCoffee,
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0,
        },
        userItemSelectOrganization: {
            color: Color.whiteCoffee,
            fontSize: 12,
            textDecorationLine: 'underline',
            marginRight: 17,
            marginTop: 2,
            marginBottom: 0,
            cursor: 'pointer'
        },
        addUserBlock: {
            width: 375,
            background: Color.whiteCoffee,
            borderRadius: 12
        },
        addUserBlockTitle: {
            fontSize: 24,
            fontWeight: '700',
            color: Color.darkGreen,
            marginTop: 0,
            marginLeft: 22,
            marginBottom: 0
        },
        addUserBlockInput: {
            background: Color.whiteCoffee,
            borderRadius: 4,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Color.darkGreen,
            marginLeft: 22,
            marginRight: 13,
            marginTop: 13,
            color: Color.darkGreen,
            fontSize: 16,
            fontWeight: '500'
        },
        selectOrganizationTitle: {
            textAlign: 'center',
            color: Color.darkGreen,
            fontSize: 16,
            flex: 2,
            marginTop: 0,
            marginBottom: 0
        },
        selectOrganizationMessage: {
            fontSize: 12,
            color: Color.darkGreen,
            marginLeft: 7,
            marginRight: 28,
            marginTop: 0,
            marginBottom: 0
        },
        selectOrganizationItem: {
            color: Color.darkGreen,
            marginLeft: 7
        },
        userProfileBlock: {
            width: 746,
            background: Color.whiteCoffee,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: 49,
            borderWidth: 2,
            borderColor: Color.darkGreen,
            borderStyle: 'solid'
        },
        userProfileBlockName: {
            fontWeight: '700',
            fontSize: 30,
            color: Color.darkGreen,
            marginLeft: 64,
            marginTop: 0,
            marginBottom: 0
        },
        userProfileBlockTexts: {
            fontSize: 16,
            fontWeight: '700',
            color: Color.darkGreen
        },
        userProfileBlockCurrentTask: {
            background: Color.whiteCoffee,
            borderRadius: 6,
            height: 40,
            borderColor: Color.darkGreen,
            borderStyle: 'solid',
            marginTop: 15,
            marginLeft: 63,
            marginRight: 63,
            cursor: 'pointer',
            alignItems: 'center',
            display: 'flex'
        },
        userProfileBlockCurrentTaskText: {
            fontSize: 16,
            fontWeight: '700',
            color: Color.darkGreen,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 20,
            userSelect: 'none'
        },
        userProfileBlockDarkButtons: {
            background: Color.darkGreen,
            borderRadius: 6,
            cursor: 'pointer'
        },
        userProfileBlockDarkButtonsText: {
            fontSize: 16,
            fontWeight: '700',
            color: Color.whiteCoffee,
            marginLeft: 25,
            marginRight: 25,
            userSelect: 'none'
        }
    }

    const navigation = useNavigate();

    const SelectPoint = (type) => {
        setSelectedPoint(type)
    }

    const DeleteUser = (index) => {
        let list = users
        list.splice(index, 1)
        setUsers([...list])
    }

    const ProjectItem = (name, index, admin = false) => {
        return(
            <div className={'Column MainScreenProjectBlock'} key={index} onClick={() => admin ? {} : navigation('/ToDoDesk/desk/'+name)}>
                <p style={style.projectBlockTitle}>{name}</p>
                {admin && <img src={require('../images/download.png')} style={{width: 24, height: 24}}/>}
            </div>
        )
    }

    const CreateProject = () => {

        let list = projects
        list = list.reverse()
        list.push('test')
        list = list.reverse()
        setProjects(list)
        let list2 = mobile ? sliceIntoChunks(list, 2) : sliceIntoChunks(list, 4)
        setProjects2(list2)
    }

    const CreateProjectBlock = () => {
        return(
            <Column style={{...style.createProjectBlock}} onClick={() => CreateProject()}>
                <p style={style.createProjectBlockTitle}>Create organization</p>
                <img src={require('../images/plus.png')} style={{width: 24, height: 24}}/>
            </Column>
        )
    }

    const UserItem = ({keys, name}) => {
        return(
            <div className={'Row MainScreenUserItem'} key={keys}>
                <Row>
                    <div className={'MainScreenAvatar'}><p className={'MainScreenAvatarText'}>{name.slice(0,1)}</p></div>
                    <Column style={{justifyContent: 'center', marginLeft: 8}}>
                        <p style={style.userItemName}>{name}</p>
                        <p style={style.userItemEmail}>TEST@gmail.com</p>
                    </Column>
                </Row>
                <Row>
                    <img src={require('../images/external_link.png')} style={{width: 24, height: 24, marginRight: 5, cursor: 'pointer'}} onClick={OpenAndCloseUserProfile}/>
                    <p style={style.userItemSelectOrganization} onClick={OpenAndCloseSelectOrganization}>select organizations</p>
                    <img src={require('../images/close_big_coffee.png')} style={{width: 24, height: 24, marginRight: mobile? 5 : 18, cursor: 'pointer'}}
                        onClick={() => DeleteUser(keys)}/>
                </Row>
            </div>
        )
    }

    const CreateUser = () => {
        let username = document.getElementById('username').value
        document.getElementById('username').value = ''
        let firstname = document.getElementById('firstname').value
        document.getElementById('firstname').value = ''
        let lastname = document.getElementById('lastname').value
        document.getElementById('lastname').value = ''
        let email = document.getElementById('email').value
        document.getElementById('email').value = ''
        let password = document.getElementById('password').value
        document.getElementById('password').value = ''
        let role = document.getElementById('role').value
        document.getElementById('role').value = ''
        setUsers([...users, username])
        OpenAndCloseAddUser()
    }

    const OpenAndCloseAddUser = () => {
        if (addUser === 'hidden')
            setAddUser('visible')
        else
            setAddUser('hidden')
    }

    const OpenAndCloseSelectOrganization = () => {
        if (selectOrganization === 'hidden')
            setSelectOrganization('visible')
        else
            setSelectOrganization('hidden')
    }

    const OpenAndCloseUserProfile = () => {
        if (userProfile === 'hidden'){
            setUserProfile('visible')
            setUserProfileData({
                name: 'TEST',
                firstname: 'TEST',
                lastname: 'TEST',
                role: 'admin',
                email: 'TEST@gmail.com'
            })
        }
        else
            setUserProfile('hidden')
    }

    let mobile = window.innerWidth < 800 && window.innerWidth > 200

    return(
        <div className={'MainBackground Column'}>
            <Header/>
            <div className={'Column'}>
                <div className={'MainScreenRow'}>
                    <div className={'Column MainScreenControlBlock'}>
                        <div className={'Row MainScreenControlBlockRow'} style={{marginTop: mobile ? 21 : 26, background: selectedPoint === 1 ? mobile ? 'rgba(118, 250, 193, 0.3)' : 'rgba(203, 197, 234, 0.2)' : 'none'}}
                             onClick={() => SelectPoint(1)}>
                            <img src={require(mobile ? '../images/mobileWindowSidebar.png' : '../images/windowSidebar.png')} style={{
                                width: 30, height: 30, marginLeft: mobile? 22 : 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p className={'MainScreenControlBlockText'}>Проекты</p>
                        </div>
                        <div className={'Row MainScreenControlBlockRow'} style={{background: selectedPoint === 2 ? mobile ? 'rgba(118, 250, 193, 0.3)' : 'rgba(203, 197, 234, 0.2)' : 'none'}}
                             onClick={() => SelectPoint(2)}>
                            <img src={require(mobile ? '../images/mobileUser.png' : '../images/user.png')} style={{
                                width: 30, height: 30, marginLeft: mobile? 22 : 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p className={'MainScreenControlBlockText'}>Пользователи</p>
                        </div>
                        <div className={'Row MainScreenControlBlockRow'} style={{marginBottom: 13, background: selectedPoint === 3 ? mobile ? 'rgba(118, 250, 193, 0.3)' : 'rgba(203, 197, 234, 0.2)' : 'none'}}
                            onClick={() => SelectPoint(3)}>
                            <img src={require(mobile ? '../images/mobileSettingsFuture.png' : '../images/settingsFuture.png')} style={{
                                width: 30, height: 30, marginLeft: mobile? 22 : 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p className={'MainScreenControlBlockText'}>Админ</p>
                        </div>
                    </div>
                    {
                        selectedPoint === 1 &&
                        <Column style={mobile? {marginTop: 27} : style.projectsBlock}>
                            <Row style={mobile? {justifyContent: 'center'} : {justifyContent: 'flex-start'}}>
                                <p className={'MainScreenProjectBlockTitle'}>Ваши организации</p>
                                <img src={require('../images/plusBlack.png')} style={{
                                    width: 30, height: 30, marginLeft: 12, marginTop: 10, cursor: 'pointer'
                                }} onClick={() => CreateProject()}/>
                            </Row>
                            { projects2.map((item, i) => {
                                    return(<div className={'Row MainScreenProjectBlockRow'} key={i}>
                                        {item.map((item2, j) =>{
                                            return item2 === 'create' ? mobile ? <div/> : CreateProjectBlock() : ProjectItem(item2, j)
                                        })}
                                    </div>)
                            })}
                        </Column>
                    }
                    {
                        selectedPoint === 2 &&
                        <Column style={mobile? {marginTop: 27, marginLeft: 8, marginRight: 8} : style.projectsBlock}>
                            <Row style={mobile? {justifyContent: 'center'} : {justifyContent: 'flex-start'}}>
                                <p className={'MainScreenProjectBlockTitle'}>Пользователи</p>
                                <img src={require('../images/plusBlack.png')} style={{
                                    width: 30, height: 30, marginLeft: 12, marginTop: 10, cursor: 'pointer'
                                }} onClick={() => OpenAndCloseAddUser()}/>
                            </Row>
                            {users.map((item, i) => <UserItem keys={i} name={item}/>)}
                        </Column>
                    }
                    {
                        selectedPoint === 3 &&
                        <Column style={style.projectsBlock}>
                            <p style={style.projectsBlockTitle}>Админ панель</p>
                            { projects2.map((item, i) => {
                                return(<Row key={i}>
                                    {item.map((item2, j) =>{
                                        if (item2 === 'create') return
                                        return ProjectItem(item2, j, true)
                                    })}
                                </Row>)
                            })}
                        </Column>
                    }
                </div>
            </div>
            <Column style={{
                position: 'absolute', width: '100%', height: '100%', background: 'rgb(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center',
                visibility: addUser
            }}>
                <Column style={style.addUserBlock}>
                    <Row style={{alignItems: 'center', marginTop: 9, justifyContent: 'space-between'}}>
                        <p style={style.addUserBlockTitle}>Add new user</p>
                        <img src={require('../images/close_big.png')} style={{width: 24, height: 24, marginRight: 13, cursor: 'pointer'}}
                            onClick={() => OpenAndCloseAddUser()}/>
                    </Row>
                    <input style={style.addUserBlockInput}  placeholder={'Username...'} id={'username'} defaultValue={''}/>
                    <input style={style.addUserBlockInput}  placeholder={'First name...'} id={'firstname'} defaultValue={''}/>
                    <input style={style.addUserBlockInput}  placeholder={'Last name...'} id={'lastname'} defaultValue={''}/>
                    <input style={style.addUserBlockInput}  placeholder={'Email...'} id={'email'} defaultValue={''}/>
                    <input style={style.addUserBlockInput}  placeholder={'Password...'} type={'password'} id={'password'} defaultValue={''}/>
                    <input style={{...style.addUserBlockInput, marginBottom: 15}}  placeholder={'Select role...'} id={'role'} defaultValue={''}/>
                    <input type={'submit'} value={'Add'} style={{marginRight: 13, marginLeft: 22, marginTop: 13, marginBottom: 15}}
                           onClick={() => CreateUser()}/>
                </Column>
            </Column>
            <Column style={{
                position: 'absolute', width: '100%', height: '100%', background: 'rgb(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center',
                visibility: selectOrganization
            }}>
                <Column style={{...style.addUserBlock, width: 300}}>
                    <Row style={{marginTop: 10}}>
                        <p style={style.selectOrganizationTitle}>Organizations</p>
                        <img src={require('../images/close_big.png')} style={{width: 24, height: 24, marginRight: 10, cursor: 'pointer'}}
                             onClick={OpenAndCloseSelectOrganization}/>
                    </Row>
                    <div style={{borderRadius: 2, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 0.2, marginLeft: 7, marginRight: 7}}/>
                    <Row>
                        <p style={style.selectOrganizationMessage}>anoiby is a member of the following organizations:</p>
                        <img src={require('../images/cooliconGreen.png')} style={{
                            width: 14, height: 14, marginRight: 15, marginTop: 5, cursor: 'pointer'
                        }}/>
                    </Row>
                    <Column>
                        <p style={style.selectOrganizationItem}>Test</p>
                    </Column>
                </Column>
            </Column>
            <Column style={{
                position: 'absolute', width: '100%', height: '100%', background: 'rgb(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center',
                visibility: userProfile
            }}>
                <div className={'Column MainScreenUserProfileBlock'}>
                    <Row style={{marginTop: 15, alignItems: 'center', justifyContent: 'space-between'}}>
                        <p style={style.userProfileBlockName}>{userProfileData.name}</p>
                        <img src={require('../images/close_big.png')} style={{width: 30, height: 30, marginRight: 33, cursor: 'pointer'}}
                             onClick={OpenAndCloseUserProfile}/>
                    </Row>
                    <div style={{borderRadius: 2, borderStyle: 'solid', borderColor: Color.darkGreen,
                        borderWidth: 0.2, marginLeft: 43, marginRight: 25}}/>
                    <Row style={{justifyContent: 'space-between'}}>
                        <p style={{...style.userProfileBlockTexts, marginLeft: 71, flex: 1}}>First name: {userProfileData.firstname}</p>
                        <p style={{...style.userProfileBlockTexts, marginRight: 71, flex: 1}}>Role: {userProfileData.role}</p>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <p style={{...style.userProfileBlockTexts, marginLeft: 71, flex: 1}}>Last name: {userProfileData.lastname}</p>
                        <p style={{...style.userProfileBlockTexts, marginRight: 71, flex: 1}}>Email: {userProfileData.email}</p>
                    </Row>
                    <div style={{borderRadius: 2, borderStyle: 'solid', borderColor: Color.darkGreen,
                        borderWidth: 0.2, marginLeft: 43, marginRight: 25}}/>
                    <div style={style.userProfileBlockCurrentTask}>
                        <p style={style.userProfileBlockCurrentTaskText}>Current task</p>
                    </div>
                    <Row style={{marginTop: 14}}>
                        <div style={{...style.userProfileBlockDarkButtons, marginLeft: mobile? 10 : 64}}>
                            <p style={style.userProfileBlockDarkButtonsText}>Change password</p>
                        </div>
                        <div style={{...style.userProfileBlockDarkButtons, marginLeft: mobile? 5 : 24, marginRight: mobile? 10 : 0}}>
                            <p style={style.userProfileBlockDarkButtonsText}>Change choosen tasks</p>
                        </div>
                    </Row>
                    <Row style={{justifyContent: 'center', marginTop: 58, marginBottom: 20}}>
                        <Calendar/>
                    </Row>
                </div>
            </Column>
        </div>
    )
}
