// SELECTORS
const container = document.querySelector('.container');
let playerLivesCount = document.querySelector('span');
let playerLives = 16;

// APPLY THE NUMBER OF LIVES TO THE SPAN TAG
playerLivesCount.textContent = playerLives;

// GENERATE THE DATA
// JUST NEED AN ARRAY OF OBJECTS WITH SOME IMAGE SOURCES
let getData = () => [
	{ imgSrc: './img/jerry.jpg', id: 1, name: 'Jerry Seinfeld' },
	{ imgSrc: './img/elaine.jpg', id: 2, name: 'Elaine Benes' },
	{ imgSrc: './img/george.jpg', id: 3, name: 'George Costanza' },
	{ imgSrc: './img/kramer.jpg', id: 4, name: 'Cosmo Kramer' },
	{ imgSrc: './img/frank.jpg', id: 5, name: 'Frank Costanza' },
	{ imgSrc: './img/estelle.jpg', id: 6, name: 'Estelle Costanza' },
	{ imgSrc: './img/morty.jpg', id: 7, name: 'Morty Seinfeld' },
	{ imgSrc: './img/helen.jpg', id: 8, name: 'Helen Seinfeld' },
	{ imgSrc: './img/jerry.jpg', id: 9, name: 'Jerry Seinfeld' },
	{ imgSrc: './img/elaine.jpg', id: 10, name: 'Elaine Benes' },
	{ imgSrc: './img/george.jpg', id: 11, name: 'George Costanza' },
	{ imgSrc: './img/kramer.jpg', id: 12, name: 'Cosmo Kramer' },
	{ imgSrc: './img/frank.jpg', id: 13, name: 'Frank Costanza' },
	{ imgSrc: './img/estelle.jpg', id: 14, name: 'Estelle Costanza' },
	{ imgSrc: './img/morty.jpg', id: 15, name: 'Morty Seinfeld' },
	{ imgSrc: './img/helen.jpg', id: 16, name: 'Helen Seinfeld' },
];

// LET'S RANDOMIZE THE DATA
const randomize = () => {
	const cardData = getData();
	cardData.sort(() => Math.random() - 0.5);
	return cardData;
	// console.log(cardData);
};

// randomize();

// GENERATE THE CARDS
const cardGenerator = () => {
	const cardData = randomize();
	// console.log(cardData);

	// FOR EACH CARD
	cardData.forEach((item) => {
		// GENERATE THE HTML ELEMENTS
		const card = document.createElement('button');
		const face = document.createElement('img');
		const back = document.createElement('div');

		// ADD CLASSES TO THEM
		card.classList.add('card');
		face.classList.add('face');
		back.classList.add('back');

		// ATTACH THE INFO FOR TO THE CARDS
		face.src = item.imgSrc;
		card.setAttribute('id', item.id);
		card.setAttribute('name', item.name);

		// ATTACH THE GENERATED HTML ELEMENTS (CARDS) TO THE container
		container.appendChild(card);
		card.appendChild(face);
		card.appendChild(back);

		// ADD CLASS TOGGLECARD ON CLICK - THIS IS USED FOR THE ANIMATION
		card.addEventListener('click', (e) => {
			card.classList.toggle('toggleCard');
			checkCards(e);
		});
	});
};

// CHECK CARDS
const checkCards = (e) => {
	// console.log(e);
	// WHEN WE CLICK THE EVENT IS GOING TO CAPTURE SOME DATA
	const clickedCard = e.target;
	// console.log(clickedCard);
	// ADD CLASS FLIPPED ON CLICK - THIS IS USED TO CHECK FOR A MATCH
	clickedCard.classList.add('flipped');

	// TARGET FLIPPED CARDS
	const flippedCards = document.querySelectorAll('.flipped');

	const toggleCard = document.querySelectorAll('.toggleCard');

	// LOGIC
	// IF WE HAVE TWO OF THEM FLIPPED, RUN THE CHECK
	if (flippedCards.length === 2) {
		// IF THE NAMES MATCH, IT'S CORRECT
		if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
			console.log('match');
			flippedCards.forEach((card) => {
				card.classList.remove('flipped');
				// IF THERE'S A MATCH, STOP THE CARDS FROM FLIPPING ANY MORE
				card.style.pointerEvents = 'none';
			});
		} else {
			console.log('wrong');
			flippedCards.forEach((card) => {
				// IF THERE ISN'T A MATCH REMOVE THE CLASS FLIPPED (THE CHECK) AND TOGGLECARD (ANIMATION)
				card.classList.remove('flipped');
				// WE APPLY A SETTIME OUT TO DELAY THE ANIMATION OF THE CARD FLIPPING BACK
				setTimeout(() => card.classList.remove('toggleCard'), 1200);
				// IF THE PLAYER IS WRONG, THEY LOSE A LIFE
				playerLives--;
				playerLivesCount.textContent = playerLives;

				// IF THE PLAYER RUNS OUT LIVES, RUN THE RESTART SCRIPT
				if (playerLives === 0) {
					restart();
					alert('Try again');
				}
			});
		}
	}

	// RUN A CHECK TO SEE IF WE WON THE GAME
	// THERE ARE 16 CARDS, SO IF ALL THE CARDS HAV THE TOGGLECARD CLASS, YOU'VE WON THE GAME
	if (toggleCard.length === 16) {
		restart("You've won! That's dynamite.");
	}
};

// RESTART THE GAME
const restart = () => {
	let cardData = randomize();
	let faces = document.querySelectorAll('.face');
	let cards = document.querySelectorAll('.card');
	container.style.pointerEvents = 'none';

	// IF WE LOSE, FLIP ALL THE CARDS BACK TO THEIR ORIGINAL STATE
	cardData.forEach((item, index) => {
		cards[index].classList.remove('toggleCard');
		// RANDOMIZE
		setTimeout(() => {
			cards[index].style.pointerEvents = 'all';
			faces[index].src = item.imgSrc;
			cards[index].setAttribute('name', item.name);
			container.style.pointerEvents = 'all';
		}, 1200);
	});

	// RESET THE NUMBER OF LIVES
	playerLives = 16;
	playerLivesCount.textContent = playerLives;
	setTimeout(() => {
		// window.alert(text);
		alert("You've won! That's dynamite.");
	}, 100);
};

cardGenerator();
