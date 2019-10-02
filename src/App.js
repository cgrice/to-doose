import React, { useState, useRef } from 'react'
import './App.css'
import CheckBox from './CheckBox'
import todoBg from './todopaper.png'

import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { Helmet } from 'react-helmet'

import axios from 'axios'

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
      const image = new Image();
      image.src = reader.result;
      image.onload = function() {
        const w = image.width >= 700 ? 700 : image.width
        const h = (w / image.width) * image.height

        if(w < 300) {
          alert('Please select an image which is at least 300px wide')
        } else {
          setImage(reader.result)
          setImageSize({
            w,
            h
          })
        }
      }
    }

    reader.readAsDataURL(file)
  }

  const toggleComplete = (e) => {
    setComplete(!complete)
  }

  const download = async () => {
    const blob = await domtoimage.toBlob(outputRef.current)
    const formData = new FormData()
    formData.append('image', blob)

    const response = await fetch('/.netlify/functions/upload', {
      method: "POST",
      body: blob,
    })
    const { uploadedFile, filename } = await response.json()
    saveAs(uploadedFile, filename)
  }

  return (
    <div className="App">
      <Helmet>
        <title>to-doose</title>
        <meta name="description" content="It is a lovely day on the internet, and you are a terrible goose." />
      </Helmet> 
      <h1>to-doose</h1>
      <div className="form">
        <div className="row">
          <span className="action">
            <label className="image-select" for="image">Choose an Image</label>
            <input 
              type="file" 
              id="image" 
              name="image" 
              onChange={handleImageChange}
            />
          </span>
        </div>
        {image && (
          <div className="row">
            <span className="action">
              <input 
                type="text" 
                name="text" 
                autoComplete="off"
                placeholder="enter your horrible task" 
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
            <div className="todo">
              <img className="todo-img" src={todoBg} />
              <span className="todo-text"
                style={{
                  textDecoration: complete ? 'line-through' : 'none'
                }}
              >
                {text}
              </span>
            </div>
          </div>
        </div>
        
      )}

      {image && (
        <div>
          <div className="complete">
            <CheckBox onChange={toggleComplete} />
            <p>Is your task complete?</p>
          </div>
          <button onClick={download}>honk</button>
        </div>
      )}

      <footer>
        With ❤️ to <a href="https://househou.se/">House House</a> and
        their <a href="https://goose.game">Untitled Goose Game</a>.
      </footer>
    </div>
  );
}

export default App;
