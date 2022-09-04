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
        }
    }

    let dataToDoList = ['Common', 'Medium', 'Important', 'Very important', 'Done']

    const GetListData = (type) => {
        return []
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
            <Row key={keys} style={style.todoItem}>
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

    return(
        <Column style={{width: '100%', height: '100vh', background: Color.darkBlue}}>
            <Header color={Color.darkGreen} bottomLine={true}/>
            <Row>
                <NavBar/>
                <ToDoLists/>
            </Row>
        </Column>
    )
}