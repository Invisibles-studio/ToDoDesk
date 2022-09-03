import React from "react";

export function Row({children, style = {}}){
    return(
        <div style={{flexDirection: 'row', display: 'flex', ...style}}>
            {children}
        </div>
    )
}

export function Column({children, style}){
    return(
        <div style={{flexDirection: 'column', display: 'flex', ...style}}>
            {children}
        </div>
    )
}

