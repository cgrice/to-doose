import React, { useState, useRef } from 'react'
import domtoimage from 'dom-to-image'

import CheckBox from './CheckBox'

import todoBg from './todopaper.png'

const TodoImage = ({
    image,
    text,
    width,
    height,
    onGenerate,
}) => {
    const [complete, setComplete] = useState(false)
    const [generating, setGenerating] = useState(false)
    const outputRef = useRef()

    const toggleComplete = (e) => {
        setComplete(!complete)
    }

    const render = async () => {
        setGenerating(true)
        const blob = await domtoimage.toBlob(outputRef.current)
        setGenerating(false)
        onGenerate(URL.createObjectURL(blob))
    }

    return (
        <div>
            <div className="imageWrap">
                <div 
                    className="image" 
                    ref={outputRef} 
                    style={{
                        width,
                        height,
                    }}
                >
                    <img className="bg" src={image} alt="todo" />

                    <div className="todo">
                        <img className="todo-img" src={todoBg} alt="" />
                        <span 
                            className="todo-text"
                            style={{
                                textDecoration: complete ? 'line-through' : 'none'
                            }}
                        >
                            {text}
                        </span>
                    </div>
                </div>
            </div>
            <div className="complete">
                <CheckBox onChange={toggleComplete} />
                <p>Is your task complete?</p>
            </div>
            <button 
                className="btn-primary"
                disabled={generating} 
                onClick={render}
            >
                {generating ? 'honking' : 'generate'}
            </button>
        </div>
    )
}

export default TodoImage