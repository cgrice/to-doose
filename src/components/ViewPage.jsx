import React from 'react'
import '../css/view.css'

const ViewPage = ({
    image,
    onBack,
}) => (
    <div className="view">
        <img src={image} alt="" />
        <button onClick={onBack}>go back</button>
    </div>
)

export default ViewPage