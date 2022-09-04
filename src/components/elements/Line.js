import React from "react";
import {Color} from "../utils/Constants";

export default function Line({color = Color.whiteCoffee, style = {}}){
    return(
        <div style={{background: color, height: 1, ...style}}/>
    )
}