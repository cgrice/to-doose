import React from 'react'

const UploadButton = ({
    name,
    onSelectFile,
}) => (
    <React.Fragment>
        <label 
            className="image-select" 
            htmlFor={name}
        >
            Choose an Image
        </label>
        <input 
            type="file" 
            id={name} 
            name={name} 
            onChange={onSelectFile}
        />
    </React.Fragment>
)

export default UploadButton