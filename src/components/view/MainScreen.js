import React, {useState} from "react";
import Header from "../elements/Header";
import {Column, Row} from "../elements/Utils";
import {Color} from "../utils/Constants";
import {useNavigate} from "react-router-dom";

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
        }
    }

    const navigation = useNavigate();

    const SelectPoint = (type) => {
        setSelectedPoint(type)
    }

    const ProjectItem = (name, index) => {
        return(
            <Column style={style.projectBlock} key={index} onClick={() => navigation('/desk/'+name)}>
                <p style={style.projectBlockTitle}>{name}</p>
            </Column>
        )
    }

    const CreateProject = () => {

        let list = projects
        list = list.reverse()
        list.push('test')
        list = list.reverse()
        setProjects(list)
        let list2 = sliceIntoChunks(list, 4)
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

    return(
        <Column style={{width: '100%', height: '100vh', background: Color.whiteCoffee}}>
            <Header/>
            <Column>
                <Row>
                    <Column style={style.controlBlock}>
                        <Row style={{...style.controlBlockRow, marginTop: 26, background: selectedPoint === 1 ? 'rgba(203, 197, 234, 0.2)' : 'none'}}
                             onClick={() => SelectPoint(1)}>
                            <img src={require('../images/windowSidebar.png')} style={{
                                width: 30, height: 30, marginLeft: 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p style={style.controlBlockText}>Projects</p>
                        </Row>
                        <Row style={{...style.controlBlockRow, background: selectedPoint === 2 ? 'rgba(203, 197, 234, 0.2)' : 'none'}}
                             onClick={() => SelectPoint(2)}>
                            <img src={require('../images/user.png')} style={{
                                width: 30, height: 30, marginLeft: 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p style={style.controlBlockText}>Users</p>
                        </Row>
                        <Row style={{...style.controlBlockRow, marginBottom: 13, background: selectedPoint === 3 ? 'rgba(203, 197, 234, 0.2)' : 'none'}}
                            onClick={() => SelectPoint(3)}>
                            <img src={require('../images/settingsFuture.png')} style={{
                                width: 30, height: 30, marginLeft: 34, marginRight: 14, marginTop: 2
                            }}/>
                            <p style={style.controlBlockText}>Admin</p>
                        </Row>
                    </Column>
                    {
                        selectedPoint === 1 &&
                        <Column style={style.projectsBlock}>
                            <p style={style.projectsBlockTitle}>Your organizations</p>
                            { projects2.map((item, i) => {
                                    return(<Row key={i}>
                                        {item.map((item2, j) =>{
                                            return item2 === 'create' ? CreateProjectBlock() : ProjectItem(item2, j)
                                        })}
                                    </Row>)
                            })}
                        </Column>
                    }
                </Row>
            </Column>
        </Column>
    )
}
