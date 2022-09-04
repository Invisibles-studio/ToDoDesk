import React from "react";

export function Row({children, style = {}, onClick = () => {}}, key = '', id=''){
    return(
        <div style={{flexDirection: 'row', display: 'flex', ...style}} onClick={onClick} key={key === '' ? undefined :key} id={id}>
            {children}
        </div>
    )
}

export function Column({children, style = {}, onClick = () => {}, key = '', id=''}){
    return(
        <div style={{flexDirection: 'column', display: 'flex', ...style}} onClick={onClick} key={key === '' ? undefined :key} id={id}>
            {children}
        </div>
    )
}

