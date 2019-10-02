import React, { useState } from 'react'

import { getImage, isFacebookApp } from '../util'
import UploadButton from './UploadButton'
import TodoImage from './TodoImage'

const CreatePage = ({
    onGenerate,
}) => {
    const [text, setText] = useState('')
    const [image, setImage] = useState(false)
    const [imageSize, setImageSize] = useState({ w: 0, h: 0 })

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleImageChange = async (e) => {
        e.preventDefault();
        const imageFile = await getImage(e.target.files[0])

        if(imageFile.width < 300) {
            alert('Please select an image which is at least 300px wide')
        } else {
            setImage(imageFile.data)
            setImageSize({
                w: imageFile.width,
                h: imageFile.height
            })
        }
    }

  return (
    <div>
      <div className="form">
        {isFacebookApp() && (
          <p>Hi! You're using the Facebook in-app browser, which doesn't work very well with this website.
            You might have a better time opening it in Chrome or Firefox.
          </p>
        )}

        <div className="row">
          <span className="action">
            <UploadButton name="source" onSelectFile={handleImageChange} />
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
        <TodoImage
            onGenerate={onGenerate}
            image={image}
            text={text}
            width={imageSize.w}
            heigh={imageSize.h}
        />
      )}
    </div>
  )
}

export default CreatePage;
