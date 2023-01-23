import React, {useEffect, useState} from "react";
import Header from "../elements/Header";
import {Column, Row} from "../elements/Utils";
import {Color} from "../utils/Constants";
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Firebase} from "../utils/Firebase.tsx";
import {User} from "../models/User.tsx"

import {
    Alert,
    Autocomplete,
    Button, Checkbox, colors,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, ListItemText, Modal, OutlinedInput, Select, Snackbar, TextField
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import writeXlsxFile from "write-excel-file";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export default function MainScreen() {

    let [selectedPoint, setSelectedPoint] = useState(1)
    let [projects, setProjects] = useState(['create'])
    let [projects2, setProjects2] = useState([['create']])
    let [users, setUsers] = useState([])

    let [addUser, setAddUser] = useState('hidden')
    let [selectOrganization, setSelectOrganization] = useState('hidden')
    let [userProfile, setUserProfile] = useState('hidden')
    let [userProfileData, setUserProfileData] = useState({})
    let [myUserData, setMyUserData] = useState(typeof User)
    let [initial, setInitial] = useState(false)
    let [openDialogSave, setOpenDialogSave] = useState(false)
    let [changeParametr, setChangeParametr] = useState(0)
    let [selectedUser, setSelectedUser] = useState('')

    let [addUserUsername, setAddUserUsername] = useState('')
    let [addUserFirstname, setAddUserFirstname] = useState('')
    let [addUserLastname, setAddUserLastname] = useState('')
    let [addUserEmail, setAddUserEmail] = useState('')
    let [addUserPassword, setAddUserPassword] = useState('')

    let [userRole, setUserRole] = useState('')
    let usersRole = ['Сотрудник', 'Администратор', 'СуперАдминистратор']

    let [showSnackbarError, setShowSnackbarError] = useState(false)
    let [showSetNameProject, setShowSetNameProject] = useState(false)
    let [projectName, setProjectName] = useState('')
    let [editProjectUid, setEditProjectUid] = useState('')
    let [editProjectName, setEditProjectName] = useState('')
    let [editProjectObj, setEditProjectObj] = useState(null)

    let [allProjects, setAllProjects] = useState([])
    let [downloadProjectSelected, setDownloadProjectSelected] = useState(null)
    let [showDownloadReportModal, setShowDownloadReportModal] = useState(false)
    let [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
    let [showSnackbarSuccess, setShowSnackbarSuccess] = useState(false)
    let [showUserTasksModal, setShowUserTasksModal] = useState(false)
    let [showEditProjectModal, setShowEditProjectModal] = useState(false)

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
            color: "Black",
            userSelect: 'none',
            marginBottom: 30
        },
        createProjectBlock: {
            background: "#144AE4",
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
            fontSize: 10,
            textDecorationLine: 'underline',
            marginRight: 17,
            marginTop: 4,
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
            color: "black",
            fontSize: 16,
            flex: 2,
            marginTop: 0,
            marginBottom: 0
        },
        selectOrganizationMessage: {
            fontSize: 12,
            color: "black",
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
            color: Color.darkGreen,
            marginTop: 10
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

    const firebase = new Firebase()
    const navigation = useNavigate();

    const SelectPoint = (type) => {
        setSelectedPoint(type)
    }

    const ProjectItem = (object, index, admin = false) => {
        let settings = false
        let showSettings = myUserData.role === "СуперАдминистратор"
        return (
            <div className={'Column MainScreenProjectBlock'} key={index}
                 onClick={() => admin ? openReportModal(object) : settings ? null : navigation('/ToDoDesk/desk/' + object.id)}>
                <p style={style.projectBlockTitle}>{object.name}</p>
                {admin && <img src={require('../images/download.png')} style={{width: 24, height: 24}}/>}
                {!admin && showSettings && <img src={require('../images/setting.png')} style={{width: 24, height: 24, filter: "invert(100%)", marginTop: 10}}
                    onClick={() => {
                        settings = true
                        setEditProjectUid(object.id)
                        setEditProjectObj(object)
                        setShowEditProjectModal(true)
                        setTimeout(() => {
                            settings = false
                        }, 500)
                    }
                    }
                />}
            </div>
        )
    }

    const openReportModal = (obj) => {
        setDownloadProjectSelected(obj)
        setShowDownloadReportModal(true)
        //
    }

    const EditProject = () => {

        let name = ''

        return <Modal
            open={showEditProjectModal}
            onClose={() => setShowEditProjectModal(false)}
        >
            <div style={{height: 190, width: 400, background: '#EAEAEA', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: 10}}>
                <p style={{margin: 0, marginLeft: 20, marginTop: 5}}>Введите новое имя</p>
                <div>
                    <input style={{marginTop: 10, marginBottom: 10, marginLeft: 20, borderWidth: 0, outline: 'none', fontWeight: '700', fontSize: 30, color: Color.darkGreen,}}
                           defaultValue={editProjectObj === null ? '' : editProjectObj.name}
                           onChange={(event) => {
                               name = event.target.value
                           }}
                    />
                </div>
                <div style={{
                    height: 40, backgroundColor: '#144AE4', borderRadius: 10,
                    marginLeft: 20, marginRight: 20, justifyContent: 'center',
                    userSelect: "none", cursor: 'pointer', alignItems: 'center',
                    display: 'flex', marginBottom: 10
                }} onClick={() => {
                    let project = editProjectObj
                    project.name = name
                    firebase.updateProject(project)
                    setShowEditProjectModal(false)
                    window.location.reload(false);
                }}>
                    <p style={{margin: 0, color: 'white'}}>Сохранить</p>
                </div>
                <div style={{
                    height: 40, backgroundColor: 'red', borderRadius: 10,
                    marginLeft: 20, marginRight: 20, justifyContent: 'center',
                    userSelect: "none", cursor: 'pointer', alignItems: 'center',
                    display: 'flex'
                }} onClick={() => {
                    firebase.removeProject(editProjectUid)
                    setShowEditProjectModal(false)
                    window.location.reload(false);
                }}>
                    <p style={{margin: 0, color: 'white'}}>Удалить</p>
                </div>
            </div>
        </Modal>
    }

    const ReportModal = () => {
        let [selectedDayDownloadReport, setSelectedDayDownloadReport] = useState(null)

        let date = new Date()

        let string = date.getFullYear()+'-'+(((date.getMonth()+1).toString().length > 1) ? (date.getMonth()+1).toString() : '0'+(date.getMonth()+1).toString())+'-'+date.getDate()
        return <Modal
            open={showDownloadReportModal}
            onClose={() => setShowDownloadReportModal(false)}
        >
            <div style={{height: 190, width: 400, background: '#EAEAEA', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: 10}}>
                <Column>
                    <span style={{textAlign: 'center', marginTop: 10}}>Выберите период для формирования отчета</span>
                    <div style={{marginLeft: 30, marginTop: 20, flex: 1}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                            <DatePicker
                                views={['year', 'month']}
                                label="Год и месяц"
                                minDate={dayjs('2012-03-01')}
                                maxDate={dayjs(string)}
                                value={selectedDayDownloadReport}
                                onChange={(newValue) => {
                                    setSelectedDayDownloadReport(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button variant={"contained"} style={{marginTop: 20, marginLeft: 30, marginRight: 30}} onClick={() => {
                        if (selectedDayDownloadReport === null) {
                            setShowSnackbarError(true)
                            return
                        }
                        let newValue = selectedDayDownloadReport
                        let month = ((newValue.$M+1).toString().length === 1) ? '0'+(newValue.$M+1).toString() : (newValue.$M+1).toString()
                        let dateString = newValue.$y.toString() + '-' + month
                        generateReportForExcel(dateString, downloadProjectSelected.id)
                    }
                    }>Скачать отчет</Button>
                </Column>
            </div>
        </Modal>
    }

    const updateListProject = (projectsList) => {
        let list = projectsList
        list.push('create')
        setProjects(list)
        let list2 = mobile ? sliceIntoChunks(list, 2) : sliceIntoChunks(list, 4)
        setProjects2(list2)
    }

    const CreateProject = () => {
        firebase.createProject(projectName)
        firebase.getUserProjects((projects) => updateListProject(projects))
    }

    const CreateProjectBlock = () => {
        return (
            <Column style={{...style.createProjectBlock}} onClick={() => setShowSetNameProject(true)}>
                <p style={style.createProjectBlockTitle}>Создать организацию</p>
                <img src={require('../images/plus.png')} style={{width: 24, height: 24}}/>
            </Column>
        )
    }

    const UserItem = ({keys, user}) => {
        let type = user.role === "СуперАдминистратор" ? 1 : user.role === "Администратор" ? 2 : 3
        let color = type === 1 ? 'green' : type === 2 ? 'red' : 'black'
        let margin = type === 1 ? 0 : type === 2 ? 20 : 40
        return (
            <div className={'Row MainScreenUserItem'} key={keys} style={{marginLeft: margin}}>
                <Row>
                    <span style={{backgroundColor: color, width: 20, borderRadius: 10, height: 50}}/>
                    <Row style={{alignItems: 'center'}}>
                        <div className={'MainScreenAvatar'}><p
                            className={'MainScreenAvatarText'}>{user.username.slice(0, 1)}</p></div>
                        <Column style={{justifyContent: 'center', marginLeft: 8}}>
                            <p style={style.userItemName}>{user.firstname}</p>
                            <p style={style.userItemEmail}>{user.mail}</p>
                        </Column>
                    </Row>
                </Row>
                <Row style={{alignItems: 'center'}}>
                    <img src={require('../images/external_link.png')}
                         style={{width: 24, height: 24, marginRight: 5, cursor: 'pointer', visibility: myUserData.role !== usersRole[0] || user.id === myUserData.id ? 'visible' : 'hidden'}}
                         onClick={() => OpenAndCloseUserProfile(user)}/>
                    <p style={{...style.userItemSelectOrganization, fontSize: mobile ? 10 : 12, marginTop: 0, visibility: myUserData.role !== usersRole[0] ? 'visible' : 'hidden'}}
                       onClick={() => {
                           setSelectedUser(user)
                           OpenAndCloseSelectOrganization()
                       }}>Выбрать организации</p>
                </Row>
            </div>
        )
    }

    const CreateUser = data => {
        updateAddUserFields()
        let username = addUserUsername
        let firstname = addUserFirstname
        let lastname = addUserLastname
        let email = addUserEmail
        let password = addUserPassword
        let myId = myUserData.id

        let AList = email.split("@")
        if (AList.length === 1) return

        let part2email = AList[1].split(".")
        if (part2email.length === 1 || part2email[0].length === 0) return
        if (part2email[1].length === 0) return

        let user = new User({
            username: username,
            firstname: firstname,
            lastname: lastname,
            mail: email,
            role: userRole,
            id: '',
            createrId: myId
        })
        //setUsers([...users, ])
        firebase.createUser(user, password)
        setUserRole('')
        setAddUserUsername('')
        setAddUserPassword('')
        setAddUserFirstname('')
        setAddUserEmail('')
        setAddUserLastname('')

        let newList = users
        newList.push(user)

        setUsers(newList)

        OpenAndCloseAddUser()
    }

    const updateAddUserFields = () => {
        let username = document.getElementById('username').value
        let firstname = document.getElementById('firstname').value
        let lastname = document.getElementById('lastname').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        setAddUserUsername(username)
        setAddUserLastname(lastname)
        setAddUserPassword(password)
        setAddUserEmail(email)
        setAddUserFirstname(firstname)
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

    const OpenAndCloseUserProfile = (user) => {
        if (userProfile === 'hidden') {
            setUserProfile('visible')
            setUserProfileData({
                name: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                email: user.mail,
                id: user.id
            })
        } else
            setUserProfile('hidden')
    }

    const init = async () => {
        if (initial) return
        setInitial(true)
        if (firebase.getMyUserUid() === null){
            console.log("We are not authed")
            navigation('/ToDoDesk')
        }

        firebase.getUserProjects((projectsList) => {
            updateListProject(projectsList)
        })
        firebase.getUserData(firebase.getMyUserUid(), (data) => {
            setMyUserData(new User(data))
        })
        let users = await firebase.getAllUsers()
        let superAdminers = []

        let createdUsers = {}

        for (const userIndex in users) {
            let user = users[userIndex]
            if (user.role === "СуперАдминистратор"){
                superAdminers.push(user)
            } else {
                let createdId = user.createrId
                if (!createdUsers.hasOwnProperty(createdId)){
                    createdUsers[createdId] = [user]
                } else {
                    createdUsers[createdId].push(users[userIndex])
                }
            }

        }

        let usersSorted = []

        for (const superAdminIndex in superAdminers) {
            let superAdmin = superAdminers[superAdminIndex]
            usersSorted.push(superAdmin)
            if (createdUsers.hasOwnProperty(superAdmin.id)){
                for (const userIndex in createdUsers[superAdmin.id]) {
                    let user = createdUsers[superAdmin.id][userIndex]
                    if (user.role === "Администратор"){
                        if (user.id in createdUsers){
                            for (const user1Index in createdUsers[user.id]){
                                let user1 = createdUsers[user.id][user1Index]
                                usersSorted.push(user1)
                            }
                        } else {
                            usersSorted.push(user)
                        }
                    } else {
                        usersSorted.push(user)
                    }
                }
            }
        }
        console.log(usersSorted)
        setUsers(usersSorted)
        firebase.getAllProjects(projects => {
            setAllProjects(projects)
        })
    }

    const changeUserData = () => {
        switch (changeParametr) {
            case 1: {
                firebase.setUserData(selectedUser, 1, userProfileData.name)
                break
            }
            case 2: {
                firebase.setUserData(selectedUser, 2, userProfileData.firstname)
                break
            }
            case 3: {
                firebase.setUserData(selectedUser, 3, userProfileData.role)
                break
            }
            case 4: {
                firebase.setUserData(selectedUser, 4, userProfileData.lastname)
                break
            }
            case 5: {
                firebase.setUserData(selectedUser, 5, userProfileData.email)
                break
            }
        }
    }

    const TextInput = ({value, parameter}) => {
        return <input style={{marginLeft: 40, flex: 1, borderWidth: 0, outline: 'none', fontWeight: '700', fontSize: 30, color: Color.darkGreen,}}
                      defaultValue={value}
                      onChange={(event) => {
                          let text = event.target.value
                          let user = userProfileData
                          if (parameter === 1){
                              user.name = text
                          }
                          setUserProfileData(user)

                      }}
                      onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                              setOpenDialogSave(true)
                              setChangeParametr(parameter)
                              setSelectedUser(userProfileData.id)
                          }
                      }}
        />
    }

    const UserProfile = () => {
        if (mobile){
            return <Column style={{position: 'absolute', width: '100%', height: '100%', background: 'white', visibility: userProfile}}>

                <Row style={{ marginTop: 50}}>
                    <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none', flex: 1, textAlign: 'center', fontSize: 20}}
                           defaultValue={userProfileData.name}
                           onChange={(event) => {
                               let text = event.target.value
                               let user = userProfileData
                               user.role = text
                               setUserProfileData(user)

                           }}
                           onKeyDown={(event) => {
                               if (event.key === 'Enter') {
                                   setOpenDialogSave(true)
                                   setChangeParametr(3)
                                   setSelectedUser(userProfileData.id)
                               }
                           }}
                    />
                    <img src={require('../images/close_big.png')}
                         style={{width: 30, height: 30, cursor: 'pointer'}}
                         onClick={() => OpenAndCloseUserProfile(null)}/>
                </Row>
                <div style={{
                    borderRadius: 2, borderStyle: 'solid', borderColor: Color.darkGreen,
                    borderWidth: 0.2, marginTop: 10
                }}/>
                <div style={{...style.userProfileBlockTexts, marginLeft: 31}}>Имя:
                    <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none'}}
                           defaultValue={userProfileData.firstname}
                           onChange={(event) => {
                               let text = event.target.value
                               let user = userProfileData
                               user.firstname = text
                               setUserProfileData(user)

                           }}/>
                </div>
                <div style={{...style.userProfileBlockTexts, marginLeft: 31}}>
                    Фамилия: <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none'}}
                                   defaultValue={userProfileData.lastname}
                                   onChange={(event) => {
                                       let text = event.target.value
                                       let user = userProfileData
                                       user.lastname = text
                                       setUserProfileData(user)

                                   }}
                                   onKeyDown={(event) => {
                                       if (event.key === 'Enter') {
                                           setOpenDialogSave(true)
                                           setChangeParametr(4)
                                           setSelectedUser(userProfileData.id)
                                       }
                                   }}
                /></div>
                <div style={{...style.userProfileBlockTexts, marginLeft: 31}}>
                    Почта: <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none'}}
                                 defaultValue={userProfileData.email}
                                 onChange={(event) => {
                                     let text = event.target.value
                                     let user = userProfileData
                                     user.email = text
                                     setUserProfileData(user)

                                 }}
                                 onKeyDown={(event) => {
                                     if (event.key === 'Enter') {
                                         setOpenDialogSave(true)
                                         setChangeParametr(5)
                                         setSelectedUser(userProfileData.id)
                                     }
                                 }}
                /></div>
                {
                    myUserData.role !== 'Сотрудник' &&
                    <Autocomplete
                        style={{...style.addUserBlockInput, marginBottom: 15, borderWidth: 0,}}
                        disablePortal
                        defaultValue={userProfileData.role}
                        onChange={(event, newValue) => {
                            updateAddUserFields()
                            let text = newValue
                            let user = userProfileData
                            user.role = text
                            setUserProfileData(user)
                        }}
                        options={usersRole}
                        sx={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Роль" onKeyDown={event => {
                            if (event.key === 'Enter') {
                                setOpenDialogSave(true)
                                setChangeParametr(3)
                                setSelectedUser(userProfileData.id)
                            }
                        }
                        }/>}
                    />
                }
                <div style={{
                    borderRadius: 2, borderStyle: 'solid', borderColor: Color.darkGreen,
                    borderWidth: 0.2, marginTop: 10
                }}/>
                <div style={style.userProfileBlockCurrentTask} onClick={() =>  setShowUserTasksModal(true)}>
                    <p style={style.userProfileBlockCurrentTaskText}>Текущие задания</p>
                </div>
                {
                    userProfileData.id === myUserData.id &&
                    <Row style={{marginTop: 14}}>
                        <div style={{...style.userProfileBlockDarkButtons, marginLeft: 10, flex: 1, marginRight: 10}} onClick={() => setShowChangePasswordModal(true)}>
                            <p style={style.userProfileBlockDarkButtonsText}>Поменять пароль</p>
                        </div>
                    </Row>
                }
                <Row style={{justifyContent: 'center', marginTop: 58, marginBottom: 20}}>
                    <Calendar/>
                </Row>
            </Column>
        }
        else{
            return <Column style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgb(0,0,0,0.4)',
                justifyContent: 'center',
                alignItems: 'center',
                visibility: userProfile
            }}>
                <div className={'Column MainScreenUserProfileBlock'}>
                    <Row style={{marginTop: 15, alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                        <TextInput value={userProfileData.name} parameter={1}/>
                        <div style={{flex: 0.2, marginRight: 20, justifyContent: 'right', display: 'flex'}}>
                            <img src={require('../images/close_big.png')}
                                 style={{width: 30, height: 30, cursor: 'pointer'}}
                                 onClick={() => OpenAndCloseUserProfile(null)}/>
                        </div>

                    </Row>
                    <div style={{
                        borderRadius: 2, borderStyle: 'solid', borderColor: Color.darkGreen,
                        borderWidth: 0.2, marginLeft: 43, marginRight: 25
                    }}/>
                    <Row style={{justifyContent: 'space-between'}}>
                        <div style={{...style.userProfileBlockTexts, marginLeft: 71, flex: 1}}>Имя: <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none'}}
                                   defaultValue={userProfileData.firstname}
                                   onChange={(event) => {
                                       let text = event.target.value
                                       let user = userProfileData
                                       user.firstname = text
                                       setUserProfileData(user)

                                   }}
                                   onKeyDown={(event) => {
                                       if (event.key === 'Enter') {
                                           setOpenDialogSave(true)
                                           setChangeParametr(2)
                                           setSelectedUser(userProfileData.id)
                                       }
                                   }}
                            /></div>
                        <div style={{
                            ...style.userProfileBlockTexts,
                            marginRight: 71,
                            flex: 1
                        }}>Фамилия: <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none'}}
                                           defaultValue={userProfileData.lastname}
                                           onChange={(event) => {
                                               let text = event.target.value
                                               let user = userProfileData
                                               user.lastname = text
                                               setUserProfileData(user)

                                           }}
                                           onKeyDown={(event) => {
                                               if (event.key === 'Enter') {
                                                   setOpenDialogSave(true)
                                                   setChangeParametr(4)
                                                   setSelectedUser(userProfileData.id)
                                               }
                                           }}
                        /></div>
                    </Row>
                    <Row style={{marginLeft: 71, }}>
                        <div style={{
                            ...style.userProfileBlockTexts,
                        }}>Почта: <input style={{...style.userProfileBlockTexts, borderWidth: 0, outline: 'none'}}
                                         defaultValue={userProfileData.email}
                                         onChange={(event) => {
                                             let text = event.target.value
                                             let user = userProfileData
                                             user.email = text
                                             setUserProfileData(user)

                                         }}
                                         onKeyDown={(event) => {
                                             if (event.key === 'Enter') {
                                                 setOpenDialogSave(true)
                                                 setChangeParametr(5)
                                                 setSelectedUser(userProfileData.id)
                                             }
                                         }}
                        /></div>
                    </Row>
                    <div style={{...style.userProfileBlockTexts, marginLeft: 51, flex: 1}}>
                        {
                            myUserData.role !== 'Сотрудник' &&
                            <Autocomplete
                                style={{...style.addUserBlockInput, marginBottom: 15, borderWidth: 0,}}
                                disablePortal
                                defaultValue={userProfileData.role}
                                onChange={(event, newValue) => {
                                    updateAddUserFields()
                                    let text = newValue
                                    let user = userProfileData
                                    user.role = text
                                    setUserProfileData(user)
                                }}
                                options={usersRole}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Роль" onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        setOpenDialogSave(true)
                                        setChangeParametr(3)
                                        setSelectedUser(userProfileData.id)
                                    }
                                }
                                }/>}
                            />
                        }
                    </div>
                    <div style={{
                        borderRadius: 2, borderStyle: 'solid', borderColor: Color.darkGreen,
                        borderWidth: 0.2, marginLeft: 43, marginRight: 25
                    }}/>
                    <div style={style.userProfileBlockCurrentTask} onClick={() =>  setShowUserTasksModal(true)}>
                        <p style={style.userProfileBlockCurrentTaskText}>Текущие задания</p>
                    </div>
                    {
                        userProfileData.id === myUserData.id &&
                        <Row style={{marginTop: 14}}>
                            <div style={{...style.userProfileBlockDarkButtons, marginLeft: 64, flex: 1, marginRight: 64}} onClick={() => setShowChangePasswordModal(true)}>
                                <p style={style.userProfileBlockDarkButtonsText}>Поменять пароль</p>
                            </div>
                        </Row>
                    }
                    <Row style={{justifyContent: 'center', marginTop: 58, marginBottom: 20}}>
                        <Calendar/>
                    </Row>
                </div>
            </Column>
        }
    }

    const AddUser = () => {
        return <Column style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgb(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            visibility: addUser
        }}>
            <Column style={style.addUserBlock}>
                <Row style={{alignItems: 'center', marginTop: 9, justifyContent: 'space-between'}}>
                    <p style={style.addUserBlockTitle}>Добавить нового пользователя</p>
                    <img src={require('../images/close_big.png')}
                         style={{width: 24, height: 24, marginRight: 13, cursor: 'pointer'}}
                         onClick={() => OpenAndCloseAddUser()} />
                </Row>
                <input style={style.addUserBlockInput} placeholder={'Имя пользователя...'} id={'username'}
                       defaultValue={addUserUsername} />
                <input style={style.addUserBlockInput} placeholder={'Имя...'} id={'firstname'} defaultValue={addUserFirstname} />
                <input style={style.addUserBlockInput} placeholder={'Фамилия...'} id={'lastname'}
                       defaultValue={addUserLastname} />
                <input style={style.addUserBlockInput} placeholder={'Почта...'} id={'email'} defaultValue={addUserEmail} />
                <input style={style.addUserBlockInput} placeholder={'Пароль...'} type={'password'} id={'password'}
                       defaultValue={addUserPassword} />
                <Autocomplete
                    style={{...style.addUserBlockInput, marginBottom: 15, borderWidth: 0, width: 340}}
                    disablePortal
                    value={userRole}
                    onChange={(event, newValue) => {
                        updateAddUserFields()
                        setUserRole(newValue);
                    }}
                    options={usersRole}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Роль"/>}
                />
                <input type={'submit'} value={'Добавить'} style={{marginRight: 13, marginLeft: 22, marginTop: 13, marginBottom: 15}} onClick={() => {
                    updateAddUserFields()
                    CreateUser()
                }
                } />
            </Column>
        </Column>
    }

    const generateReportForExcel = async (date, deskId) => {
        let data = await firebase.getReport(date, deskId)

        if (data === undefined || data === null) {
            setShowSnackbarError(true)
            return
        }

        let maxProjects = 0

        const csvData = []

        const HEADER_ROW = [
            {
                value: 'Номер ряда',
                fontWeight: 'bold',
                align: 'center',
                alignVertical: 'center'
            },
            {
                value: 'Дата',
                fontWeight: 'bold',
                align: 'center',
                alignVertical: 'center'
            },
        ]

        csvData.push(HEADER_ROW)

        let dates = Object.keys(data)

        for (let i = 0; i < dates.length; i++) {

            let key = dates[i]
            let obj = data[key]

            let csvLine = []

            csvLine.push({
                type: Number,
                value: (i+1),
                height: 100,
                align: 'center',
                alignVertical: 'center'
            })

            csvLine.push({
                type: String,
                value: date+'-'+key,
                height: 100,
                align: 'center',
                alignVertical: 'center'
            })

            let projectIds = Object.keys(obj)

            if (projectIds.length > maxProjects){
                maxProjects = projectIds.length
            }

            for (let j = 0; j < projectIds.length; j++) {

                let projectId = projectIds[j]
                let project = obj[projectId]

                let string = ''

                string += 'Задание: '+project.name+'\n'
                string += 'Описание: '+project.description+'\n'

                let user = await firebase.getUserById(project.executor)
                string += 'Выполняющий: '+user.firstname+' '+user.lastname+' '+user.username+' '+user.mail+' '+user.role

                csvLine.push({
                    type: String,
                    value: string,
                    height: 100,
                    width: 600,
                    wrap: true,
                    align: 'left',
                    alignVertical: 'center'
                })
            }

            csvData.push(csvLine)
        }

        let columns = [ {width: 14}, {width: 14}, ]

        for (let i = 0; i < maxProjects; i++) {
            columns.push({width: 75})
        }

        const buffer = await writeXlsxFile(csvData, { columns: columns, buffer: true,  })

        let file = new Blob([buffer], {
            type: ''
        })

        let csvUrl = window.URL.createObjectURL(file)
        let tempLink = document.createElement('a')
        tempLink.href = csvUrl
        tempLink.setAttribute('download', 'report-'+date+'-'+deskId+'.xlsx')
        tempLink.click()

    }

    const UserTasksModal = () => {

        let [userTasks, setUserTasks] = useState([])

        firebase.getUserTasks(userProfileData.id, (tasks) => setUserTasks(tasks))

        return <Modal
            open={showUserTasksModal}
            onClose={() => setShowUserTasksModal(false)}
        >
            <div style={{minWidth: 300, minHeight: 200, background: '#EAEAEA', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: 10}}>
                <Column>
                    <span style={{marginTop: 10, marginRight: 30, marginLeft: 30, fontSize: 16, fontWeight: '500'}}>Просмотр выбранных проектов пользователя: {userProfileData.name}</span>
                    <Column style={{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10}}>
                        {
                            userTasks.map((task, i) => {
                                return <Row key={task.id}>
                                    <span>{task.name}</span>
                                </Row>
                            })
                        }
                        {
                            userTasks.length === 0 &&
                            <span style={{textAlign: 'center'}}>У пользователя нет выбранных заданий</span>
                        }
                    </Column>
                </Column>
            </div>
        </Modal>
    }

    init()

    let mobile = window.innerWidth < 800 && window.innerWidth > 200
    let width = window.innerWidth


    return (
        <div className={'MainBackground Column'}>
            <Header username={myUserData.username}/>
            <div className={'Column'}>
                <div className={'MainScreenRow'}>
                    <div className={'Column MainScreenControlBlock'}>
                        <div className={'Row MainScreenControlBlockRow'} style={{
                            marginTop: mobile ? 21 : 26,
                            background: selectedPoint === 1 ? mobile ? 'rgba(118, 250, 193, 0.3)' : 'rgba(203, 197, 234, 0.2)' : 'none'
                        }}
                             onClick={() => SelectPoint(1)}>
                            <img
                                src={require(mobile ? '../images/mobileWindowSidebar.png' : '../images/windowSidebar.png')}
                                style={{
                                    width: 30, height: 30, marginLeft: mobile ? 22 : 34, marginRight: 14, marginTop: 2
                                }}/>
                            <p className={'MainScreenControlBlockText'}>Проекты</p>
                        </div>
                        <div className={'Row MainScreenControlBlockRow'}
                             style={{background: selectedPoint === 2 ? mobile ? 'rgba(118, 250, 193, 0.3)' : 'rgba(203, 197, 234, 0.2)' : 'none'}}
                             onClick={() => SelectPoint(2)}>
                            <img src={require(mobile ? '../images/mobileUser.png' : '../images/user.png')} style={{
                                width: 30, height: 30, marginLeft: mobile ? 22 : 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p className={'MainScreenControlBlockText'}>Пользователи</p>
                        </div>
                        <div className={'Row MainScreenControlBlockRow'} style={{
                            marginBottom: 13,
                            background: selectedPoint === 3 ? mobile ? 'rgba(118, 250, 193, 0.3)' : 'rgba(203, 197, 234, 0.2)' : 'none'
                        }}
                             onClick={() => SelectPoint(3)}>
                            <img
                                src={require(mobile ? '../images/mobileSettingsFuture.png' : '../images/settingsFuture.png')}
                                style={{
                                    width: 30, height: 30, marginLeft: mobile ? 22 : 34, marginRight: 14, marginTop: 2
                                }}/>
                            <p className={'MainScreenControlBlockText'}>Админ</p>
                        </div>
                    </div>
                    {
                        selectedPoint === 1 &&
                        <Column style={mobile ? {marginTop: 27} : style.projectsBlock}>
                            <Row style={mobile ? {justifyContent: 'center'} : {justifyContent: 'flex-start'}}>
                                <p className={'MainScreenProjectBlockTitle'}>Ваши организации</p>
                                {mobile &&
                                    <img src={require('../images/plusBlack.png')} style={{
                                        width: 30, height: 30, marginLeft: 12, marginTop: 5, cursor: 'pointer'
                                    }} onClick={() => setShowSetNameProject(true)}/>
                                }
                            </Row>
                            {projects2.map((item, i) => {
                                return (<div className={'Row MainScreenProjectBlockRow'} key={i}>
                                    {item.map((item2, j) => {
                                        return item2 === 'create' ? mobile ?
                                            <div/> : CreateProjectBlock() : ProjectItem(item2, j)
                                    })}
                                </div>)
                            })}
                        </Column>
                    }
                    {
                        selectedPoint === 2 &&
                        <Column style={mobile ? {marginTop: 27, marginLeft: 8, marginRight: 8} : style.projectsBlock}>
                            <Row style={mobile ? {justifyContent: 'center'} : {justifyContent: 'flex-start'}}>
                                <p className={'MainScreenProjectBlockTitle'}>Пользователи</p>
                                <img src={require('../images/plusBlack.png')} style={{
                                    width: 30, height: 30, marginLeft: 12, marginTop: 5, cursor: 'pointer'
                                }} onClick={() => OpenAndCloseAddUser()}/>
                            </Row>
                            <Row style={{alignItems: "center", marginTop: 5}}>
                                <span style={{width: 10, height: 10, backgroundColor: "green", borderRadius: 360}}/>
                                <p style={{margin: 0, marginLeft: 10}}>Супер Администратор</p>
                            </Row>
                            <Row style={{alignItems: "center",  marginTop: 5}}>
                                <span style={{width: 10, height: 10, backgroundColor: "red", borderRadius: 360}}/>
                                <p style={{margin: 0, marginLeft: 10}}>Администратор</p>
                            </Row>
                            <Row style={{alignItems: "center", marginTop: 5}}>
                                <span style={{width: 10, height: 10, backgroundColor: "black", borderRadius: 360}}/>
                                <p style={{margin: 0, marginLeft: 10}}>Сотрудник</p>
                            </Row>
                            {users.map((item, i) => <UserItem keys={i} user={item}/>)}
                        </Column>
                    }
                    {
                        selectedPoint === 3 &&
                        <Column style={mobile ? {marginTop: 27, marginLeft: 8, marginRight: 8} : style.projectsBlock}>
                            <p className={'MainScreenProjectBlockTitle'}>Админ панель</p>
                            {projects2.map((item, i) => {
                                return (<div className={'Row MainScreenProjectBlockRow'} key={i}>
                                    {item.map((item2, j) => {
                                        if (item2 === 'create') return
                                        return ProjectItem(item2, j, true)
                                    })}
                                </div>)
                            })}
                        </Column>
                    }
                </div>
            </div>

            <UserProfile/>

            <AddUser/>

            <Column style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgb(0,0,0,0.4)',
                justifyContent: 'center',
                alignItems: 'center',
                visibility: selectOrganization
            }}>
                <Column style={{...style.addUserBlock, width: 300}}>
                    <Row style={{marginTop: 10}}>
                        <p style={style.selectOrganizationTitle}>Организации</p>
                        <img src={require('../images/close_big.png')}
                             style={{width: 24, height: 24, marginRight: 10, cursor: 'pointer'}}
                             onClick={OpenAndCloseSelectOrganization}/>
                    </Row>
                    <div style={{
                        borderRadius: 2, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 0.2, marginLeft: 7, marginRight: 7
                    }}/>
                    <Row>
                        <p style={style.selectOrganizationMessage}>{selectedUser.username} принадлежит к следующим организациям:</p>
                    </Row>
                    <Column>
                        {allProjects.map((project, i) => {
                            return <Row style={{alignItems: 'center'}}>
                                <Checkbox checked={project.usersInProject.includes(selectedUser.id)} onChange={(e) => {
                                    let checked = e.target.checked

                                    let value = project

                                    if (checked){
                                        if (value.usersInProject.includes(selectedUser.id)) return
                                        value.usersInProject.push(selectedUser.id)
                                    }
                                    else{
                                        let list = value.usersInProject.filter(user => user !== selectedUser.id)
                                        value.usersInProject = list;
                                    }

                                    firebase.updateProject(value)
                                    setAllProjects((val) => {
                                        let list = val.filter(proj => proj.id !== value.id)
                                        list.push(value)
                                        return list
                                    })
                                }
                                }/>
                                <span>{project.name}</span>
                            </Row>
                        })}
                    </Column>
                </Column>
            </Column>

            <Dialog open={openDialogSave}>
                <DialogTitle>
                    {"Вы хотите сохранить изменения?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        После подтверждения изменения вступят в силу и их нельзя будет отменить. Вы уверены, что хотите
                        сохранить внесенные вами изменения?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDialogSave(false)
                        changeUserData()
                    }}>
                        Принять
                    </Button>
                    <Button onClick={() => setOpenDialogSave(false)}>
                        Отменить
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={showSnackbarError} autoHideDuration={6000} onClose={() => setShowSnackbarError(false)}>
                <Alert onClose={() => setShowSnackbarError(false)} severity="error" sx={{ width: '100%' }}>
                    Ошибка!
                </Alert>
            </Snackbar>

            <Snackbar open={showSnackbarSuccess} autoHideDuration={6000} onClose={() => setShowSnackbarSuccess(false)}>
                <Alert onClose={() => setShowSnackbarSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Пароль успешно изменен!
                </Alert>
            </Snackbar>

            <Dialog open={showSetNameProject} onClose={() => setShowSetNameProject(false)}>
                <DialogTitle>Создание организации</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите название организации.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название организации"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setProjectName(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowSetNameProject(false)}>Отмена</Button>
                    <Button onClick={() => {
                        setShowSetNameProject(false)
                        CreateProject()
                    }}>Создать</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)}>
                <DialogTitle>Смена пароля</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите новый пароль
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Пароль"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setProjectName(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowChangePasswordModal(false)}>Отмена</Button>
                    <Button onClick={() => {
                        setShowChangePasswordModal(false)
                        let password = projectName
                        firebase.changePassword(password,
                            () => {
                            setShowSnackbarError(true)
                        },
                            () => {
                                setShowSnackbarSuccess(true)
                            }
                            )
                        setProjectName('')
                    }}>Поменять</Button>
                </DialogActions>
            </Dialog>

            <ReportModal/>

            <UserTasksModal/>

            <EditProject/>
        </div>
    )
}
