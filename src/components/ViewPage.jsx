import React from 'react'
import '../css/view.css'

import { saveAs } from 'file-saver'



const ViewPage = ({
    image,
    onBack,
}) => {
    const saveImage = () => {
        saveAs(image, `to-doose-${Date.now()}.png`)
    }

    return (
        <div className="view">
            <img src={image} alt="" />
            <button className="btn-secondary" onClick={onBack}>go back</button>
            <button className="btn-primary" onClick={saveImage}>download</button>
        </div>
    )
    
}

export default ViewPage