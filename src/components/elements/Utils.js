export function Row({children, style = {}, onClick = () => {}}, key = '', id=''){
    return(
        <div style={{flexDirection: 'row', display: 'flex', ...style}} onClick={onClick} key={key === '' ? undefined :key} id={id}>
            {children}
        </div>
    )
}

export function DraggableRow({children, style = {}, onClick = () => {}, onDragStart = () => {}, onDragOver = () => {}, onDragEnd = () => {}}, key = '', id=''){

    return(
        <div style={{flexDirection: 'row', display: 'flex', ...style}} onClick={onClick} key={key === '' ? undefined :key} id={id} draggable
             onDragStart={(e) => onDragStart(e)}
             onDragOver={(e) => onDragOver(e)}
             onDragEnd={(e) => onDragEnd(e)}
        >
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

