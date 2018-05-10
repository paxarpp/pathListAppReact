import React from 'react'

const Count = ({ count, position, text }) => (
    <span className={"counterWrap "+position}>
        {text}
        <span className="counter" >
            {count}
        </span>
    </span>
)
export default Count;