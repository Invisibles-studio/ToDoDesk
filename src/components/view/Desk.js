import React, {useState} from "react";
import {Column, Row} from "../elements/Utils";
import {useParams} from "react-router-dom";
import Header from "../elements/Header";
import NavBar from "../elements/NavBar";
import {Color} from "../utils/Constants";

export default function Desk(){

    const params = useParams();
    const deskId = params.id

    let style = {
        todoLists: {
            marginTop: 47,
            marginLeft: 54,
            overflowX: 'scroll',
            overflowY: 'scroll'
        },
        toDoListComponent: {
            display: 'flex',
            flexDirection: 'column',
            background: Color.whiteCoffee,
            borderRadius: 7,
            width: 255,
            height: 69,
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
            color: Color.darkBlue,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 23,
            outline: 'none',
            borderWidth: 0,
            background: Color.whiteCoffee
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
            marginLeft: 49
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

    let dataToDoList = ['Common', 'Medium', 'Important', 'Very important', 'Done']

    const GetListData = (type) => {
        return []
    }

    const GetUserName = () => {
        return 'ANOIBY'
    }

    const [commonList, setCommonList] = useState(GetListData('Common'))
    const [mediumList, setMediumList] = useState(GetListData('Medium'))
    const [importantList, setImportantList] = useState(GetListData('Important'))
    const [veryImportantList, setVeryImportantList] = useState(GetListData('Very important'))
    const [doneList, setDoneList] = useState(GetListData('Done'))

    const [commonHeight, setCommonHeight] = useState(69)
    const [mediumHeight, setMediumHeight] = useState(69)
    const [importantHeight, setImportantHeight] = useState(69)
    const [veryImportantHeight, setVeryImportantHeight] = useState(69)
    const [doneHeight, setDoneHeight] = useState(69)

    const [selectedTask, setSelectedTask] = useState(1)
    const [menuBlock, setMenuBlock] = useState('hidden')
    const [receptionBlock, setReceptionBlock] = useState('hidden')

    let stateLists = [
        [commonList, setCommonList, commonHeight, setCommonHeight], [mediumList, setMediumList, mediumHeight, setMediumHeight],
        [importantList, setImportantList, importantHeight, setImportantHeight], [veryImportantList, setVeryImportantList, veryImportantHeight, setVeryImportantHeight],
        [doneList, setDoneList, doneHeight, setDoneHeight]
    ]

    const CreateToDoItem = (text, funcs, id) => {
        funcs[3](funcs[2]+31)
        funcs[1]([...funcs[0], text])
    }

    const ToDoListItemComponent = ({text, keys}) => {
        return(
            <Row key={keys} style={style.todoItem} onClick={() => OpenAndCloseMenuBlock()}>
                <p style={style.todoItemText}>{text}</p>
                <img src={require('../images/statusEmpty.png')} style={{width: 19, height: 9, marginRight: 7}}/>
            </Row>
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
                    {stateLists[index][0].map((item, i) => <ToDoListItemComponent text={item} keys={i}/>)}
                </Column>
                <Row style={{alignItems: 'center', marginTop: 18, cursor: 'pointer'}}
                     onClick={() => CreateToDoItem("test", stateLists[index], keys)}>
                    <img src={require('../images/coolicon.png')} style={{width: 14, height: 14, marginLeft: 10, marginBottom: 10}}/>
                    <p style={style.todoAddText}>Add task</p>
                </Row>
            </div>
        )
    }

    const ToDoLists = () => {
        return(
            <Row style={style.todoLists}>
                {dataToDoList.map((item, i) => <ToDoListComponent name={item} keys={`${item}-${i}`} index={i}/>)}
            </Row>
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

    return(
        <Column style={{width: '100%', height: '100vh', background: Color.darkBlue}}>
            <Header color={Color.darkGreen} bottomLine={true}/>
            <Row>
                <NavBar/>
                <ToDoLists/>
            </Row>
            <Column style={{...style.menuBlockAll, visibility: menuBlock}}>
                <Column style={style.menuBlock}>
                    <Row style={{marginTop: 21, justifyContent: 'space-between'}}>
                        <Row>
                            <img src={require('../images/bar_bottom.png')} style={{width: 30, height: 30, marginLeft: 38}}/>
                            <input style={style.menuBlockTaskName} defaultValue={'New task'}/>
                        </Row>
                        <img src={require('../images/close_big.png')} style={{width: 24, height: 24, marginRight: 32, cursor: 'pointer'}}
                        onClick={() => OpenAndCloseMenuBlock()}/>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Row>
                            <p style={style.menuBlockTaskWhere}>in the column</p>
                            <p style={style.menuBlockTaskWhere2}>Common</p>
                        </Row>
                        <p style={style.menuBlockAction}>Actions</p>
                    </Row>
                    <Row style={{justifyContent: 'flex-end'}}>
                        <Row style={style.menuBlockActionButton} onClick={() => OpenAndCloseReceptionBlock()}>
                            <img src={require('../images/clock.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
                            <p style={style.menuBlockActionButtonText}>Repetition</p>
                        </Row>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Row style={{marginTop: 6, marginLeft: 38}}>
                            <img src={require('../images/hamburger.png')} style={{width: 30, height: 30}}/>
                            <p style={style.menuBlockDescriptionTitle}>Description</p>
                        </Row>
                        <Row style={{...style.menuBlockActionButton, marginTop: 10}}>
                            <img src={require('../images/transfer.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
                            <p style={{...style.menuBlockActionButtonText, marginRight: 34}}>Сhange the<br></br>performer</p>
                        </Row>
                    </Row>
                    <Row style={{marginLeft: 94}}>
                        <textarea style={style.menuBlockDescriptionBlock} placeholder={'Add a more detailed description...'}/>
                    </Row>
                    <Row style={{marginLeft: 96, marginTop: 10}}>
                        <input style={style.menuBlockDescriptionButton} type={'submit'} value={"Save"}/>
                        <input style={{...style.menuBlockDescriptionButton, background: Color.darkGreen, marginLeft: 6}} type={'submit'} value={"Cancel"}/>
                    </Row>
                    <Row style={{marginLeft: 38, marginTop: 42}}>
                        <img src={require('../images/message.png')} style={{width: 30, height: 30}}/>
                        <p style={style.menuBlockCommentsTitle}>Comments</p>
                    </Row>
                    <Row style={{marginLeft: 35, marginTop: 24, alignItems: 'center', marginBottom: 150}}>
                        <div style={style.avatar}><p style={style.avatarText}>{GetUserName().slice(0,1)}</p></div>
                        <input style={style.menuBlockCommentsInput} type={"text"} placeholder={'Write a comment...'}/>
                    </Row>
                    <Column style={{position: 'absolute', alignItems: 'flex-end', width: 648, visibility: receptionBlock}}
                        onClick={() => OpenAndCloseReceptionBlock()}>
                        <Column style={style.menuBlockReceptionBlock}>
                            <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <p style={style.menuBlockReceptionBlockTitle}>Repetition</p>
                                <img src={require('../images/close_big.png')} style={{width: 14, height: 14, cursor: 'pointer', marginRight: 8}}
                                     onClick={() => OpenAndCloseReceptionBlock()}/>
                            </Row>
                            <input type={'submit'} value={'Once a day'} style={style.menuBlockReceptionBlockButton}/>
                            <input type={'submit'} value={'Once a week'} style={style.menuBlockReceptionBlockButton}/>
                            <input type={'submit'} value={'Once a month'} style={{...style.menuBlockReceptionBlockButton, marginBottom: 14}}/>

                        </Column>
                    </Column>
                </Column>
            </Column>
        </Column>
    )
}