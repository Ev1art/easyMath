const firstSlide = document.getElementById('firstSlide'),
    secondSlide = document.getElementById('secondSlide'),
    startBtn = document.getElementById('start-btn'),
    enterAnswerBtn = document.getElementById('enter-answer-btn'),
    showAnswerBtn = document.getElementById('show-answer-btn'),
    firstNum = document.getElementById('firstNum'),
    secondNum = document.getElementById('secondNum'),
    symbolText = document.getElementById('symbol'),
    answer = document.getElementById('answer'),
    timer = document.getElementById('timer'),
    correctAnswers = document.getElementById('answers'),
    minutes = document.getElementById('minutes'),
    seconds = document.getElementById('seconds'),
    timerBtn = document.getElementById('timerBtn')
let correctAnswersCount = 0
let minutesCount = 0
let secondsCount = 0
let interval
let minValue
let maxValue
// 0 = -, 1 = +
let symbol
// включаем / выключаем таймер
timerBtn.addEventListener('click', () => {
    timerBtn.classList.toggle('timerBtn--active')
    timer.classList.toggle('noTimer')
})
// начинаем игру
startBtn.addEventListener('click', () => {
    // листаем страницу вниз
    firstSlide.style.top = '-100vh'
    secondSlide.style.top = '0vh'
    // указываем мин и макс число 
    minValue = document.getElementById('minValue').value
    maxValue = document.getElementById('maxValue').value

    startGame()

    // начинаем таймер
    interval = setInterval(changeTimer, 1000)
})
// отправляем ответ на кнопку
enterAnswerBtn.addEventListener('click', () => {
    enterAnswer() 
})
// отрпавка ответа на нажатие Enter
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        enterAnswer()
    }
})

// functions -----------------------------------------------------------------------------
const changeTimer = () => {
    secondsCount++
    if (secondsCount > 59) {
        secondsCount = 0
        seconds.innerHTML = '00'
        minutesCount++
        if(minutesCount > 9) {
            minutes.innerHTML = minutesCount
        } else {
            minutes.innerHTML = `0${minutesCount}`
        }
    }
    else if(secondsCount > 9) {
        seconds.innerHTML = secondsCount
    } else {
        seconds.innerHTML = `0${secondsCount}`
    }
   
}
const enterAnswer = () => {
    let firstNumber = Number(firstNum.innerHTML)
    let secondNumber = Number(secondNum.innerHTML)
    let answerNumber = Number(answer.value)
    if (symbol === 0 && firstNumber - secondNumber === answerNumber) {
        startGame()
        correctAnswer()
    }
    else if(firstNumber + secondNumber === answerNumber) {
        startGame()
        correctAnswer()
    } else {
        uncorrectAnswer()
    }
}
const startGame = () => {
    firstNum.innerHTML = getRandomNumber(minValue, maxValue)
    secondNum.innerHTML = getRandomNumber(minValue, maxValue)
    //указываем символ примера
    symbol = getRandomNumber(0, 2)
    if(symbol === 0) {
        symbolText.innerHTML = '-'
    } else {
        symbolText.innerHTML = '+'
    }
}
const correctAnswer = () => {
    //чистим поле для ответа
    answer.value = ''

    // работаем со счетчиком
    correctAnswersCount++
    correctAnswers.innerHTML = `${correctAnswersCount}`
    // подсвечивем зеленым если правильно
    setTimeout(() => {correctAnswers.style.color = 'green'}, 1)
    setTimeout(() => {correctAnswers.style.color = '#fff'}, 500)
}
const uncorrectAnswer = () => {
    // красным если нет
    setTimeout(() => {answer.style.color = 'red'}, 1)
    setTimeout(() => {answer.style.color = '#fff'}, 500)
}
const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
