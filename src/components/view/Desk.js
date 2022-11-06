import React, {useRef, useState} from "react";
import {Column, DraggableRow, Row} from "../elements/Utils";
import {useParams} from "react-router-dom";
import Header from "../elements/Header";
import NavBar from "../elements/NavBar";
import {Color} from "../utils/Constants";
import {User} from "../models/User.tsx";
import {Firebase} from "../utils/Firebase.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Task} from "../models/Task.tsx";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

export default function Desk(){

    const params = useParams();
    const deskId = params.id

    let style = {
        toDoListComponent: {
            display: 'flex',
            flexDirection: 'column',
            background: Color.whiteCoffee,
            borderRadius: 7,
            width: 255,
            marginRight: 23,
            minWidth: 255
        },
        todoComponentTitle: {
            color: Color.darkBlue,
            fontWeight: '700',
            marginLeft: 10,
            marginTop: 8,
            marginBottom: 0
        },
        todoTopRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        todoAddText: {
            color: 'rgba(49, 61, 90, 0.9)',
            fontWeight: '700',
            marginLeft: 9,
            marginTop: -1,
            marginBottom: 9,
            userSelect: 'none'
        },
        todoItem: {
            background: Color.whiteCoffee,
            marginLeft: 13,
            marginRight: 13,
            height: 20,
            marginTop: 9,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
        todoItemText: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 6,
            color: Color.darkBlue
        },
        menuBlockAll: {
            position: 'absolute',
            margin: 'auto',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(0,0,0,0.4)',
        },
        menuBlock: {
            width: 648,
            background: Color.whiteCoffee,
            borderRadius: 48,
        },
        menuBlockTaskName: {
            fontSize: 20,
            fontWeight: '700',
            color: "black",
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 23,
            outline: 'none',
            borderWidth: 0,
            background: 'white',
            verticalAlign: 'middle'
        },
        menuBlockTaskWhere: {
            fontWeight: '500',
            color: Color.darkBlue,
            marginLeft: 91,
            marginTop: 0,
            marginBottom: 0
        },
        menuBlockTaskWhere2: {
            fontWeight: '500',
            color: Color.darkBlue,
            textDecorationLine: 'underline',
            marginLeft: 5,
            marginTop: 0,
            marginBottom: 0
        },
        menuBlockAction: {
            color: Color.darkBlue,
            fontWeight: '500',
            fontSize: 20,
            marginRight: 51
        },
        menuBlockActionButton: {
            borderRadius: 9,
            background: Color.whiteCoffee,
            borderWidth: 1,
            borderColor: Color.darkBlue,
            borderStyle: 'solid',
            alignItems: 'center',
            marginRight: 17,
            height: 29,
            cursor: 'pointer'
        },
        menuBlockActionButtonText: {
            fontSize: 12,
            color: Color.darkBlue,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 11,
            marginRight: 39,
            userSelect: 'none'
        },
        menuBlockDescriptionTitle: {
            color: Color.darkBlue,
            fontSize: 20,
            fontWeight: '700',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 23
        },
        menuBlockDescriptionBlock: {
            outline: 'none',
            height: 61,
            width: 270,
            maxWidth: 372,
            minWidth: 200,
            background: Color.whiteCoffee,
            borderRadius: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Color.darkBlue,
            textAlign: 'left',
            color: Color.darkBlue,
            fontSize: 12,
            fontWeight: 500
        },
        menuBlockDescriptionButton: {
            background: Color.darkPurple,
            color: Color.whiteCoffee,
            fontWeight: '500',
            fontSize: 12,
            borderRadius: 5,
            paddingLeft: 25,
            paddingRight: 25,
            outline: 'none',
            borderColor: Color.whitePurple,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            paddingTop: 4,
            paddingBottom: 4
        },
        menuBlockCommentsTitle: {
            color: Color.darkBlue,
            fontSize: 20,
            fontWeight: '700',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 23,
        },
        avatar: {
            marginRight: 8,
            height: 40,
            width: 40,
            background: Color.darkBlue,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        avatarText: {
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '700',
            color: Color.whiteCoffee,
            userSelect: 'none'
        },
        menuBlockCommentsInput: {
            background: Color.whiteCoffee,
            borderRadius: 5,
            borderColor: Color.darkBlue,
            borderStyle: 'solid',
            borderWidth: 1,
            height: 28,
            width: 372,
            outline: 'none',
            marginLeft: 19,
            color: Color.darkBlue,
            fontSize: 12,
            fontWeight: '500'
        },
        menuBlockReceptionBlock: {
            background: Color.whiteCoffee,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: Color.darkBlue,
            borderStyle: 'solid',
            marginTop: 100,
            marginRight: 8,
            width: 154
        },
        menuBlockReceptionBlockTitle: {
            color: Color.darkBlue,
            fontSize: 12,
            fontWeight: '700',
            textAlign: 'center',
            flex: 1
        },
        menuBlockReceptionBlockButton: {
            width: 140,
            height: 18,
            background: Color.darkBlue,
            borderRadius: 5,
            marginLeft: 8,
            color: Color.whiteCoffee,
            borderWidth: 0.2,
            marginTop: 4
        }
    }

    let dataToDoList = ['Обычные', 'Средние', 'Важные', 'Очень важные', 'Готовые']

    const GetUserName = () => {
        if (myUserData.username === undefined) return ''
        else return myUserData.username
    }

    const [commonList, setCommonList] = useState([])
    const [mediumList, setMediumList] = useState([])
    const [importantList, setImportantList] = useState([])
    const [veryImportantList, setVeryImportantList] = useState([])
    const [doneList, setDoneList] = useState([])

    const [commonHeight, setCommonHeight] = useState(99)
    const [mediumHeight, setMediumHeight] = useState(99)
    const [importantHeight, setImportantHeight] = useState(99)
    const [veryImportantHeight, setVeryImportantHeight] = useState(99)
    const [doneHeight, setDoneHeight] = useState(99)

    const [selectedTask, setSelectedTask] = useState(1)
    const [menuBlock, setMenuBlock] = useState('hidden')
    const [receptionBlock, setReceptionBlock] = useState('hidden')

    let [initial, setInitial] = useState(false)

    let [myUserData, setMyUserData] = useState(typeof User)

    let [showSetNameTask, setShowSetNameTask] = useState(false)
    let [nameTask, setNameTask] = useState('')
    let [columnIndex, setColumnIndex] = useState(0)

    let stateLists = [
        [commonList, setCommonList, commonHeight, setCommonHeight],
        [mediumList, setMediumList, mediumHeight, setMediumHeight],
        [importantList, setImportantList, importantHeight, setImportantHeight],
        [veryImportantList, setVeryImportantList, veryImportantHeight, setVeryImportantHeight],
        [doneList, setDoneList, doneHeight, setDoneHeight]
    ]

    const dragItem = useRef();
    const dropItem = useRef();

    const firebase = new Firebase()

    const init = async () => {
        if (initial) return
        setInitial(true)
        firebase.getUserData(firebase.getMyUserUid(), (data) => {
            setMyUserData(new User(data))
        })
        firebase.getTaskInProject(deskId, (tasks) => {
            setCommonList(tasks.commonList)
            setCommonHeight(value => value+(31*tasks.commonList.length))
            setMediumList(tasks.mediumList)
            setMediumHeight(value => value+(31*tasks.mediumList.length))
            setImportantList(tasks.importantList)
            setImportantHeight(value => value+(31*tasks.importantList.length))
            setVeryImportantList(tasks.veryImportantList)
            setVeryImportantHeight(value => value+(31*tasks.veryImportantList.length))
            setDoneList(tasks.doneList)
            setDoneHeight(value => value+(31*tasks.doneList.length))
        })
    }

    const dragStart = (e, columnName, position) => {
        dragItem.current = {
            e: e,
            columnName: columnName,
            id: position
        }
        dropItem.current = null
        //console.log(e.target.innerHTML);
    };

    const dragOver = (e, columnName) => {
        e.preventDefault()

        const activeElement = dragItem.current.e
        const currentElement = e.target

        const isMoveable = activeElement !== currentElement

        if(!isMoveable) return

        dropItem.current = {
            e: e,
            columnName: columnName
        }

    }

    const dragEnd = (e) => {
        if (dragItem.current === null || dropItem.current === null) return
        const columnName = dropItem.current.columnName

        const elementColumnIndexOf = dataToDoList.indexOf(dragItem.current.columnName)
        const elementColumnIndexIn = dataToDoList.indexOf(dropItem.current.columnName)

        let functionsOf = stateLists[elementColumnIndexOf]
        let functionsIn = stateLists[elementColumnIndexIn]

        let task = selectedTask

        task.columnName = dataToDoList[elementColumnIndexIn]

        firebase.moveTask(task)

        const el = functionsOf[0][dragItem.current.id]
        let newList = functionsOf[0].filter(item => item !==el)
        functionsOf[1](newList)
        functionsOf[3](value => value-31)

        functionsIn[3](value => value+31)
        newList = functionsIn[0]
        newList.push(el)
        functionsIn[1](newList)
        dragItem.current = null

    }

    const CreateToDoItem = () => {
        let task = new Task({
            name: nameTask,
            columnName: dataToDoList[columnIndex],
            description: '',
            deskId: deskId,
            repeat: 0,
            comments: [],
            id: generateUniqueID()
        })

        stateLists[columnIndex][3](value => value+31)
        stateLists[columnIndex][1](value => [...value, task])

        firebase.createTaskInProject(task)
    }

    const ToDoListItemComponent = ({task, keys, columnName}) => {
        return(
            <DraggableRow key={keys} style={style.todoItem} onClick={() => {
                setSelectedTask(task)
                OpenAndCloseMenuBlock()
            }}
                          onDragStart={(e) => {
                              setSelectedTask(task)
                              dragStart(e, columnName, keys)
                          }}
                          onDragOver={(e) => dragOver(e, columnName)}
                          onDragEnd={(e) => dragEnd(e)}>
                <p style={style.todoItemText}>{task.name}</p>
                <img src={require('../images/statusEmpty.png')} style={{width: 19, height: 9, marginRight: 7}}/>
            </DraggableRow>
        )
    }

    const ToDoListComponent = ({name, keys, index}) => {
        return(
            <div style={{...style.toDoListComponent, height: stateLists[index][2]}} key={keys} id={keys}>
                <Row style={style.todoTopRow}>
                    <p style={style.todoComponentTitle}>{name}</p>
                    <img src={require('../images/moreHorizontal.png')} style={{width: 24, height: 24, marginTop: 4, marginRight: 11}}/>
                </Row>
                <Column>
                    <div>
                        <div style={{marginLeft: 10, marginRight: 10, marginTop: 10, minHeight: 20, background: 'rgba(20, 74, 228, 0.2)', borderRadius: 8, display: 'flex', justifyContent: 'center'}} id={name+"_droppableComponent"} onDragOver={(e) => dragOver(e, name)}>
                            <span style={{color: 'black', textAlign: 'center', fontSize: 12}}>Перетащите задание сюда</span>
                        </div>
                        {stateLists[index][0].map((item, i) => <ToDoListItemComponent task={item} keys={i} columnName={name}/>)}
                    </div>
                </Column>
                <Row style={{alignItems: 'center', marginTop: 18, cursor: 'pointer'}}
                     onClick={() => {
                         setColumnIndex(index)
                         setShowSetNameTask(true)
                     }}>
                    <img src={require('../images/coolicon.png')} style={{width: 14, height: 14, marginLeft: 10, marginBottom: 10}}/>
                    <p style={style.todoAddText}>Добавить</p>
                </Row>
            </div>
        )
    }

    const ToDoLists = () => {
        return(
            <div className={"Row ToDoLists"}>
                {dataToDoList.map((item, i) => <ToDoListComponent name={item} keys={`${item}-${i}`} index={i}/>)}
            </div>
        )
    }

    const OpenAndCloseMenuBlock = () => {
        if (menuBlock === 'hidden')
            setMenuBlock('visible')
        else
            setMenuBlock('hidden')
    }

    const OpenAndCloseReceptionBlock = () => {
        if (receptionBlock === 'hidden')
            setReceptionBlock('visible')
        else
            setReceptionBlock('hidden')
    }

    let mobile = window.innerWidth > 200 && window.innerWidth < 800;

    init()

    return(
        <Column style={{width: '100%', height: '100%', background: "black", overflowY: 'hidden', minHeight: '100vh'}}>
            <Header  bottomLine={true} username={myUserData.username}/>
            <Row>
                <ToDoLists/>
            </Row>


            <Column style={{...style.menuBlockAll, visibility: menuBlock}}>
                <div className={'Column DeskMenuBlock'}>
                    <Row style={{marginTop: 21, justifyContent: 'space-between'}}>
                        <Row>
                            <img src={require('../images/bar_bottom.png')} style={{width: 30, height: 30, marginLeft: mobile? 10: 38}}/>
                            <input style={style.menuBlockTaskName} defaultValue={selectedTask.name}/>
                        </Row>
                        <img src={require('../images/close_big.png')} style={{width: 24, height: 24, marginRight: 32, cursor: 'pointer'}}
                        onClick={() => OpenAndCloseMenuBlock()}/>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Row>
                            <p style={{...style.menuBlockTaskWhere, marginLeft: mobile? 64: 91}}>В колонке</p>
                            <p style={style.menuBlockTaskWhere2}>{selectedTask.columnName}</p>
                        </Row>
                        <p style={style.menuBlockAction}>Действия</p>
                    </Row>
                    <Row style={{justifyContent: 'flex-end'}}>
                        <Row style={style.menuBlockActionButton} onClick={() => OpenAndCloseReceptionBlock()}>
                            <img src={require('../images/clock.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
                            <p style={style.menuBlockActionButtonText}>Повторение</p>
                        </Row>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Row style={{marginTop: mobile? 40:6, marginLeft: mobile? 10:38}}>
                            <img src={require('../images/hamburger.png')} style={{width: 30, height: 30}}/>
                            <p style={style.menuBlockDescriptionTitle}>Описание</p>
                        </Row>
                        <Row style={{...style.menuBlockActionButton, marginTop: 10}}>
                            <img src={require('../images/transfer.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
                            <p style={{...style.menuBlockActionButtonText, marginRight: 34}}>Сменить исполнителя</p>
                        </Row>
                    </Row>
                    <Row style={{marginLeft: mobile? 64: 94}}>
                        <textarea style={style.menuBlockDescriptionBlock} placeholder={'Добавьте более детальное описание...'}/>
                    </Row>
                    <Row style={{marginLeft: mobile? 64: 94, marginTop: 10}}>
                        <input style={style.menuBlockDescriptionButton} type={'submit'} value={"Сохранить"}/>
                        <input style={{...style.menuBlockDescriptionButton, background: Color.darkGreen, marginLeft: 6}} type={'submit'} value={"Отменить"}/>
                    </Row>
                    <Row style={{marginLeft: mobile? 10 : 38, marginTop: 42}}>
                        <img src={require('../images/message.png')} style={{width: 30, height: 30}}/>
                        <p style={style.menuBlockCommentsTitle}>Коментарии</p>
                    </Row>
                    <Row style={{marginLeft: mobile? 10: 35, marginTop: 24, alignItems: 'center', marginRight: mobile? 20: 0, marginBottom: mobile? 0: 20}}>
                        <div style={style.avatar}><p style={style.avatarText}>{GetUserName().slice(0,1)}</p></div>
                        <input style={style.menuBlockCommentsInput} type={"text"} placeholder={'Напишите коментарий...'}/>
                    </Row>
                    <Column style={{position: 'absolute', alignItems: 'flex-end', width: mobile? '100%':648, visibility: receptionBlock}}
                        onClick={() => OpenAndCloseReceptionBlock()}>
                        <Column style={style.menuBlockReceptionBlock}>
                            <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <p style={style.menuBlockReceptionBlockTitle}>Повторение</p>
                                <img src={require('../images/close_big.png')} style={{width: 14, height: 14, cursor: 'pointer', marginRight: 8}}
                                     onClick={() => OpenAndCloseReceptionBlock()}/>
                            </Row>
                            <input type={'submit'} value={'Один раз в день'} style={style.menuBlockReceptionBlockButton}/>
                            <input type={'submit'} value={'Один раз в неделю'} style={style.menuBlockReceptionBlockButton}/>
                            <input type={'submit'} value={'Один раз в месяц'} style={{...style.menuBlockReceptionBlockButton, marginBottom: 14}}/>

                        </Column>
                    </Column>
                </div>
            </Column>

            <Dialog open={showSetNameTask} onClose={() => setShowSetNameTask(false)}>
                <DialogTitle>Создание Задания</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название задания"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setNameTask(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowSetNameTask(false)}>Отмена</Button>
                    <Button onClick={() => {
                        setShowSetNameTask(false)
                        CreateToDoItem()
                    }}>Создать</Button>
                </DialogActions>
            </Dialog>
        </Column>
    )
}
