import React, { memo } from 'react'
import { API_URL } from '../../api/api'

const ImageItem = memo(props => {
  const { image } = props
  console.log(`render`)
  return (
    <div className='col-4'>
      <div className='card' style={{ width: '100%' }}>
        <div className='card-body'>
          <img src={image.thumbnail} alt='' />
          <h5>{image.title}</h5>
          <p>Number of comments: {image.num_comments}</p>
          <a href={`${API_URL}${image.permalink}`}>Link</a>
        </div>
      </div>
    </div>
  )
})

export default ImageItem
