const getPrompt = (text) => {
  return `I am going to show you 2 examples of text input, with the expected output, and 1 final input that I will need the output of. \n
  Each of the input texts belongs to a different author. The expected output contains 2 parts: \n
  1>> The 10 most popular topics. The popular topics, must not be longer than 3 words each \n
  2>> Brief summary of the content \n
  Text input 1: ¿Quieres aprender programación? Desarrollo Web, JavaScript y CSS React y Next.js Buenas prácticas, trucos y consejos Cursos y tutoriales de programación gratis  ¡Dime ho la ⇩!RT:¡Guía GRATIS de +50 mejores prácticas de testing en JavaScript!  Lleva tus habilidades al siguiente nivel: Reglas de oro…RT : RECURSOS para desarrolladores Desp liegue de aplicaciones y bases de datos GRATIS → dev.new  Cientos de APIs para tu próxi… A mover las manitas. Hola! Como veo que has puesto una foto mía y me has llamado subno rmal y egoísta, te explico.  Primero, Twitch me escribió para poner la etiqueta para apoyar la iniciativa en programación.  Dos, en el blog lo explican perfectamente:  RECURSOS para desarrolladores Despliegue de aplicaciones y bases de datos GRATIS → dev.new  � Cientos de APIs para tu próximo proyecto → rapidapi.com Resuelve todas tus dudas con GIT → firstaidgit.io Mejora tu lógica de programación → exercism.orgTiene un soporte casi total... ¡sólo en móvil! En navegadores de escritorio te abrirá la selección clásica de fiche ros. Prueba la demo desde tu móvil:  ¿A qué edad te enteraste que puedes usar HTML para abrir la cámara del móvil?  Con el atributo "capture" indicas la cámara: - user: cámara delantera - environment: cámara trasera  Además, puedes captar fotos y vídeos, según el atributo "accept".  Muchas gracias, Gero! :) Justamente esa era la idea de  Fácil de usar, familiar y super rápido! Me alegro mucho que te guste.comm \n
  Output for text input 1: \n
  1>> The 10 most popular topics: ['FullStack Developer Job Offer', 'HTML Writing Tips', 'JavaScript Books', 'JavaScript Code Writing', 'Web Development Conferences', 'Programming Games', 'Array Values Filtering', 'Programming Project Ideas', 'Live Programming Session'] \n
  2>> Brief summary of the content: The author is sharing information about a FullStack Developer job offer and its requirements, as well as tips and resources for web development and programming, such as books, conferences, games, and project ideas. He also shares his own experiences in programming and mentions a live programming session. \n
  Text input 2: \n
  Me descojono  uwu Buenas gente como andan ? VAMOSSSSSSSSSSSSSSSSS COÑO VAMOS PA ARRIBA vamosssssssss Hola amiga, aquí lo tengo. Gracias por el regalo, es increíble jajaja me ha hecho mucha ilusión Lo de este directo qué ha sido. Nos volvemos a casa. Gracias México por el cariño y el recibimiento, No voy a olvidar este viaje en mi vida. Me he sentido extremadamente querido. Gracias. KOI vs SK JORNADA 6 NOS JUGAMOS MUCHO HABLEMOS DE LOS ESLAND A LAS 20:00 KOI vs SK. VEEEEENTEEEE acabo de ver esto culero chingon me he puesto así creo que el doctor slim que tiraron era para ti y no para mí papu ah  ora te lo doy gracias por el apoyo kuni te amo Entiendo perfectamente que algunos hubierais preferido a Auron, Juanito o Mariana. Ganase quien ganase para mi estaba bien. Pero no os enfadéis. Si yo solo hago mis movidas y la gente me vota, no puedo hacer nada. El año que viene no me presento jajaja Streamer del año.  Mejor evento del año.  Gracias a todos por el apoyo. Gracias a todos por seguir todas mis aventuras desde hace tantos años.   Gracias México por ser un país absolutamente increíble. Vivan las noches de México lindo.  ¿esto es real? ESTOY EN LA FINAL REPRESENTANDO AL PUEBLOKOI vs HERETICS. DÍA HISTÓRICO. RT O ME VOY. PRIMER DIRECTO DESDE MÉXICO  \n
  Output for text input 2: \n
  1>> The 10 most popular topics: ['Streamer of the Year', 'ESLand', 'Gracias', 'KOI', 'SK', 'Events', 'México', 'Premios', 'Streamer'] \n
  2>> Brief summary of the content: The author is sharing information about the Streamer of the Year award and their nomination for it. They also talk about their experience at ESLand and the Koi vs SK match. They express their gratitude to Mexico and its people for being a wonderful country. \n
  Text input 3: \n
  ${text} \n
  Output for text input 3: \n
`
} 

const joinText = (textData) => {
  let text = ''
  const MAX_LENGTH = 1000
  const mentionsRegex = /@\w+/g

  textData.forEach(({text: t}) => {
    t = t.replace(/\r?\n|\r/g, ' ')
    t = t.replace(mentionsRegex, '')
    t = t.replace(/(https?:\/\/[^\s]+)/g, '')
    t = t.replace(/<img[^>]+>/g, '')
    t = t.replace(/[^\x00-\x7F]/g, '')

    text += t + ' '
  })
  text = text.trim()
  text = text.substring(0, MAX_LENGTH)
  return text
}

module.exports = {
  getPrompt,
  joinText
}