const playButton = document.querySelector('#play__button');
const leaderBoardButton = document.querySelector('#leader-board__button');

let questionAndAnswers = [
    /*1 ЗАДАЧА*/{
        question: 'What year was the movie Titanic released?',
        choise1: '1) 1997',
        choise2: '2) 1998',
        choise3: '3) 1999',
        choise4: '4) 2000',
        answer: '1) 1997'
    },
    /*2 ЗАДАЧА*/{
        question: 'How many pairs of wings does a bee have?',
        choise1: '1) 1',
        choise2: '2) 2',
        choise3: '3) 3',
        choise4: '4) 4',
        answer: '2) 2'
    },
    /*3 ЗАДАЧА*/{
        question: 'Сhoose the largest island in the world.',
        choise1: '1) Madagascar',
        choise2: '2) Borneo',
        choise3: '3) Greenland',
        choise4: '4) New Guinea',
        answer: '3) Greenland'
    },
    /*4 ЗАДАЧА*/{
        question: 'How many colors are in the rainbow?',
        choise1: '1) 5',
        choise2: '2) 6',
        choise3: '3) 7',
        choise4: '4) 8',
        answer: '3) 7'
    },
    /*5 ЗАДАЧА*/{
        question: 'Who painted the Mona Lisa?',
        choise1: '1) Vincent van Gogh',
        choise2: '2) Leonardo da Vinci',
        choise3: '3) Pablo Picasso',
        choise4: '4) Claude Monet',
        answer: '2) Leonardo da Vinci'
    },
    /*6 ЗАДАЧА*/{
        question: 'How many time zones are there in the world?',
        choise1: '1) 7',
        choise2: '2) 24',
        choise3: '3) 23',
        choise4: '4) 9',
        answer: '2) 24'
    },
    /*7 ЗАДАЧА*/{
        question: 'What language is spoken by the most people on Earth?',
        choise1: '1) Chinese',
        choise2: '2) Spanish',
        choise3: '3) Arabic',
        choise4: '4) English',
        answer: '1) Chinese'
    },
    /*8 ЗАДАЧА*/{
        question: 'What is the most consumed drink in the world?',
        choise1: '1) Tea',
        choise2: '2) Vodka',
        choise3: '3) Coffee',
        choise4: '4) Wine',
        answer: '1) Tea'
    },
    /*9 ЗАДАЧА*/{
        question: 'Which planet is the hottest?',
        choise1: '1) Venus',
        choise2: '2) Saturn',
        choise3: '3) Mercury',
        choise4: '4) Mars',
        answer: '1) Venus'
    },
    /*10 ЗАДАЧА*/{
        question: 'How many bones are in the human body?',
        choise1: '1) 206',
        choise2: '2) 205',
        choise3: '3) 201',
        choise4: '4) 209',
        answer: '1) 206'
    }]
const task = document.querySelector('#question')
const firstChoise = document.querySelector('#first-choise')
const secondChoise = document.querySelector('#second-choise')
const thirdСhoise = document.querySelector('#third-choise')
const forthChoise = document.querySelector('#forth-choise')
const scoreGameNumber = document.querySelector('#score__number')
const numberOfQuestion = document.querySelector('#questions-numbers')

let taskNumber = 0;
let score = 0;
let numberTask = 1;

let arrayAddress = window.location.href.split('/')
arrayAddress.splice(0, 3)
arrayAddress.pop()
let address = arrayAddress.join('/')
address = '/' + address
console.log(address)


