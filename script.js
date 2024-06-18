const rover = document.getElementById('rover');
const map = document.getElementById('map');
const overlay = document.getElementById('overlay');
const modalText = document.getElementById('modal-text');
const startButton = document.getElementById('start-button');
const introScreen = document.getElementById('intro-screen');
const closeButton = document.getElementById('close-button');

let currentRover = 'nasa'; // Initial rover type set to default
// Initial rover type
let roverX = 0; // Rover's X position on the grid
let roverY = 0; // Rover's Y position on the grid
let isMoving = false; // Flag to prevent multiple moves at once
let modalDisplayed = false; // Flag to track if modal is currently displayed
let touchedLogos = new Set(); // Set to keep track of logos that have been touched

rover.classList.add('rover-' + currentRover);
rover.style.left = roverX * 100 + 'px'; // Each unit on the grid is 100px wide
rover.style.top = roverY * 100 + 'px'; // Each unit on the grid is 100px tall

generateLogos();

document.addEventListener('keydown', moveRover); // Listen for keydown event for rover controls

startButton.addEventListener('click', () => {
    introScreen.style.display = 'none';
});

closeButton.addEventListener('click', hideModal);

function moveRover(event) {
    if (isMoving) return; // Prevent multiple moves at once
    isMoving = true;

    const step = 1; // Number of grid units to move in each step

    switch (event.key) {
        case 'ArrowLeft':
            roverX = Math.max(roverX - step, 0); // Ensure rover stays within map boundaries
            break;
        case 'ArrowRight':
            roverX = Math.min(roverX + step, 9); // 10 columns (0 to 9)
            break;
        case 'ArrowUp':
            roverY = Math.max(roverY - step, 0); // Ensure rover stays within map boundaries
            break;
        case 'ArrowDown':
            roverY = Math.min(roverY + step, 5); // 6 rows (0 to 5)
            break;
    }

    rover.style.left = roverX * 100 + 'px'; // Each unit on the grid is 100px wide
    rover.style.top = roverY * 100 + 'px'; // Each unit on the grid is 100px tall

    checkLogoCollision();
    
    setTimeout(() => {
        isMoving = false;
    }, 300); // Reset move flag after 300ms (adjust as needed for smoother movement)
}

function checkLogoCollision() {
    if (modalDisplayed) return; // If the modal is already displayed, do nothing

    const logos = document.querySelectorAll('.logo');
    
    logos.forEach(logo => {
        if (!touchedLogos.has(logo) && isColliding(logo, rover)) {
            touchedLogos.add(logo);
            showInfo(logo);
            return;
        }
    });
}

function isColliding(logo, rover) {
    const logoRect = logo.getBoundingClientRect();
    const roverRect = rover.getBoundingClientRect();

    return !(
        logoRect.top > roverRect.bottom ||
        logoRect.bottom < roverRect.top ||
        logoRect.right < roverRect.left ||
        logoRect.left > roverRect.right
    );
}

function showInfo(logo) {
    modalDisplayed = true; // Set the modalDisplayed flag to true when showing the modal
    const roverType = logo.dataset.rover;
    const discovery = logo.dataset.discovery;
    const imageSrc = logo.dataset.image;
    let message;

    switch (roverType) {
        case 'sojourner':
            message = "Sojourner: " + discovery;
            break;
        case 'spirit':
            message = "Spirit: " + discovery;
            break;
        case 'curiosity':
            message = "Curiosity: " + discovery;
            break;
        case 'perseverance':
            message = "Perseverance: " + discovery;
            break;
       case 'Mars Exploration Mission':
            message = "Mars Exploration Mission: " + discovery;
            break;
        default:
            message = "Unknown mission: " + discovery;
    }

    modalText.innerHTML = `
  <div>
    <p>${message}</p>
    <img src="${imageSrc}" alt="${roverType} image" class="modal-image">
  </div>
`;
overlay.style.display = 'flex';





    
    // Update circle color based on rover type
    const circle = logo.querySelector('.blue-circle');
    if (circle) {
        circle.classList.add('active'); // Change color to blue
    }
}

function hideModal() {
    overlay.style.display = 'none';
    modalDisplayed = false; // Reset the modalDisplayed flag when hiding the modal
    
    // Update currentRover to the next in the sequence
    switch (currentRover) {
    		case 'nasa':
            currentRover = 'sojourner';
            break;
        case 'sojourner':
            currentRover = 'spirit';
            break;
        case 'spirit':
            currentRover = 'curiosity';
            break;
        case 'curiosity':
            currentRover = 'perseverance';
            break;
        case 'perseverance':
            currentRover = 'sojourner'; // Loop back to the beginning
            showCompletionMessage(); // Show completion message after reaching Perseverance
            break;
    }

    rover.className = ''; // Remove current rover class
    rover.classList.add('rover-' + currentRover); // Add new rover class
}

function showCompletionMessage() {
    modalText.innerHTML = `<p>Good job on learning about the works and achievements of Mars rovers! You have completed stage 2. Head over here to continue.</p>
                           <a href="https://www.google.com" class="continue-button">Continue</a>`;
    overlay.style.display = 'flex';
}

