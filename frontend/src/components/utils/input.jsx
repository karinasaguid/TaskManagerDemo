import React from "react";

export const Input = ({
    id,
    name,
    type,
    value,
    className = "",
    disabled = false,
    placeholder,
    onChange,
}) => {
    return (
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            className={`block w-full mt-2 
        px-3 py-2 text-gray-600 rounded-[4px] 
        border-2 border-gray-100 ${disabled ? "bg-gray-50" : ""
                } focus:border-primary transition 
                outline-none hover:border-gray-300 ${className}`}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export const Select = ({ name, id, value, onChange, children }) => {
    return (
        <select
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primary"
            style={{ position: 'relative', marginLeft: '12px' }} 
        >
            {children}
        </select>
    );
};

export const Textarea = ({
    id,
    name,
    type,
    value,
    className = "",
    placeholder,
    onChange,
}) => {
    return (
        <textarea
            id={id}
            type={type}
            name={name}
            value={value}
            className={`block w-full h-40 
    mt-2 px-3 py-2 text-gray-600 
    rounded-[4px] border-2 border-gray-100 
        focus:border-primary transition outline-none 
        hover:border-gray-300 ${className}`}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};
