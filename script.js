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
    modalText.innerHTML = `<p>Good job on learning about the works and achievements of Mars rovers! You have completed stage 1. Head over here to continue.</p>
                           <a href="https://iweioj.github.io/Mars-rover-2/">Continue</a>`;
    overlay.style.display = 'flex';
}

function generateLogos() {
    const logosData = [
    		{ x: 2, y: 1, rover: 'Mars Exploration Mission', discovery: 'Initiated in the late 1990s, the NASA Mars Exploration Program aims to investigate Mars to understand its environment, geology, and potential for past or present life. The program has a main objectives are to determine if life ever existed on Mars, understand its climate and geology, and prepare for future human exploration. The mission searches for evidence of liquid water on the surface of Mars and other energy sources besides sunlight. By analyzing the rocks, terrain, and climate of Mars, the program gathers evidence to determine whether life could be possible on Mars. It began with the launch of the Sojourner rover as part of the Mars Pathfinder mission and has since deployed a series of increasingly advanced rovers.', image: 'https://science.nasa.gov/wp-content/uploads/2024/02/22530-pia23302-web.jpg?w=320&format=webp 320w' },
        { x: 5, y: 4, rover: 'sojourner', discovery: 'Launched on December 4, 1996, and landed on July 4, 1997, as part of the Mars Pathfinder mission, Sojourner was the first wheeled vehicle to venture on another planet. About the size of a microwave oven, it was equipped with cameras and scientific instruments to analyze Martian soil. Sojourner landed on the surface of Mars using a air bag landing system, and spent 83 days on Mars exploring its terrain, and drove a distance of nearly 330 feet. Sojourner explored around its landing site called Ares Vallis, as the area had the potential to have water evidence. Since water could be in the area, different types of rocks would be rushed down, and Sojourner could explore different types of rocks without travelling far. Its notable achievements include analyzing soil to reveal a high silicon content indicating a volcanic past, and capturing more than 550 panoramic images of the Martian surface. The photo below is the Alpha Proton X-Ray Spectrometer, which was the primary scientific tool on Sojourner that analyzed dust and rocks.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/MER_APXS_PIA05113.jpg' },
        { x: 7, y: 5, rover: 'spirit', discovery: 'Spirit and Opportunity were twin rovers launched in 2003, with Spirit landing on January 4, 2004, and Opportunity landing on January 25, 2004. Both rovers, about the size of a golf cart, were equipped with panoramic cameras, microscopic imagers, rock abrasion tools, and scientific instruments to study Martian geology. Spirit landed at Gusev Crater, a possible former lake, while Opportunity landed at Meridiani Planum, these two landing sites were at the opposite sides of the planet.Their notable achievements include discovering extensive evidence of past water, finding minerals that form in water, and features resembling dried-up riverbeds and lakebeds. Spirit found signs of explosive volcanic activity driven by heated underground water. Opportunity operated for nearly 15 years, which was more than 20 times longer than its intended time, traveling over 45 kilometers, and discovered hematite spherules ("blueberries") indicative of past water. On the other hand, Spirit travelled 7.7 kilometers on mars', image: 'https://www.researchgate.net/profile/Teresa-Rinaldi-2/publication/356665224/figure/fig4/AS:1098076932571138@1638813350255/Martian-hematite-spherules-blueberries-discovered-by-the-Opportunity-rover-Image.ppm' },
        { x: 8, y: 4, rover: 'curiosity', discovery: 'The Mars rover Curiosity was launched on November 26, 2011, and on August 6, 2012, it touched down in Gale Crater. The rover, which is roughly the size of a small SUV, has several scientific instruments for researching Martian rocks, soil, and atmosphere in addition to a robotic arm, drill, and high-resolution cameras. Among its many notable findings is the detection of organic molecules, which are the basic building blocks of life. Evidence of a thicker atmosphere and a warmer, wetter climate—conditions that may have supported microbial life—was also discovered by Curiosity. Understanding the potential of Mars for previous habitability as well as its geological and climatic history depends heavily on these discoveries.', image: 'https://d2pn8kiwq2w21t.cloudfront.net/images/imagesmsl20180607curiosity20180607-16.width-1320.jpg' },
        { x: 10, y: 2, rover: 'perseverance', discovery: 'The Mars rover Perseverance was launched on July 30, 2020, and it touched down at Jezero Crater on February 18, 2021. including Curiosity, it is about the same size but loaded with fancy equipment including an Ingenuity helicopter drone and a drill for taking core samples of Martian rock and dirt. The primary objective of Perseverance is to investigate the ancient river delta of Jezero Crater, which may have once held water and sustained microscopic life forms, according to scientists. The rover is hard at work examining rock samples to look for biosignatures, or traces of previous life. Additionally, it is the start of a mission to collect and store samples for later Earth-return trips. These samples may offer convincing proof of the existence of life on Mars in the past, which would help us understand the history of the planet and its potential for supporting life.', image: 'https://www.nasa.gov/wp-content/uploads/2023/03/pia24172.jpg?w=1041' }
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
