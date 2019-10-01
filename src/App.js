import React, { useState, useRef } from 'react'
import './App.css'
import CheckBox from './CheckBox'
import todoBg from './todopaper.png'

import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'


function App() {
  const [text, setText] = useState('')
  const [complete, setComplete] = useState(false)
  const [image, setImage] = useState(false)
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 })
  const outputRef = useRef()

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      setImage(reader.result)
      const image = new Image();
      image.src = reader.result;
      image.onload = function() {
        const w = image.width >= 700 ? 700 : image.width
        const h = (w / image.width) * image.height

        console.log(image.width, image.height)
        console.log(w, h)
        setImageSize({
          w,
          h
        })
      }
    }

    reader.readAsDataURL(file)
  }

  const toggleComplete = (e) => {
    setComplete(!complete)
  }

  const download = async () => {
    const blob = await domtoimage.toBlob(outputRef.current)
    saveAs(blob, 'to-doose-output.png')
  }

  return (
    <div className="App">
      <h1>to-doose</h1>
      <div className="form">
        <div className="row">
          <span className="action">1. Choose an image</span>
          <span className="action">
            <input type="file" name="image" onChange={handleImageChange} />
          </span>
        </div>
        {image && (
          <div className="row">
            <span className="action">2. Set a horrible task</span>
            <span className="action">
              <CheckBox onChange={toggleComplete} />
              <input 
                type="text" 
                name="text" 
                placeholder="a horrible no good task" 
                onChange={handleChange} 
              />
            </span>
          </div>
        )}
      </div>
      
      {image && (
        <div className="imageWrap">
          <div className="image" ref={outputRef} style={{
            width: imageSize.w,
            height: imageSize.h,
          }}>
            <img className="bg" src={image} alt="todo" />
            <img className="todo" src={todoBg} />
            <span className="todo-text"
              style={{
                textDecoration: complete ? 'line-through' : 'none'
              }}
            >
              {text}
            </span>
          </div>
        </div>
        
      )}

      {image && (
        <button onClick={download}>Download</button>
      )}
      
    </div>
  );
}

export default App;
