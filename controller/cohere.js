const cohereRouter = require('express').Router()
const needle = require('needle')
const COHERE_API_KEY = process.env.COHERE_API_KEY
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'
const { getPrompt, joinText } = require ('../utils/prompt')
const { getUserId, getTimeline } = require('../services/twitter')

cohereRouter.post("/summary", async (req, res) => {
  try {
    if (!req?.body?.username) {
      return res.status(400).send({ error: 'username is required in the request body' })
    }
    const user = await getUserId(req.body.username)
    if (!user?.data?.id) {
      return res.status(400).send({ error: 'username id not found' })
    }
    console.log(user.data.id);
    const timeline = await getTimeline(user.data.id)
    if (!timeline?.data) {
      return res.status(400).send({ error: `timeline not found`})
    }

    const text = joinText(timeline.data)
    const prompt = getPrompt(text)
    console.log(text);
    const options = {
      headers: {
        accept: 'application/json',
        'Cohere-Version': '2022-12-06',
        'content-type': 'application/json',
        authorization: `Bearer ${COHERE_API_KEY}`
      }
    }
    
    const params = {
      model: 'command-xlarge-20221108',
      prompt: prompt,
      max_tokens: 450,
      temperature: 0.5,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    }
    
    const response = await needle('post', COHERE_API_GENERATE_URL, params, options, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.body);
      }
    })
    if (response?.body) {
      // console.log(response.body);
      if ((response.body?.message).includes('blocked output:')) {
        return res.status(400).send({ error: "Sorry, this user timeline contains inappropriate content. Try with other user!" })
      }
      return res.json({
        cohere: response.body?.generations?.[0]?.text,
        twitter: user?.data?.profile_image_url
      })
    } else {
      throw new Error('Unsuccessful request')
    }
  } catch (e) { console.error(e) }
})


module.exports = cohereRouter

