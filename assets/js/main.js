function chooseDifficult(difficult) {
    switch (difficult) {
        case 'baby':
            setNewOrderBaby();
            break;
        case 'medium':
        case 'hard':
            setNewOrder();
            break;
    }
}

function startGame() {
    //Número de pares encontrados
    foundPairs = 0;
    MAX_PAIR_NUMBER = orderForThisRound.length / 2;
    setImgsInCards();
    cards = document.querySelectorAll('#gameBox img');
    openCards();
    canPlay = true;
}

//Barajar las imagenes de baby
function setNewOrderBaby() {
    const posRandom = Math.floor(Math.random() * availablesImgs.length);
    const card = Math.floor(Math.random() * availablesImgs[posRandom].length);
    for (let index = 0; index < availablesImgs[posRandom].length * 2; index++) {
        orderForThisRound.push(availablesImgs[posRandom][card]);
    }
}

//Barajar las imagenes de medio y dificil
function setNewOrder() {
    const posRandom = Math.floor(Math.random() * availablesImgs.length);
    orderForThisRound = availablesImgs[posRandom].concat(availablesImgs[posRandom]);
    orderForThisRound.sort(() => Math.random() - 0.5);
}

//Rellenar tablero
function setImgsInCards() {
    for (let index = 0; index < orderForThisRound.length; index++) {
        const newImg = document.createElement('img');
        newImg.src = orderForThisRound[index];
        document.getElementById('gameBox').appendChild(newImg);
    }
}

//Abrir todas las tarjetas
function openCards() {
    cards.forEach(card => {
        card.classList.remove('close');
        card.classList.add('open')
    });
    setTimeout(() => {
        closeCards();
    }, 3000);
}

//Cerrar todas las tarjetas
function closeCards() {
    cards.forEach(card => {
        card.classList.remove('open')
        card.classList.add('close')
    });
    addClickEvents();
}

//Añadir eventos de click a todas las imagenes
function addClickEvents() {
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//Quitar eventos de click a todas las imagenes
function removeClickEvents() {
    cards.forEach(card => card.removeEventListener("click", flipCard));
}

//Seleccionado una imagen
function flipCard(e) {
    const clickedCard = e.target;
    if (canPlay && !clickedCard.classList.contains('open')) {
        clickedCard.classList.remove('close');
        clickedCard.classList.add('open');
        checkPair(clickedCard);
    }
}

//Limpiar las dos imagenes abiertas
function resetOpenedCarts() {
    card1.classList.remove("open");
    card1.classList.add("close");
    card2.classList.remove("open");
    card2.classList.add("close");

    card1 = null;
    card2 = null;

    canPlay = true;
}

//Revisar la pareja
function checkPair(image) {
    if (!card1) card1 = image;
    else card2 = image;

    if (card1 && card2) {
        if (card1.src === card2.src) {
            canPlay = true;
            checkIfWon();
        } else {
            canPlay = false;
            resetOpenedCarts();
        }
    }
}

//Revisar si ha ganado
function checkIfWon() {
    foundPairs++;

    card1 = null;
    card2 = null;
    canPlay = true;

    if (MAX_PAIR_NUMBER === foundPairs) setNewGame();
}

// //Reiniciar el juego
function setNewGame() {
    removeClickEvents();
    cards.forEach(card => card.classList.remove("open"));
    setTimeout(startGame(), 1000);
}