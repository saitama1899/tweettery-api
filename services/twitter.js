const needle = require('needle')

const BEARER_TOKEN = process.env.BEARER_TOKEN

getUserId = async (username) => {
  try {
    const params = {
      "user.fields": "profile_image_url"
    }
    const endpointURL = `https://api.twitter.com/2/users/by/username/${username}`
    const response = await needle('get', endpointURL, params, {
      headers: {
        "authorization": `Bearer ${BEARER_TOKEN}`
      }
    })
    if (response.body) {
      return response.body
    } else {
      throw new Error('Unsuccessful request')
    }
  } catch (e) { console.error(e) }
}

getTimeline = async (userId) => {
  try {
    const params = {
      "max_results": 25
    }
    const endpointURL = `https://api.twitter.com/2/users/${userId}/tweets`
    const response = await needle('get', endpointURL, params, {
      headers: {
        "authorization": `Bearer ${BEARER_TOKEN}`
      }
    })
    if (response.body) {
      return response.body
    } else {
      throw new Error('Unsuccessful request')
    }
  } catch (e) { console.error(e) }
}

module.exports = {
  getUserId,
  getTimeline
}