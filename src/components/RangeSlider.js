import React from 'react'

const RangeSlider = props => {
  const { name, commentQty, sliderChange } = props
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='formControlRange'>Current filter: {commentQty}</label>
        <input
          type='range'
          className='form-control-range'
          id='formControlRange'
          min='10'
          max='1500'
          step='10'
          value={commentQty}
          name={name}
          onChange={sliderChange}
        />
      </div>
    </form>
  )
}

export default RangeSlider
