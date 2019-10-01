import React from 'react'

const CheckBox = ({
    name,
    onChange,
}) => (
    <label className="checkbox-container">
        <input name={name} type="checkbox" onChange={onChange} />
        <span className="checkmark"></span>
    </label>
)

export default CheckBox