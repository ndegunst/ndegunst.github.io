// Define cards array
var cards = [
    { title: 'Mountain View', copy: 'Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains', button: 'View Trips' },
    { title: 'To The Beach', copy: 'Plan your next beach trip with these fabulous destinations', button: 'View Trips' },
    { title: 'Desert Destinations', copy: 'It\'s the desert you\'ve always dreamed of', button: 'Book Now' },
    { title: 'Explore The Galaxy', copy: 'Seriously, straight up, just blast off into outer space today', button: 'Book Now' }
];

// Function to render cards
function renderCards() {
    var cardContainer = document.querySelector('.page-content');

    cards.forEach(function(card) {
        // Create card element
        var cardElem = document.createElement('div');
        cardElem.classList.add('card');

        // Create card content
        var contentElem = document.createElement('div');
        contentElem.classList.add('content');

        // Populate card content
        var titleElem = document.createElement('h2');
        titleElem.textContent = card.title;
        var copyElem = document.createElement('p');
        copyElem.textContent = card.copy;
        var buttonElem = document.createElement('button');
        buttonElem.classList.add('btn');
        buttonElem.textContent = card.button;

        // Append content to card
        contentElem.appendChild(titleElem);
        contentElem.appendChild(copyElem);
        contentElem.appendChild(buttonElem);

        // Append card to container
        cardElem.appendChild(contentElem);
        cardContainer.appendChild(cardElem);
    });
}

// Call renderCards function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', renderCards);
