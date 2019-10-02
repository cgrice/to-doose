import React, { useState } from 'react'
import './css/App.css'

import Helmet from 'react-helmet'

import CreatePage from './components/CreatePage'
import ViewPage from './components/ViewPage'

function App() {
  const [page, setPage] = useState('create')
  const [outputImage, setOutputImage] = useState(null)

  const handleGenerate = (image) => {
    setOutputImage(image)
    setPage('view')
  }

  const handleReset = () => {
    setOutputImage(null)
    setPage('create')
  }

  return (
    <div className="App">
      <Helmet>
        <title>to-doose</title>
        <meta name="description" content="It is a lovely day on the internet, and you are a terrible goose." />
      </Helmet> 

      <h1>to-doose</h1>

      {page === 'create' && (
        <CreatePage onGenerate={handleGenerate} />
      )}
      {page === 'view' && (
        <ViewPage 
          image={outputImage}
          onBack={handleReset} 
        />
      )}

      <footer>
        With ❤️ to <a href="https://househou.se/">House House</a> and
        their <a href="https://goose.game">Untitled Goose Game</a>.
      </footer>
    </div>
  )
}

export default App;
