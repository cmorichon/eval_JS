// Add class Players
class Players {
  constructor(current, global, turn, name) {
    this.current = current
    this.global = global
    this.turn = turn
    this.name = name
  }

  addCurrent(current) {
    this.current += current
  }

  initializeCurrent() {
    this.current = 0
  }

  addGlobal() {
    this.global += this.current
    this.current = 0
  }
}

// Get value of botton
const newGame = document.querySelector('#newGame')
const rollDice = document.querySelector('#rollDice')
const hold = document.querySelector('#hold')
// Get value of players
const titlePlayer1 = document.querySelector('#player1')
const titlePlayer2 = document.querySelector('#player2')
const sectionPlayer1 = document.querySelector('#sectionPlayer1')
const sectionPlayer2 = document.querySelector('#sectionPlayer2')
// Get value of scores players
const currentScorePlayer1 = document.querySelector('#currentScorePlayer1')
const globalScorePlayer1 = document.querySelector('#globalScorePlayer1')
const currentScorePlayer2 = document.querySelector('#currentScorePlayer2')
const globalScorePlayer2 = document.querySelector('#globalScorePlayer2')

// Get Canvas for dice display
const canvas = document.querySelector('#canvasDice')

//
let currentNumberDice = null

// Initialize players object
let player1 = new Players(0, 0, true)
let player2 = new Players(0, 0, false)
whosTurn()
askPlayerName().then(success, error)

// Fonction for display prompt ask usernames
function namePlayer(player) {
  return prompt(player + ' quel est votre prénom ?')
}
// Declaration of promise to verify the structure of usernames
function askPlayerName() {
  const regex = new RegExp('[a-z]')
  return new Promise((resolve, reject) => {
    const firstPlayer = namePlayer('Joueur 1')
    const secondPlayer = namePlayer('Joueur 2')
    if (firstPlayer.match(regex) && secondPlayer.match(regex)) {
      player1.name = firstPlayer
      player2.name = secondPlayer
      resolve()
    } else {
      reject()
    }
  })
}
function success() {
  titlePlayer1.innerHTML = player1.name
  titlePlayer2.innerHTML = player2.name
}
function error() {
  alert('Merci de saisir des noms de joueurs valides, ne doit pas contenir de chiffres, d\'espaces ou être vide.')
  askPlayerName().then(success, error)
}
// End of Promise

// Function display, allow to refresh the screen
function display() {
  currentScorePlayer1.innerHTML = player1.current.toString()
  globalScorePlayer1.innerHTML = player1.global.toString()
  currentScorePlayer2.innerHTML = player2.current.toString()
  globalScorePlayer2.innerHTML = player2.global.toString()
}
// End of function display

// Function displayDice, display the dice with the figure in canvas
function displayDice() {
  let ctx
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 300, 300)
    ctx.beginPath()
    ctx.strokeRect(50, 50, 200, 200)
    switch (currentNumberDice) {
      case 1:
        ctx = canvas.getContext('2d')
        ctx.arc(150, 150, 20, 0, Math.PI * 2)
        ctx.fill()
        break
      case 2:
        ctx.arc(100, 100, 20, 0, Math.PI * 2)
        ctx.arc(200, 200, 20, 0, Math.PI * 2)
        ctx.fill()
        break
      case 3:
        ctx.arc(100, 100, 20, 0, Math.PI * 2)
        ctx.arc(150, 150, 20, 0, Math.PI * 2)
        ctx.arc(200, 200, 20, 0, Math.PI * 2)
        ctx.fill()
        break
      case 4:
        ctx.arc(100, 100, 20, 0, Math.PI * 2)
        ctx.moveTo(100, 200)
        ctx.arc(100, 200, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 100)
        ctx.arc(200, 100, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 200)
        ctx.arc(200, 200, 20, 0, Math.PI * 2)
        ctx.fill()
        break
      case 5:
        ctx.arc(100, 100, 20, 0, Math.PI * 2)
        ctx.moveTo(100, 200)
        ctx.arc(100, 200, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 100)
        ctx.arc(200, 100, 20, 0, Math.PI * 2)
        ctx.moveTo(150, 150)
        ctx.arc(150, 150, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 200)
        ctx.arc(200, 200, 20, 0, Math.PI * 2)
        ctx.fill()

        break
      case 6:
        ctx.arc(100, 100, 20, 0, Math.PI * 2)
        ctx.moveTo(100, 200)
        ctx.arc(100, 200, 20, 0, Math.PI * 2)
        ctx.moveTo(100, 150)
        ctx.arc(100, 150, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 150)
        ctx.arc(200, 150, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 200)
        ctx.arc(200, 200, 20, 0, Math.PI * 2)
        ctx.moveTo(200, 100)
        ctx.arc(200, 100, 20, 0, Math.PI * 2)
        ctx.fill()
        break
      default:
    }
  } else {
    console.log('Votre navigateur est trop ancien pour afficher le dès')
  }
}
// End of displayDice function

// Function Whos turn, allow to verify who's player is turn
function whosTurn() {
  if (player1.turn !== true) {
    titlePlayer2.classList.add('player-active')
    titlePlayer1.classList.remove('player-active')
    sectionPlayer2.classList.add('bg-violet-200')
    sectionPlayer1.classList.remove('bg-violet-200')
    return player2
  } else {
    titlePlayer1.classList.add('player-active')
    titlePlayer2.classList.remove('player-active')
    sectionPlayer1.classList.add('bg-violet-200')
    sectionPlayer2.classList.remove('bg-violet-200')
    return player1
  }
}
// End of function whos turn

// Function controlGameFinish, allow to verify if a score as higher 100 points
function controlGameFinish(player) {
  if (player1.global >= 100 || player2.global >= 100) {
    alert(`La partie est terminée, le joueur ${player.name} à remporté le jeu avec ${player.global} points`)
  }
}
// End of function controlGameFinish

// Function changeTurnPlayer, allow change the turn for current player
function changeTurnPlayer() {
  player1.turn = !player1.turn
  player2.turn = !player2.turn
}
// End of changeTurnPlayer

// Click event for newGame
newGame.addEventListener('click', e => {
  e.preventDefault()
  player1 = new Players(0, 0, true)
  player2 = new Players(0, 0, false)
  askPlayerName().then(success, error)
  display()
})
// End of click event newGame

// Click event for roll the dice
rollDice.addEventListener('click', e => {
  e.preventDefault()
  let numberDice = Math.floor(Math.random() * 7)
  while (numberDice === 0) {
    numberDice = Math.floor(Math.random() * 7)
  }
  const playerActive = whosTurn()
  if (numberDice !== 1) {
    if (playerActive === player1) {
      player1.addCurrent(numberDice)
    } else {
      player2.addCurrent(numberDice)
    }
  } else {
    changeTurnPlayer()
    player1.initializeCurrent()
    player2.initializeCurrent()
  }
  currentNumberDice = numberDice
  displayDice()
  whosTurn()
  display()
})
// End of click event for roll the dice

// Click event for give the hand at other player
hold.addEventListener('click', e => {
  e.preventDefault()
  const playerActive = whosTurn()
  playerActive.addGlobal()
  display()
  changeTurnPlayer()
  whosTurn()
  controlGameFinish(playerActive)
})
// End of click event
