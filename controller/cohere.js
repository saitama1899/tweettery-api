const cohereRouter = require('express').Router()
const needle = require('needle')
const COHERE_API_KEY = process.env.COHERE_API_KEY
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

const getPrompt = (text) => {
  return `I am going to show you a example text input, with the expected output, and 1 final input that I will need the output of. 
  Each of the input texts belongs to a different author. The expected output contains: a list with the 10 most popular topics, a brief summary of the content. 
  Input 1:
  Oferta de trabajo: FullStack Developer
  Requerimientos:
  - JavaScript, Python, Java
  - AWS, Google Cloud, Azure
  Lo que se pide:
  ¡NO cometas este ERROR al escribir HTML!
  Aprende a diferenciar cuando usar las etiquetas <button> y cuando <a>.
  ¿Por qué es importante saber diferenciarlos y usarlos correctamente?
  1. Accesibilidad y semántica
  2. Facilidad de navegación
  ⚠️ Usar un botón como enlace puede generar frustación en tus usuarios.
  7 libros gratuitos para aprender JavaScript:
  1. JS for Impatient Programmers
  2. Eloquent JavaScript
  ¿Sabías que cuando empecé en programación casi me echan de la universidad?
  Se me daba fatal programar, no lo entendía y estuve apunto de dejarlo.
  Te cuento mi historia.
  ¿Quieres escribir código de JavaScript como un Senior?
  ◆ Consejos para un código sostenible
  ◆ Ejemplos y convenciones a seguir
  ◆ SOLID, testing y mucho más
  Este recurso tiene en ESPAÑOL las mejores prácticas:
  ⌈FRONTEND PRACTICE⌋
Conferencia de Programación con:
✓ Speakers TOP
✓ Premios y sorteos
✓ ¡Muchas sorpresas!
Remoto 100%.
Muy pronto podrás conseguir tu ticket GRATIS en:
Juegos para APRENDER a PROGRAMAR:
JavaScript → warriorjs.com
FILTRA VALORES REPETIDOS
Con Set puedes conseguir los valores únicos de un Array (sean números o strings) muy fácilmente.
¿Te faltan ideas sobre qué puedes programar para practicar?
¡Pues aquí tienes 50 proyectos!
Sí. 50. De lo más básico o lo más avanzado.
MIÉRCOLES 25 vamos a estar en directo programando y explicando una prueba técnica típica de React.
Será a las 18HRs (🇪🇸) y tienes todos los horarios aquí:
También añadiremos tests y hablaremos de las preguntas más típicas que te pueden tocar.
⌈JAVASCRIPT 30⌋
30 días, 30 proyectos y tutoriales para crear con JavaScript.
Desde pequeños juegos 🎮  hasta utilidades con canvas hasta tu propio reproductor de vídeo.
7 libros gratuitos para aprender JavaScript:
1. JS for Impatient Programmers
2. Eloquent JavaScript
3. Learning JavaScript Design Patterns
4. Javascript Info

  Expected Output for Input 1:
  1>> 10 most popular topics: ['FullStack Developer Job Offer', 'HTML Writing Tips', 'JavaScript Books', 'JavaScript Code Writing', 'Web Development Conferences', 'Programming Games', 'Array Values Filtering', 'Programming Project Ideas', 'Live Programming Session']
  2>> Brief summary of the content: The author is sharing information about a FullStack Developer job offer and its requirements, as well as tips and resources for web development and programming, such as books, conferences, games, and project ideas. He also shares his own experiences in programming and mentions a live programming session.  
  --
  Input 2:
  
  ${text}
    
  Expected Output for Input 2:
`
} 

cohereRouter.post("/summary", async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).send({ error: '"text" is required in the request body' });
    }
    const prompt = getPrompt(req.body.text)
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
      max_tokens: 400,
      temperature: 0.7,
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

