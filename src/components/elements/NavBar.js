import React, {useState} from "react";
import {Column, Row} from "./Utils";
import {Color} from "../utils/Constants";
import Line from "./Line";

export default function NavBar(){

    let style = {
        avatar: {
            marginRight: 8,
            height: 50,
            width: 50,
            background: Color.whiteCoffee,
            borderRadius: 25,
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
        nameText: {
            color: Color.whiteCoffee,
            fontSize: 25,
            fontWeight: '700',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 12
        },
        organizationBlockText:{
            marginLeft: 17,
            marginTop: 42,
            color: Color.whiteCoffee,
            fontSize: 16,
            fontWeight: '700',
            userSelect: 'none',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        projectsText: {
            marginLeft: 18,
            marginTop: 9,
            color: Color.whiteCoffee,
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 0
        }
    }

    const GetUserName = () => {
        return 'ANOIBY'
    }

    const GetDesks = () => {
        return ['test']
    }

    const CreateProject = () => {
        setProjects([...projects, 'new organization'])
    }

    const [projects, setProjects] = useState(GetDesks())

    return(
        <Column style={{width: 259, height: '94.40337909186906vh', background: Color.darkGreen, overflowY: 'scroll'}}>
            <Row style={{marginLeft: 17, marginTop: 22, alignItems: 'center'}}>
                <div style={style.avatar}><p style={style.avatarText}>{GetUserName().slice(0,1)}</p></div>
                <p style={style.nameText}>{GetUserName()}</p>
            </Row>
            <Row style={style.organizationBlockText}>
                <p style={{margin: 0}}>My organizations</p>
                <img src={require('../images/plus.png')} style={{
                    width: 14, height: 14, cursor: 'pointer', marginRight: 13
                }} onClick={() => CreateProject()}/>
            </Row>
            <Line style={{marginLeft: 18, marginRight: 13, marginTop: 9}}/>
            {projects.map((item,i) => {
                return <p style={style.projectsText} key={i}>{item}</p>
            })}
        </Column>
    )
}