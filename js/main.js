class Players {
  constructor (current, global, turn, name) {
    this.current = current
    this.global = global
    this.turn = turn
    this.name = name
  }

  addCurrent (current) {
    this.current += current
  }

  initializeCurrent () {
    this.current = 0
  }

  addGlobal () {
    this.global += this.current
    this.current = 0
  }
}

const newGame = document.querySelector('#newGame')
const rollDice = document.querySelector('#rollDice')
const hold = document.querySelector('#hold')

const titlePlayer1 = document.querySelector('#player1')
const titlePlayer2 = document.querySelector('#player2')
const sectionPlayer1 = document.querySelector('#sectionPlayer1')
const sectionPlayer2 = document.querySelector('#sectionPlayer2')
// Get value of scores players
const currentScorePlayer1 = document.querySelector('#currentScorePlayer1')
const globalScorePlayer1 = document.querySelector('#globalScorePlayer1')
const currentScorePlayer2 = document.querySelector('#currentScorePlayer2')
const globalScorePlayer2 = document.querySelector('#globalScorePlayer2')

// Initialize players object
let player1 = new Players(0, 0, true)
let player2 = new Players(0, 0, false)
whosTurn()
namePlayer()

function namePlayer () {
  player1.name = prompt('Joueur 1, quel est votre prénom ?')
  player2.name = prompt('Joueur 2, quel est votre prénom ?')
  titlePlayer1.innerHTML = player1.name
  titlePlayer2.innerHTML = player2.name
}

function display () {
  currentScorePlayer1.innerHTML = player1.current.toString()
  globalScorePlayer1.innerHTML = player1.global.toString()
  currentScorePlayer2.innerHTML = player2.current.toString()
  globalScorePlayer2.innerHTML = player2.global.toString()
}
function whosTurn () {
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

function controlGameFinish (player) {
  if (player1.global >= 100 || player2.global >= 100) {
    alert(`La partie est terminée, le joueur ${player.name} à remporté le jeu avec ${player.global} points`)
  }
}

function changeTurnPlayer () {
  player1.turn = !player1.turn
  player2.turn = !player2.turn
}

newGame.addEventListener('click', e => {
  e.preventDefault()
  player1 = new Players(0, 0, true)
  player2 = new Players(0, 0, false)
  display()
})

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
  whosTurn()
  display()
})

hold.addEventListener('click', e => {
  e.preventDefault()
  const playerActive = whosTurn()
  playerActive.addGlobal()
  display()
  changeTurnPlayer()
  whosTurn()
  controlGameFinish(playerActive)
})
