class Players {
  constructor (current, global, turn) {
    this.current = current
    this.global = global
    this.turn = turn
  }

  addCurrent (current) {
    this.current += current
  }

  addGlobal (global) {
    this.global += global
  }

  changeTurn (turn) {
    this.turn != turn
  }
}

const newGame = document.querySelector('#newGame')
const rollDice = document.querySelector('#rollDice')
const hold = document.querySelector('#hold')
// Get value of scores players
const currentScorePlayer1 = document.querySelector('#currentScorePlayer1')
const globalScorePlayer1 = document.querySelector('#globalScorePlayer1')
const currentScorePlayer2 = document.querySelector('#currentScorePlayer2')
const globalScorePlayer2 = document.querySelector('#globalScorePlayer2')

// Initialize players object
let player1 = new Players(0, 0, true)
let player2 = new Players(0, 0, false)

function display () {
  currentScorePlayer1.innerHTML = player1.current.toString()
  globalScorePlayer1.innerHTML = player1.global.toString()
  currentScorePlayer2.innerHTML = player2.current.toString()
  globalScorePlayer2.innerHTML = player2.global.toString()
}
function whosTurn () {
  if (player1.turn !== true) {
    return player2
  }
  return player1
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
  console.log(numberDice)
  if (numberDice != 1) {
    if (playerActive === player1) {
      player1.addCurrent(numberDice)
      display()
    } else {
      player2.addCurrent(numberDice)
      display()
    }
  } else {
    changeTurnPlayer()
  }

  display()
})
