export const API_URL = 'https://www.reddit.com'

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(data => {
        resolve(data)
      })
      .catch(response => {
        response.json().then(error => {
          reject(error)
        })
      })
  })
}
