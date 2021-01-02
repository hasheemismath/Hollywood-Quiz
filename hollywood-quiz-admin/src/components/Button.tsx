import React from 'react';

interface ButtonProps {
    onClick: CallableFunction,
    className: string,
    text: string,
    isWorking?: boolean,
}


const Button = (props: ButtonProps) => {
    return (renderButton())

    function renderButton() {

        let disabled = (props.isWorking);
        let text = <span>{props.text}</span>;
        if (props.isWorking) {
            text = <div className="spinner-border"><span className="sr-only">Loading...</span></div>
        }

        return (
            <button type="button"
                disabled={disabled}
                onClick={() => { props.onClick() }}
                className={props.className}>{text}
            </button>
        )
    }
}

export default Button;