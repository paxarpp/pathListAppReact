import React from 'react';

const Button = ({ handler,styleButton, children }) => {
    return (
        <a onClick={handler} className={styleButton}>{children}</a>
    )
}
export default Button;