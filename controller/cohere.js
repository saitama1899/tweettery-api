const cohereRouter = require('express').Router()
const needle = require('needle')
const COHERE_API_KEY = process.env.COHERE_API_KEY
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

const data = {
  model: 'xlarge',
  prompt: `Summarize this twitter account and show me a list of the 5 most popular topics inside it:
  Tweet 1:
  Oferta de trabajo: FullStack Developer
  
  Requerimientos:
  - JavaScript, Python, Java
  - AWS, Google Cloud, Azure
  - Swift, Kotlin, React Native
  - PostgreSQL, MongoDB, Redis
  - Experiencia en ChatGPT
  - Interés en UX/UI, Agile, Product Owner
  
  Salario: 19.000€ al año.
  
  Lo que se pide:
  Tweet 2:
  ¡NO cometas este ERROR al escribir HTML!
  
  Aprende a diferenciar cuando usar las etiquetas <button> y cuando <a>.
  
  ¡Te explico las diferencias! ⇩
  Tweet 3:
  ¿Por qué es importante saber diferenciarlos y usarlos correctamente?
  
  1. Accesibilidad y semántica
  2. Facilidad de navegación
  3. Mejor rastreo por parte de crawler
  4. Experiencia del usuario
  
  ⚠️ Usar un botón como enlace puede generar frustación en tus usuarios.
  
  TLDR: ['javascript', 'html', 'accesibilidad', 'developer', 'navegacion']
    --
  Summarize this twitter account and show me a list of the 5 most popular topics inside it:
  Tweet 1:
  7 libros gratuitos para aprender JavaScript:
  
  1. JS for Impatient Programmers
  2. Eloquent JavaScript
  3. Learning JavaScript Design Patterns
  4. Javascript Info
  5. You Don't Know JS
  6. Human JavaScript
  7. JavaScript, ¡Inspírate!
  
  Tweet 2:
  ¿Sabías que cuando empecé en programación casi me echan de la universidad?
  
  Se me daba fatal programar, no lo entendía y estuve apunto de dejarlo.
  
  Te cuento mi historia.
  
  Tweet 3:
  ¿Quieres escribir código de JavaScript como un Senior?
  
  ◆ Consejos para un código sostenible
  ◆ Ejemplos y convenciones a seguir
  ◆ SOLID, testing y mucho más
  
  Este recurso tiene en ESPAÑOL las mejores prácticas:
  
    TLDR: ['programar', 'libros', 'javascript', 'popular', 'design']
  --
  Tweet 1:
  Jhay Cortez: Hace playback
  
  La cuenta de Grefg: -10.000€
  
  Lola índigo y Karchez en el baño:
  
  Tweet 2:
  Ayer se entregaron los premios #Esland y Lola Índigo se llevó el show con su actuación. Lola perreó con  Ibai, Karchez, Carola y Masi. La pareja de Karchez, Abby, compartió algunos tuits sobre el momento, y Lola respondió con humor. ¡Las risas estuvieron aseguradas! #LolaEsland"
  
  Tweet 3:
  spreen en twitter: jajas coger, te regalaste, chupala 
  
  spreen cuando bajó lola indigo a perrearle a todos:
  
  TLDR:`,
  max_tokens: 40,
  temperature: 0.3,
  k: 0,
  p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop_sequences: ['--'],
  return_likelihoods: 'NONE'
}

