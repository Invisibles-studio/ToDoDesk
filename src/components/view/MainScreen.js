import React from "react";
import Header from "../elements/Header";
import {Column, Row} from "../elements/Utils";
import {Color} from "../utils/Constants";

export default function MainScreen(){

    let style = {
        controlBlock: {
            background: Color.darkBlue,
            marginTop: 65,
            marginLeft: '21.771vw',
            borderRadius: 15
        }
    }

    return(
        <Column>
            <Header/>
            <Column>
                <Row>
                    <Column style={style.controlBlock}>
                        <Row>
                            <img/>
                            <p>Projects</p>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Column>
    )
}
