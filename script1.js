document.addEventListener('DOMContentLoaded', () => {
    const parts = document.querySelectorAll('.part');
    const dropAreas = document.querySelectorAll('.drop-area');
    const overlay = document.getElementById('overlay');
    const modalText = document.getElementById('modal-text');
    const nextButton = document.getElementById('next-button');
    const closeButton = document.getElementById('close-button');
    const welcomeMessage = "Welcome to the model of Perseverance, the newest model of Mars rover. Match the images to the correct dropbox and learn about the different parts of the rover!";

    let currentDraggedElement = null;
    let completedCount = 0;

    // Function to show the initial overlay with the welcome message
    function showWelcomeOverlay() {
        modalText.textContent = welcomeMessage;
        overlay.style.display = 'flex';
    }

    // Show the welcome overlay when the page is loaded
    showWelcomeOverlay();

    // Event listeners for drag and drop functionality
    parts.forEach(part => {
        part.addEventListener('dragstart', () => {
            currentDraggedElement = part;
        });
    });

    dropAreas.forEach(dropArea => {
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            if (dropArea.id === `drop-${currentDraggedElement.id}`) {
                dropArea.innerHTML = '';
                currentDraggedElement.style.width = '100%';
                currentDraggedElement.style.height = '100%';
                currentDraggedElement.style.objectFit = 'cover';
                dropArea.appendChild(currentDraggedElement);
                completedCount++;
                console.log(`Completed Count: ${completedCount}`);
                showOverlay(dropArea.id);
            }
        });
    });

    // Event listener for the "Next" button
    nextButton.addEventListener('click', hideOverlay);

    // Event listener for the "Close" button
    closeButton.addEventListener('click', hideOverlay);

    // Function to display the overlay with the part description
    function showOverlay(dropAreaId) {
        let partName = dropAreaId.split('-')[1];
        let partDescription;

        switch (partName) {
            case 'mast':
                partDescription = "Congrats! You have assembled the Mast. The mast serves as a crucial platform atop the rover, housing sophisticated instruments that extend Perseverance's scientific capabilities. It includes the SuperCam, which can analyze the chemical composition of rocks from a distance using laser-induced breakdown spectroscopy and remote micro-imaging. Additionally, the Mastcam-Z provides high-resolution, stereoscopic images and videos of the Martian terrain, aiding scientists in selecting exploration targets and understanding geological features. The mast's ability to rotate and tilt enhances its versatility, allowing for panoramic views and detailed close-ups of interesting sites. By facilitating detailed remote sensing and imaging, the mast plays a pivotal role in advancing our knowledge of Mars' geology, climate history, and potential for past microbial life.";
                break;
            case 'body':
                partDescription = "Congrats! You have assembled the Body. The body is a robust structure that houses essential systems vital for Perseverance's mission on Mars. Inside the body, the rover's power source, including a multi-mission radioisotope thermoelectric generator (MMRTG), provides electrical power and heat to operate the rover's systems in the harsh Martian environment. The body also contains the rover's computer and telecommunications equipment, which manage and transmit data collected by the rover's scientific instruments back to Earth. Moreover, the body acts as a protective shell, shielding sensitive instruments from extreme temperatures, radiation, and dust storms on Mars. By ensuring the integrity and functionality of Perseverance's critical systems, the body enables sustained exploration and scientific discovery on the Red Planet.";
                break;
            case 'arm':
                partDescription = "Congrats! You have assembled the Arm. The arm is a versatile and dexterous tool equipped with a suite of scientific instruments and tools essential for Perseverance's mission objectives. At the end of the arm is the turret assembly, which includes the drill for collecting core samples of Martian rock and regolith. This enables scientists to study the composition and mineralogy of Mars' surface in detail. The arm also features high-resolution cameras and instruments for close-up imaging and analysis, providing insights into geological features and potential biosignatures. Additionally, the arm's ability to extend and maneuver allows Perseverance to reach difficult-to-access locations, enhancing the rover's capability to explore diverse terrain and conduct in-depth scientific investigations.";
                break;
            case 'wheel':
                partDescription = "Congrats! You have assembled the Wheel. The wheels of Perseverance are rugged and meticulously designed to traverse the challenging terrain of Mars. Each wheel is constructed from aluminum and measures about 52.5 centimeters (20.7 inches) in diameter, featuring cleats for traction and durability on various surfaces. The rover's six wheels are individually powered and actuated, allowing Perseverance to navigate over rocks, sand, and slopes with precision and reliability. The wheels are engineered to withstand the harsh conditions on Mars, including temperature extremes and sharp rocks, ensuring the rover's mobility and longevity throughout its mission. By providing stable and efficient movement across the Martian landscape, the wheels enable Perseverance to reach exploration targets, gather scientific data, and uncover the mysteries of the Red Planet.";
                break;
        }

        modalText.textContent = partDescription;
        overlay.style.display = 'flex';

        // After showing the part description, check if all parts are completed
        if (completedCount === 4) {
            nextButton.removeEventListener('click', hideOverlay);
            nextButton.addEventListener('click', showImprovementOverlay);
        } else {
            nextButton.removeEventListener('click', showImprovementOverlay);
            nextButton.addEventListener('click', hideOverlay);
        }
    }

    // Function to display the improvement summary overlay
    function showImprovementOverlay() {
        const improvementMessage = "Enhancing the Mars rover Perseverance with miniaturized nuclear batteries provides a consistent power supply, essential for continuous operation during dust storms and night-time, while advanced suspension systems improve mobility over Mars' rugged terrain, allowing access to diverse scientific sites. Integrating AI-driven navigation systems reduces communication lag with Earth, enabling real-time decision-making and obstacle handling, and the use of 3D printing technology for on-site manufacturing and repairs increases mission longevity and self-sufficiency by allowing the rover to create and repair its own parts from Martian materials. These combined advancements significantly boost the rover's exploration and data collection capabilities.";
        modalText.textContent = improvementMessage;
        overlay.style.display = 'flex';

        // Event listener to show thank you message after improvement message
        nextButton.removeEventListener('click', showImprovementOverlay);
        nextButton.addEventListener('click', showThankYouOverlay);
    }

    // Function to hide overlay
    function hideOverlay() {
        overlay.style.display = 'none';
    }

    // Function to display the thank you message
    function showThankYouOverlay() {
        const thankYouMessage = "Thank you for visiting the Mars Rover Space Museum! We hope you learned a lot and enjoyed assembling the Perseverance rover. Safe travels on your journey through space exploration!";
        modalText.textContent = thankYouMessage;
        overlay.style.display = 'flex';

        // Event listener to close the overlay after thank you message
        nextButton.removeEventListener('click', showThankYouOverlay);
        nextButton.addEventListener('click', hideOverlay);
    }
});
