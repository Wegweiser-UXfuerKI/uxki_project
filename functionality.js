// scroll to content when corresponding nav bar button is clicked
function scrollToElement(sectionId) {
    const elem = document.getElementById(sectionId);
    elem.scrollIntoView({ behavior: 'smooth' });
}

// event listener to automatically change active section (i.e. colors) while scrolling
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.content-background');
    const navBtns = document.querySelectorAll('.nav-btn');
    const navLines = document.querySelectorAll('.nav-line');

    let currentSection = '';
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // scrollY = current vertical scroll position of window
        // 1/2 of section should be visible to be considered as active section
        if (scrollY >= sectionTop - sectionHeight / 2) {
            currentSection = section.getAttribute('id');
        }
    });

    // remove active class from all nav-lines, so they stay grey when not active
    navLines.forEach(function (navLine) {
        navLine.classList.remove('active');
    });

    navBtns.forEach(function (navBtn) {
        navBtn.classList.remove('active');
        if (navBtn.getAttribute('onclick').includes(currentSection)) {
            // when section is active (=currentSection), corresponding nav-btn + nav-line get active too (i.e. change color)
            navBtn.classList.add('active');
            document.getElementById('line' + navBtn.id[3]).classList.add('active');
        }
    });
});


// fetch Instagram feed (last four images) and display on website
const fields = 'id, media_type, children{media_url}, media_url, caption, timestamp, username, permalink';
const accessToken = 'IGQWROcmhUSE9obVFPLUMyYXNUMkZAzdWhpdy1fZAlJMOV81Y3I0VEl1WlZAiTDRDNS03VEh0S2cybHZAMMDFtUDI0WTJxS2ZAYSjBiMDVVRkhCUklLQmszY0RkZAmE3TGpEbDVRdThfUUI0SUI0SDB3S2pueTVTcUhoT0EZD';

fetch(`https://graph.instagram.com/me/media?fields=${fields}&limit=4&access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
        // process the response and generate HTML to display the images
        data.data.forEach(item => {
            // create the HTML element for each img
            const image = document.createElement('img');
            image.src = item.media_url;
            image.alt = 'Instagram Photo';
            image.classList.add('insta-img');
            image.setAttribute('data-media', JSON.stringify(item));
            // append the img element to the insta-feed container
            document.getElementById('insta-feed').appendChild(image);
        });
    })
    .catch(error => {
        console.error('Error fetching Instagram feed:', error);
    });


// add a popup when an Instagram photo is clicked
const popupContainer = document.getElementById('popup-container');
const popupContent = document.getElementById('popup-content');

function openPopup(media) {
    popupContent.innerHTML = ''; // clear previous content

    // create the left and right arrows
    const leftArrow = document.createElement('img');
    leftArrow.classList.add('arrow', 'left-arrow');
    leftArrow.src = 'images/left.png';

    const rightArrow = document.createElement('img');
    rightArrow.classList.add('arrow', 'right-arrow');
    rightArrow.src = 'images/right.png';

    if (media.media_type === 'CAROUSEL_ALBUM') {
        // add the arrows to the popup content for carousel_album
        popupContent.appendChild(leftArrow);
        popupContent.appendChild(rightArrow);
    }

    // create the elements for image and post info
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const img = document.createElement('img');
    img.src = media.media_url;
    img.alt = 'Instagram Photo';

    imgContainer.appendChild(img);

    const postInfo = document.createElement('div');
    postInfo.id = 'post-info';

    postInfo.innerHTML = `
        <div id="top">
            <div class="row">
                <a class="img-container" href="https://www.instagram.com/${media.username}">
                    <img src="images/wegweiser_flat.png" alt="Instagram-Wegweiser-Logo">
                </a>
                <a id="username" href="https://www.instagram.com/${media.username}">${media.username}</a>
            </div>
            <p id="caption">${media.caption}</p>
        </div>
        <div id="bottom">
            <div class="row">
                <p id="timestamp" class="light">${formatDate(new Date(media.timestamp))}</p>
                <a href="${media.permalink}">zum Post</a>
            </div>
        </div>`;

    // append the elements to the popup content
    popupContent.appendChild(imgContainer);
    popupContent.appendChild(postInfo);

    // if there is more than one img in the post (carousel album) the visible img is updated via click on arrows
    if (media.media_type === 'CAROUSEL_ALBUM') {
        const images = media.children.data;
        let currentIndex = 0;

        function updateImage() {
            img.src = images[currentIndex].media_url;
        }

        // call the updateImage function to show the first image in the carousel
        updateImage();

        // Event listener for the left arrow click
        leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });

        // Event listener for the right arrow click
        rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });
    }

    popupContainer.classList.add('show');
}

// format date of post for the popup
function formatDate(timestamp) {
    // date, month, year separately
    const day = timestamp.getDate();
    const monthIndex = timestamp.getMonth();
    const year = timestamp.getFullYear();
    // month as name
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    // format whole date
    return `${day}. ${monthNames[monthIndex]} ${year}`;
}

function closePopup() {
    popupContainer.classList.remove('show');
}

// event listener to open popup if Instagram img is clicked and close it if background is clicked
document.addEventListener('click', function (event) {
    // check if clicked element is an Instagram img
    if (event.target.classList.contains('insta-img')) {
        const media = JSON.parse(event.target.getAttribute('data-media'));
        openPopup(media);
    }
    // check if clicked element is the popup container or its content
    else if (event.target === popupContainer || event.target === popupContent) {
        closePopup();
    }
});

// toggle the burger-navbar
function toggleNavbar() {
    var nav = document.getElementById("nav");
    var burger = document.getElementById("burger");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    burger.classList.toggle("change");
}

// add event listener to the burger menu icon
var burgerMenu = document.getElementById("burger");
burgerMenu.addEventListener("click", toggleNavbar);

// toggle navbar when nav-button is clicked
var navs = document.getElementsByClassName("nav-btn");
for (var i = 0; i < navs.length; i++) {
    navs.item(i).addEventListener("click", toggleNavbar);
}