// cohereRouter.post("/summary", async (req, res) => {
//   try {
//     const headers = {
//       accept: 'application/json',
//       'Cohere-Version': '2022-12-06',
//       'content-type': 'application/json',
//       authorization: 'Bearer JNJcd23kmwiFLFxk0vRAn4JMjbRaeOb149rgdt8R'
//     }
//     const data = {
//       model: 'command-xlarge-20221108',
//       prompt: 'Summarize this twitter account and show me a list of the 5 most popular topics inside it:\nTweet 1:\nOferta de trabajo: FullStack Developer\n\nRequerimientos:\n- JavaScript, Python, Java\n- AWS, Google Cloud, Azure\n- Swift, Kotlin, React Native\n- PostgreSQL, MongoDB, Redis\n- Experiencia en ChatGPT\n- Interés en UX/UI, Agile, Product Owner\n\nSalario: 19.000€ al año.\n\nLo que se pide:\nTweet 2:\n¡NO cometas este ERROR al escribir HTML!\n\nAprende a diferenciar cuando usar las etiquetas <button> y cuando <a>.\n\n¡Te explico las diferencias! ⇩\nTweet 3:\n¿Por qué es importante saber diferenciarlos y usarlos correctamente?\n\n1. Accesibilidad y semántica\n2. Facilidad de navegación\n3. Mejor rastreo por parte de crawler\n4. Experiencia del usuario\n\n⚠️ Usar un botón como enlace puede generar frustación en tus usuarios.\n\nTLDR: [\'javascript\', \'html\', \'accesibilidad\', \'developer\', \'navegacion\']\n  --\nSummarize this twitter account and show me a list of the 5 most popular topics inside it:\nTweet 1:\n7 libros gratuitos para aprender JavaScript:\n\n1. JS for Impatient Programmers\n2. Eloquent JavaScript\n3. Learning JavaScript Design Patterns\n4. Javascript Info\n5. You Don\'t Know JS\n6. Human JavaScript\n7. JavaScript, ¡Inspírate!\n\nTweet 2:\n¿Sabías que cuando empecé en programación casi me echan de la universidad?\n\nSe me daba fatal programar, no lo entendía y estuve apunto de dejarlo.\n\nTe cuento mi historia.\n\nTweet 3:\n¿Quieres escribir código de JavaScript como un Senior?\n\n◆ Consejos para un código sostenible\n◆ Ejemplos y convenciones a seguir\n◆ SOLID, testing y mucho más\n\nEste recurso tiene en ESPAÑOL las mejores prácticas:\n\n  TLDR: [\'programar\', \'libros\', \'javascript\', \'popular\', \'design\']\n--\nTweet 1:\nJhay Cortez: Hace playback\n\nLa cuenta de Grefg: -10.000€\n\nLola índigo y Karchez en el baño:\n\nTweet 2:\nAyer se entregaron los premios #Esland y Lola Índigo se llevó el show con su actuación. Lola perreó con  Ibai, Karchez, Carola y Masi. La pareja de Karchez, Abby, compartió algunos tuits sobre el momento, y Lola respondió con humor. ¡Las risas estuvieron aseguradas! #LolaEsland\"\n\nTweet 3:\nspreen en twitter: jajas coger, te regalaste, chupala \n\nspreen cuando bajó lola indigo a perrearle a todos:\n\nTLDR:\n',
//       max_tokens: 300,
//       temperature: 0.9,
//       k: 0,
//       p: 0.75,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stop_sequences: [],
//       return_likelihoods: 'NONE'
//     }
//     const response = await fetch(COHERE_API_GENERATE_URL, {
//       method: 'POST',
//       headers: headers,
//       body: data
//     }).then(res => res.json())

//     if (response) {
//       return res.json(response)
//     } else {
//       throw new Error('Unsuccessful request')
//     }
//   } catch (e) { console.error(e) }
// })



// cohereRouter.post("/summary", async (req, res) => {
//   try {
//     const headers = {
//       accept: 'application/json',
//       'Cohere-Version': '2022-12-06',
//       'content-type': 'application/json',
//       authorization: 'Bearer JNJcd23kmwiFLFxk0vRAn4JMjbRaeOb149rgdt8R'
//     }
//     const data = {
//       model: 'command-xlarge-20221108',
//       prompt: 'Summarize this twitter account and show me a list of the 5 most popular topics inside it:\nTweet 1:\nOferta de trabajo: FullStack Developer\n\nRequerimientos:\n- JavaScript, Python, Java\n- AWS, Google Cloud, Azure\n- Swift, Kotlin, React Native\n- PostgreSQL, MongoDB, Redis\n- Experiencia en ChatGPT\n- Interés en UX/UI, Agile, Product Owner\n\nSalario: 19.000€ al año.\n\nLo que se pide:\nTweet 2:\n¡NO cometas este ERROR al escribir HTML!\n\nAprende a diferenciar cuando usar las etiquetas <button> y cuando <a>.\n\n¡Te explico las diferencias! ⇩\nTweet 3:\n¿Por qué es importante saber diferenciarlos y usarlos correctamente?\n\n1. Accesibilidad y semántica\n2. Facilidad de navegación\n3. Mejor rastreo por parte de crawler\n4. Experiencia del usuario\n\n⚠️ Usar un botón como enlace puede generar frustación en tus usuarios.\n\nTLDR: [\'javascript\', \'html\', \'accesibilidad\', \'developer\', \'navegacion\']\n  --\nSummarize this twitter account and show me a list of the 5 most popular topics inside it:\nTweet 1:\n7 libros gratuitos para aprender JavaScript:\n\n1. JS for Impatient Programmers\n2. Eloquent JavaScript\n3. Learning JavaScript Design Patterns\n4. Javascript Info\n5. You Don\'t Know JS\n6. Human JavaScript\n7. JavaScript, ¡Inspírate!\n\nTweet 2:\n¿Sabías que cuando empecé en programación casi me echan de la universidad?\n\nSe me daba fatal programar, no lo entendía y estuve apunto de dejarlo.\n\nTe cuento mi historia.\n\nTweet 3:\n¿Quieres escribir código de JavaScript como un Senior?\n\n◆ Consejos para un código sostenible\n◆ Ejemplos y convenciones a seguir\n◆ SOLID, testing y mucho más\n\nEste recurso tiene en ESPAÑOL las mejores prácticas:\n\n  TLDR: [\'programar\', \'libros\', \'javascript\', \'popular\', \'design\']\n--\nTweet 1:\nJhay Cortez: Hace playback\n\nLa cuenta de Grefg: -10.000€\n\nLola índigo y Karchez en el baño:\n\nTweet 2:\nAyer se entregaron los premios #Esland y Lola Índigo se llevó el show con su actuación. Lola perreó con  Ibai, Karchez, Carola y Masi. La pareja de Karchez, Abby, compartió algunos tuits sobre el momento, y Lola respondió con humor. ¡Las risas estuvieron aseguradas! #LolaEsland\"\n\nTweet 3:\nspreen en twitter: jajas coger, te regalaste, chupala \n\nspreen cuando bajó lola indigo a perrearle a todos:\n\nTLDR:\n',
//       max_tokens: 300,
//       temperature: 0.9,
//       k: 0,
//       p: 0.75,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stop_sequences: [],
//       return_likelihoods: 'NONE'
//     }
//     const response = await needle('post', COHERE_API_GENERATE_URL, data, headers)
//     if (response.body) {
//       return res.json(response.body)
//     } else {
//       throw new Error('Unsuccessful request')
//     }
//   } catch (e) { console.error(e) }
// })

