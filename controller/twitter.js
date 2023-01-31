const twitterRouter = require('express').Router()
const needle = require('needle')
const BEARER_TOKEN = process.env.BEARER_TOKEN

twitterRouter.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params
    const params = {
      "user.fields": "profile_image_url"
    }
    const endpointURL = `https://api.twitter.com/2/users/by/username/${username}`
    const response = await needle('get', endpointURL, params, {
      headers: {
        "User-Agent": "v2UserLookupJS",
        "authorization": `Bearer ${BEARER_TOKEN}`
      }
    })
    if (response.body) {
      return res.json(response.body)
    } else {
      throw new Error('Unsuccessful request')
    }
  } catch (e) { console.error(e) }
})

twitterRouter.get("/timeline/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const params = {
      "max_results": 100
    }
    const endpointURL = `https://api.twitter.com/2/users/${userId}/tweets`
    const response = await needle('get', endpointURL, params, {
      headers: {
        "User-Agent": "v2UserLookupJS",
        "authorization": `Bearer ${BEARER_TOKEN}`
      }
    })
    if (response.body) {
      return res.json(response.body)
    } else {
      throw new Error('Unsuccessful request')
    }
  } catch (e) { console.error(e) }
})

module.exports = twitterRouter

