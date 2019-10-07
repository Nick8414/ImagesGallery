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
      viewImages: [],
      isLoading: true,
      autoRefreshStatus: false,
      intervalID: '',
      commentQty: 200
    }
  }

  sliderChange = event => {
    const newImagesArray = this.filterImageByCommentsQty(
      this.state.images,
      this.state.commentQty
    )
    this.setState({
      [event.target.name]: event.target.value,
      viewImages: newImagesArray
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
          let intervalId = setInterval(() => {
            this.getImages()
          }, 3000)
          this.setState({ intervalId: intervalId })
        } else {
          clearInterval(this.state.intervalId)
        }
      }
    )
  }

  filterImageByCommentsQty = (images, commentQty) => {
    const newImagesArray = images.filter(image => {
      return image.data.num_comments >= commentQty
    })
    return newImagesArray
  }

  sortImagesByCommentsCount = images => {
    return images.sort((a, b) => {
      if (b.data.num_comments > a.data.num_comments) {
        return 1
      } else if (a.data.num_comments > b.data.num_comments) {
        return -1
      } else {
        return 0
      }
    })
  }

  getImages = async () => {
    const link = API_URL
    const images = await fetchApi(`${link}/r/aww.json`)
    const sortedImages = this.sortImagesByCommentsCount(images.data.children)
    const filteredImages = this.filterImageByCommentsQty(
      sortedImages,
      this.state.commentQty
    )
    this.setState({
      images: sortedImages,
      viewImages: filteredImages,
      isLoading: false
    })
  }

  componentDidMount () {
    this.getImages()
  }

  render () {
    const { viewImages, isLoading, autoRefreshStatus, commentQty } = this.state
    return (
      <React.Fragment>
        <div className='container'>
          {isLoading && <Spinner />}
          <h1>Top commented</h1>
          <button
            type='button'
            className='btn btn-secondary btn-sm'
            onClick={this.autoRefresh}
          >
            {!autoRefreshStatus ? 'Start auto-refresh' : 'Stop auto-refresh'}
          </button>
          <RangeSlider
            name='commentQty'
            commentQty={commentQty}
            sliderChange={this.sliderChange}
          />

          <ImagesList images={viewImages} />
        </div>
      </React.Fragment>
    )
  }
}