cohereRouter.post("/summary", async (req, res) => {
  try {
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
      prompt: 'Summarize this twitter account and show me a list of the 5 most popular topics inside it:\nTweet 1:\nOferta de trabajo: FullStack Developer\n\nRequerimientos:\n- JavaScript, Python, Java\n- AWS, Google Cloud, Azure\n- Swift, Kotlin, React Native\n- PostgreSQL, MongoDB, Redis\n- Experiencia en ChatGPT\n- Interés en UX/UI, Agile, Product Owner\n\nSalario: 19.000€ al año.\n\nLo que se pide:\nTweet 2:\n¡NO cometas este ERROR al escribir HTML!\n\nAprende a diferenciar cuando usar las etiquetas <button> y cuando <a>.\n\n¡Te explico las diferencias! ⇩\nTweet 3:\n¿Por qué es importante saber diferenciarlos y usarlos correctamente?\n\n1. Accesibilidad y semántica\n2. Facilidad de navegación\n3. Mejor rastreo por parte de crawler\n4. Experiencia del usuario\n\n⚠️ Usar un botón como enlace puede generar frustación en tus usuarios.\n\nTLDR: [\'javascript\', \'html\', \'accesibilidad\', \'developer\', \'navegacion\']\n  --\nSummarize this twitter account and show me a list of the 5 most popular topics inside it:\nTweet 1:\n7 libros gratuitos para aprender JavaScript:\n\n1. JS for Impatient Programmers\n2. Eloquent JavaScript\n3. Learning JavaScript Design Patterns\n4. Javascript Info\n5. You Don\'t Know JS\n6. Human JavaScript\n7. JavaScript, ¡Inspírate!\n\nTweet 2:\n¿Sabías que cuando empecé en programación casi me echan de la universidad?\n\nSe me daba fatal programar, no lo entendía y estuve apunto de dejarlo.\n\nTe cuento mi historia.\n\nTweet 3:\n¿Quieres escribir código de JavaScript como un Senior?\n\n◆ Consejos para un código sostenible\n◆ Ejemplos y convenciones a seguir\n◆ SOLID, testing y mucho más\n\nEste recurso tiene en ESPAÑOL las mejores prácticas:\n\n  TLDR: [\'programar\', \'libros\', \'javascript\', \'popular\', \'design\']\n--\nTweet 1:\nJhay Cortez: Hace playback\n\nLa cuenta de Grefg: -10.000€\n\nLola índigo y Karchez en el baño:\n\nTweet 2:\nAyer se entregaron los premios #Esland y Lola Índigo se llevó el show con su actuación. Lola perreó con  Ibai, Karchez, Carola y Masi. La pareja de Karchez, Abby, compartió algunos tuits sobre el momento, y Lola respondió con humor. ¡Las risas estuvieron aseguradas! #LolaEsland\"\n\nTweet 3:\nspreen en twitter: jajas coger, te regalaste, chupala \n\nspreen cuando bajó lola indigo a perrearle a todos:\n\nTLDR:\n',
      max_tokens: 300,
      temperature: 0.9,
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
    if (response.body) {
      return res.json(response.body)
    } else {
      throw new Error('Unsuccessful request')
    }
  } catch (e) { console.error(e) }
})


module.exports = cohereRouter

