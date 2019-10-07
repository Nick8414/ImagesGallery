import React from 'react'
import ImageItem from './ImageItem'

const ImagesList = props => {
  const { images } = props
  return (
    <div className='row mt-4'>
      {images.map(image => {
        return <ImageItem key={image.data.id} image={image} />
      })}
    </div>
  )
}

export default ImagesList
