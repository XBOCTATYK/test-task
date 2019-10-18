import React from 'react';

const TextInput = ({label, value, onChange, onFocus, onBlur}) => {
    return (
        <div className="text-input">
            <label className="text-input__label">{label}</label>
            <input className="text-input__input"
                   onChange={onChange}
                   onFocus={onFocus}
                   onBlur={onBlur}
                   value={value}
            />
        </div>
    );
};

export default TextInput;
