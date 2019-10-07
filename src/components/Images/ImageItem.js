import React from 'react'
import { API_URL } from '../../api/api'

const ImageItem = props => {
  const { image } = props
  return (
    <div className='col-4'>
      <div className='card' style={{ width: '100%' }}>
        <div className='card-body'>
          <img src={image.data.thumbnail} alt='bear' />
          <h5>{image.data.title}</h5>
          <p>Number of comments: {image.data.num_comments}</p>
          <a href={`${API_URL}${image.data.permalink}`}>Link</a>
        </div>
      </div>
    </div>
  )
}

export default ImageItem
