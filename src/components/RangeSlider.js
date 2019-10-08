import React from 'react'

const RangeSlider = props => {
  const { name, minComments, sliderChange, maxComments } = props
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='formControlRange'>Current filter: {minComments}</label>
        <input
          type='range'
          className='form-control-range'
          id='formControlRange'
          min={0}
          max={maxComments}
          step={10}
          value={minComments}
          name={name}
          onChange={sliderChange}
        />
      </div>
    </form>
  )
}

export default RangeSlider
