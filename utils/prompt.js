const getPrompt = (text) => {
  return `I am going to show you 2 examples of text input, with the expected output, and 1 final input that I will need the output of. \n
  Each of the input texts belongs to a different author. The expected output contains 2 parts: \n
  1>> The 10 most popular topics. The popular topics, must not be longer than 3 words each \n
  2>> Brief summary of the content \n
  Text input 1: Do you want to learn programming? Web Development, JavaScript and CSS React and Next.js? Follow me! Good practices, tricks and tips, free programming courses and tutorials. FREE guide of +50 best testing practices in JavaScript! Take your skills to the next level with these web programming books. DEVELOPER RESOURCES Deploy applications and databases for FREE → dev.new. Here you have hundreds of APIs for your next project. DEVELOPER RESOURCES Deploy applications and databases for FREE. Solve all your doubts with GIT → firstaidgit.io Improve your programming logic → exercism.org. It has almost complete support... only on mobile! In desktop browsers it will open the classic file selection. Try the demo from your mobile: At what age did you find out that you can use HTML to open the mobile camera? With the "capture" attribute you indicate the camera: - user: front camera - environment: back camera Also, you can capture photos and videos, according to the "accept" attribute.\n
  Output for text input 1: \n
  1>> The 10 most popular topics: ['FullStack Developer Job Offer', 'HTML Writing Tips', 'JavaScript Books', 'JavaScript Code Writing', 'Web Development Conferences', 'Programming Games', 'Best practices', 'Programming Project Ideas', 'Live Programming Session'] \n
  2>> Brief summary of the content: The author is sharing information about a FullStack Developer job offer and its requirements, as well as tips and resources for web development and programming, such as books, conferences, games, and project ideas. He also shares his own experiences in programming and mentions a live programming session. \n
  Text input 2: \n
  I'm laughing. uwu Hey guys, how are you? Let's go UP, come on. Hi friend, here I have it. Thank you for the gift, it's amazing haha it made me very happy. What was this live stream about? We're going back home. Thanks Mexico for the affection and reception, I won't forget this trip in my life. I felt extremely loved. Thanks. KOI vs SK WEEK 6 WE HAVE A LOT RIDING ON THIS, LET'S TALK ABOUT ESLAND AT 20:00 KOI vs SK. I just saw this loser thing and got like this, I think the doctor slim they threw was for you and not for me papu now I give it to you, thank you for the support kuni I love you. I perfectly understand that some of you would have preferred Auron, Juanito or Mariana. Whichever won, for me it was fine. But don't get angry. If I just do my moves and people vote for me, I can't do anything. Next year I won't run jajaja. Streamer of the year. Best event of the year. Thank you all for the support. Thank you all for following all my adventures for so many years. Thank you Mexico for being an absolutely amazing country. Long live the nights of beautiful Mexico.\n
  Output for text input 2: \n
  1>> The 10 most popular topics: ['Streamer of the Year', 'ESLand', 'Gracias', 'KOI', 'SK', 'Events', 'México', 'Heppy', 'Streamer'] \n
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