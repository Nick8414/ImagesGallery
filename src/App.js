import React from 'react'
import './App.css'
import Spinner from './components/Spinner'
import RangeSlider from './components/RangeSlider'
import ImagesList from './components/Images/ImagesList'
import { API_URL, fetchApi } from '../src/api/api'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = {
      images: [],
      isLoading: true,
      autoRefreshStatus: false,
      intervalID: '',
      minComments: 0,
      maxComments: 0
    }
  }

  sliderChange = event => {
    this.setState({
      minComments: Number(event.target.value)
    })
  }

  autoRefresh = () => {
    this.setState(
      state => {
        return {
          autoRefreshStatus: !state.autoRefreshStatus
        }
      },
      () => {
        if (this.state.autoRefreshStatus) {
          this.intervalId = setInterval(this.getImages, 3000)
        } else {
          clearInterval(this.intervalId)
        }
      }
    )
  }

  getImages = async () => {
    const link = API_URL

    try {
      this.setState({ isLoading: true })
      const images = await fetchApi(`${link}/r/aww.json`)
      const imagesArr = images.data.children
      let newMaxComments = Math.max.apply(
        Math,
        imagesArr.map(function (el) {
          return el.data.num_comments
        })
      )

      this.setState({
        images: imagesArr,
        maxComments: newMaxComments,
        isLoading: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount () {
    this.getImages()
  }

  getImagesByComments = (images, minComments) =>
    images
      .filter(el => el.data.num_comments >= minComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments)

  render () {
    const {
      images,
      isLoading,
      autoRefreshStatus,
      minComments,
      maxComments
    } = this.state
    const imagesSortByComments = this.getImagesByComments(images, minComments)

    return (
      <div className='container'>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <h1>Top commented</h1>
            <button
              type='button'
              className='btn btn-secondary btn-sm'
              onClick={this.autoRefresh}
            >
              {!autoRefreshStatus ? 'Start auto-refresh' : 'Stop auto-refresh'}
            </button>
            <RangeSlider
              name='minComments'
              minComments={minComments}
              maxComments={maxComments}
              sliderChange={this.sliderChange}
            />
            {imagesSortByComments.length > 0 ? (
              <ImagesList images={imagesSortByComments} />
            ) : (
              <p>No results found matching your criteria</p>
            )}
          </div>
        )}
      </div>
    )
  }
}
