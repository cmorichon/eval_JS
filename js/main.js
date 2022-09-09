class Player {
  constructor (current, global) {
    this.current = current
    this.global = global
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
let player1 = new Player(0, 0)
let player2 = new Player(0, 0)

function display () {
  currentScorePlayer1.innerHTML = player1.current.toString()
  globalScorePlayer1.innerHTML = player1.global.toString()
  currentScorePlayer2.innerHTML = player2.current.toString()
  globalScorePlayer2.innerHTML = player2.global.toString()
}

newGame.addEventListener('click', e => {
  e.preventDefault()
  player1 = new Player(0, 0)
  player2 = new Player(0, 0)
  display()
})

rollDice.addEventListener('click', e => {
  e.preventDefault()
  let numberDice = Math.floor(Math.random() * 7)
  while (numberDice === 0) {
    numberDice = Math.floor(Math.random() * 7)
  }
  console.log(numberDice)
  player1.current += numberDice
  display()
})