function generateLogos() {
    const logosData = [
    		{ x: 2, y: 1, rover: 'Mars Exploration Mission', discovery: 'NASA launched the Mars Exploration Programme, an ongoing set of missions, to investigate Mars and learn more about its environment, geology, and any past or present life. The main objectives of the programme, which was started in the late 1990s, are to ascertain if life has ever lived on Mars, comprehend the temperature and geology of the planet, and get ready for further human exploration. After launching the Sojourner rover as part of the Mars Pathfinder mission, the programme has gone on to deploy a number of rovers that have gotten more and more advanced. With the help of cutting-edge scientific equipment, these rovers are able to examine the Martian atmosphere and surface, transmit precise data back to Earth, and clear the path for future human expeditions. ', image: 'https://science.nasa.gov/wp-content/uploads/2024/02/22530-pia23302-web.jpg?w=320&format=webp 320w' },
        { x: 5, y: 4, rover: 'sojourner', discovery: 'Sojourner wasn\'t about complex scientific analysis, but it achieved something far greater. Launched in 1997 as part of the Mars Pathfinder mission, Sojourner became the first wheeled vehicle to ever roam another planet. This pioneering accomplishment proved that mobile exploration on Mars was possible, paving the way for a new generation of rovers that would follow in its tracks. Sojourner\'s success wasn\'t just about mobility though. It also carried scientific instruments that analyzed the Martian soil composition, revealing a high silicon content that hinted at a volcanic past and the possibility of past water. In addition, Sojourner\'s cameras captured the first panoramic images of the Martian surface, showcasing a varied landscape of rocks, dust dunes, and intriguing features that resembled flood channels. These images sparked further scientific curiosity about Martian geology.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/MER_APXS_PIA05113.jpg' },
        { x: 7, y: 5, rover: 'spirit', discovery: 'The year 2004 witnessed a triumphant arrival of twin rovers on Mars – Spirit and Opportunity. They revolutionized our understanding of the Red Planet by discovering extensive evidence of past water. These rovers found minerals that form in water, along with features that looked like dried-up riverbeds and lakebeds. This painted a picture of a much wetter Mars in its ancient past. The discoveries didn\'t stop there. Spirit and Opportunity ventured into environments that could have supported microbial life billions of years ago. Spirit even found signs of explosive volcanic activity driven by heated underground water, which can be a haven for microbes here on Earth. In addition to searching for signs of water and potential habitability, these rovers also analyzed Martian rock composition, providing valuable insights into the planet\'s geological history. Sadly, Spirit\'s mission ended in 2009, but Opportunity became a champion of Martian exploration, far exceeding its planned mission duration and traveling over 45 kilometers before succumbing to a dust storm in 2018.', image: 'https://www.researchgate.net/profile/Teresa-Rinaldi-2/publication/356665224/figure/fig4/AS:1098076932571138@1638813350255/Martian-hematite-spherules-blueberries-discovered-by-the-Opportunity-rover-Image.ppm' },
        { x: 10, y: 2, rover: 'curiosity', discovery: 'Curiosity, landing in Gale Crater in 2012, has been busy unraveling the secrets of what was most likely a large lake that once existed there. It has analyzed the lakebed sediments and found exciting traces of the chemical building blocks for life, including carbon, hydrogen, nitrogen, and oxygen. But Curiosity\'s achievements go beyond that. This rover\'s sophisticated tools allowed it to drill into Martian rock and detect organic molecules, complex carbon-based structures that could be signs of ancient life or prebiotic chemistry on Mars. While the presence of organic molecules doesn\'t definitively prove past life, it opens up exciting possibilities for future exploration. Curiosity\'s studies also shed light on the Martian atmosphere and climate, suggesting that Mars once had a thicker atmosphere and a warmer climate, conditions that could have been favorable for life to exist on the surface. Curiosity\'s ongoing exploration of Gale Crater continues to expand our knowledge about the Red Planet.', image: 'https://d2pn8kiwq2w21t.cloudfront.net/images/imagesmsl20180607curiosity20180607-16.width-1320.jpg' },
        { x: 10, y: 4, rover: 'perseverance', discovery: 'The latest addition to the Mars rover family is Perseverance, which landed in Jezero Crater in February 2021. This crater is an ancient river delta that is believed to have held a large lake billions of years ago, making it a prime location for searching for signs of past microbial life. Perseverance is adding to the growing evidence of water on Mars by exploring the delta and meticulously analyzing rock samples that could potentially hold biosignatures, the chemical fingerprints of ancient life. This rover is undertaking a critical mission to collect and cache Martian rock and soil samples. These samples will eventually be returned to Earth for in-depth analysis in highly sophisticated laboratories, potentially providing definitive answers about the possibility of past life on Mars. Although still in its early stages of exploration, Perseverance holds immense promise for unlocking the secrets of Mars\'s past and its potential habitability.', image: 'https://www.nasa.gov/wp-content/uploads/2023/03/pia24172.jpg?w=1041' }
    ];

    logosData.forEach(pos => {
        const logo = document.createElement('div');
        logo.classList.add('logo');
        logo.style.left = pos.x * 100 + 'px';
        logo.style.top = pos.y * 100 + 'px';
        logo.dataset.rover = pos.rover;
        logo.dataset.discovery = pos.discovery;
        logo.dataset.image = pos.image;

        // Add blue circle for each logo
        const circle = document.createElement('div');
        circle.classList.add('blue-circle');
        logo.appendChild(circle);

        // Add number in the center of the circle
        const number = document.createElement('div');
        number.classList.add('number');
        number.textContent = logosData.indexOf(pos) + 1;
        circle.appendChild(number);

        map.appendChild(logo);
    });
}
