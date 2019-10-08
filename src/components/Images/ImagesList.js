import React from 'react'
import ImageItem from './ImageItem'

const ImagesList = props => {
  const { images } = props
  return (
    <div className='row mt-4'>
      {images.map(image => {
        return <ImageItem key={image.data.id} image={image.data} />
      })}
    </div>
  )
}

export default ImagesList