if (window.location.pathname == address+'/home.html') {
    playButton.addEventListener('click', function () {
        window.location.href = address+'/game.html'
    })
    leaderBoardButton.addEventListener('click', function () {
        window.location.href = address+'/leader-board.html'
    })

}
if (window.location.pathname == address+'/game.html') {
    addNewTask()

    firstChoise.addEventListener('click', function () {
        numberTask += 1
        if (firstChoise.innerHTML == questionAndAnswers[taskNumber].answer) {
            score += 100
        }
        taskNumber += 1
        if (taskNumber === 10) {
            window.location.href = address+'/end.html'
        }
        addNewTask()
    })
    secondChoise.addEventListener('click', function () {
        numberTask += 1
        if (secondChoise.innerHTML == questionAndAnswers[taskNumber].answer) {
            score += 100
        }
        taskNumber += 1
        if (taskNumber === 10) {
            window.location.href = address+'/end.html'
        }
        addNewTask()
    })
    thirdСhoise.addEventListener('click', function () {
        numberTask += 1
        if (thirdСhoise.innerHTML == questionAndAnswers[taskNumber].answer) {
            score += 100
        }
        taskNumber += 1
        if (taskNumber === 10) {
            window.location.href = address+'/end.html'
        }
        addNewTask()
    })
    forthChoise.addEventListener('click', function () {
        numberTask += 1
        if (forthChoise.innerHTML == questionAndAnswers[taskNumber].answer) {
            score += 100
        }
        taskNumber += 1
        if (taskNumber === 10) {
            window.location.href = address+'/end.html'
        }
        addNewTask()
    })

}

if (window.location.pathname == address+'/end.html') {
    const finalScore = document.querySelector('#final-score')
    const userNameInput = document.querySelector('#user-name__input')
    const saveButton = document.querySelector('#save__button')
    const homeButton = document.querySelector('#home__button')
    const retryButton = document.querySelector('#retry__button')
    let players = []

    userNameInput.focus()

    finalScore.innerHTML = (localStorage.getItem('score'))

    saveButton.addEventListener('click', function () {
        if (userNameInput.value == '') {
            alert('Please full out the task')
            return
        }

        let userName = userNameInput.value
        let userScore = (localStorage.getItem('score'))


        let user = {
            name: String(userName),
            points: userScore
        }
        players = JSON.parse(localStorage.getItem('results')) || []
        players.push(user)
        localStorage.setItem('results', JSON.stringify(players))
        userNameInput.value = ''
        userNameInput.setAttribute('readonly', true)

    })

    homeButton.addEventListener('click', function () {
        window.location.href = address+'/home.html'
        localStorage.setItem('score', 0)
    })

    retryButton.addEventListener('click', function () {
        window.location.href = address+'/game.html'
        localStorage.setItem('score', 0)
    })
}

const homeBtnFromBoard = document.querySelector('#home__button--leader-board')
const leaderBoardList = document.querySelector('.leaders-list')
if (window.location.pathname == address+'/leader-board.html') {
    homeBtnFromBoard.addEventListener('click', function () {
        window.location.href = address+'/home.html';
    })
    if (JSON.parse(localStorage.getItem('results')) != null) {
        let users = [];
        users = JSON.parse(localStorage.getItem('results'))
        users.forEach(function (value, index) {
            let element = createCustomElement('div', 'user-score', users[index].name, users[index].points)
            leaderBoardList.appendChild(element)
        })
    }
}

function addNewTask() {
    task.innerHTML = questionAndAnswers[taskNumber].question;
    firstChoise.innerHTML = questionAndAnswers[taskNumber].choise1;
    secondChoise.innerHTML = questionAndAnswers[taskNumber].choise2;
    thirdСhoise.innerHTML = questionAndAnswers[taskNumber].choise3;
    forthChoise.innerHTML = questionAndAnswers[taskNumber].choise4;
    numberOfQuestion.innerHTML = 'Question ' + numberTask + ' of 10'
    if (score != undefined) {
        scoreGameNumber.innerHTML = score
    }

    if (score > 200) {
        scoreGameNumber.classList.remove("score__number--color");
        scoreGameNumber.classList.add('color-yellow')
    }

    if (score > 500) {
        scoreGameNumber.classList.remove("color-yellow");
        scoreGameNumber.classList.add('color-green')
    }
    localStorage.setItem('score', score)
}

function createCustomElement(tagName, className, elemName, elemPoints) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    elem.innerHTML = `
    <div class="user-text">${elemName}-${elemPoints}</div>
    `
    return elem;
}

