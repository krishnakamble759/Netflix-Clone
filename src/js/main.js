// Import Bootstrap JS
import 'bootstrap';
import { initComingSoon } from './coming_soon.js';
import { initDownloads, addMovieToDownloads } from './downloads.js';

// Splash Screen handling
const splashScreen = document.querySelector('.splash-screen');
const profileSelection = document.querySelector('.profile-selection');
const appContent = document.querySelector('.app-main');

// Show profile selection after 5 seconds of splash
setTimeout(() => {
    if (splashScreen) {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            if (profileSelection) {
                profileSelection.classList.remove('d-none');
            }
        }, 500);
    }
}, 5000);

// --- Status Bar Time Logic ---
function updateStatusBarTime() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    timeElement.textContent = `${hours}:${formatMinutes}`;
}

setInterval(updateStatusBarTime, 1000);
updateStatusBarTime();

// --- Handle Profile Selection ---
const profileGrid = document.querySelector('.profiles-grid');
const profileNameHeading = document.querySelector('.continue-watching-section .section-title');
const editProfilesBtn = document.getElementById('edit-profiles-btn');
let isEditingMode = false;
let profileToEdit = null;

function handleProfileClick(item) {
    if (isEditingMode) {
        // Open modal in edit mode
        profileToEdit = item;
        const currentName = item.querySelector('p').textContent;
        const currentImg = item.querySelector('img').src;

        if (addProfileModal && newProfileInput) {
            const modalTitle = addProfileModal.querySelector('h2');
            if (modalTitle) modalTitle.textContent = 'Edit Profile';

            newProfileInput.value = currentName;
            const previewImg = document.getElementById('new-profile-preview');
            if (previewImg) previewImg.src = currentImg;

            addProfileModal.classList.remove('d-none');
            newProfileInput.focus();
        }
        return;
    }

    const selectedName = item.querySelector('p').textContent;
    if (profileNameHeading) {
        profileNameHeading.textContent = `Continue Watching for ${selectedName}`;
    }

    if (profileSelection) {
        profileSelection.classList.add('fade-out');
        setTimeout(() => {
            profileSelection.style.display = 'none';
            if (appContent) {
                appContent.classList.remove('d-none');
                window.scrollTo(0, 0);
            }
        }, 500);
    }
}

// Initial profile items
document.querySelectorAll('.profile-item').forEach(item => {
    item.addEventListener('click', () => handleProfileClick(item));
});

// Edit Button Toggle
if (editProfilesBtn) {
    editProfilesBtn.addEventListener('click', () => {
        isEditingMode = !isEditingMode;
        if (profileGrid) {
            profileGrid.classList.toggle('is-editing');
        }
        // Change icon to checkmark if editing
        const icon = editProfilesBtn.querySelector('i');
        if (icon) {
            icon.className = isEditingMode ? 'bi bi-check-lg' : 'bi bi-pencil-fill';
            icon.style.fontSize = isEditingMode ? '2rem' : '1.5rem';
        }
    });
}

// --- Add/Edit Profile Logic ---
const addProfileBtn = document.getElementById('add-profile-btn');
const addProfileModal = document.getElementById('add-profile-modal');
const saveProfileBtn = document.getElementById('save-profile-btn');
const cancelProfileBtn = document.getElementById('cancel-profile-btn');
const newProfileInput = document.getElementById('new-profile-name');

if (addProfileBtn && addProfileModal) {
    addProfileBtn.addEventListener('click', () => {
        profileToEdit = null;
        const modalTitle = addProfileModal.querySelector('h2');
        if (modalTitle) modalTitle.textContent = 'Add Profile';

        newProfileInput.value = '';
        const previewImg = document.getElementById('new-profile-preview');
        if (previewImg) previewImg.src = '/public/Rectangle 2.svg';

        addProfileModal.classList.remove('d-none');
        newProfileInput.focus();
    });

    cancelProfileBtn.addEventListener('click', () => {
        addProfileModal.classList.add('d-none');
        newProfileInput.value = '';
        profileToEdit = null;
    });

    saveProfileBtn.addEventListener('click', () => {
        const profileName = newProfileInput.value.trim();
        if (!profileName) return;

        if (profileToEdit) {
            // Update existing profile
            const nameEl = profileToEdit.querySelector('p');
            const imgEl = profileToEdit.querySelector('img');
            if (nameEl) nameEl.textContent = profileName;
            // Avatar stays the same for edit in this simplified version
        } else {
            // Template based creation
            const template = document.getElementById('profile-item-template');
            if (!template) return;

            const clone = template.content.cloneNode(true);
            const newProfile = clone.querySelector('.profile-item');

            const avatarNum = Math.floor(Math.random() * 4) + 2;
            const avatarSrc = `/public/Rectangle ${avatarNum}.svg`;

            const img = newProfile.querySelector('img');
            const nameP = newProfile.querySelector('p');

            if (img) {
                img.src = avatarSrc;
                img.alt = profileName;
            }
            if (nameP) nameP.textContent = profileName;

            newProfile.addEventListener('click', () => handleProfileClick(newProfile));

            if (profileGrid) {
                profileGrid.appendChild(newProfile);
            }
        }

        // Close modal
        addProfileModal.classList.add('d-none');
        newProfileInput.value = '';
        profileToEdit = null;
    });
}



// --- Global View Selectors ---
const homeView = document.getElementById('home-view');
const myListView = document.getElementById('my-list-view');
const searchView = document.getElementById('search-view');
const downloadsView = document.getElementById('downloads-view');
const comingSoonView = document.getElementById('coming-soon-view');
const moreView = document.getElementById('more-view');
const allViews = [homeView, myListView, searchView, downloadsView, comingSoonView, moreView];

// --- Global Nav Selectors ---
const navHome = document.querySelector('#nav-home');
const navSearch = document.querySelector('#nav-search');
const navComingSoon = document.querySelector('#nav-coming-soon');
const navDownloads = document.querySelector('#nav-downloads');
const navMore = document.querySelector('#nav-more');
const navItems = document.querySelectorAll('.bottom-nav .nav-item');

// --- Category & Genre Nav Toggle ---
const navTvShows = document.getElementById('nav-tv-shows');
const navMovies = document.getElementById('nav-movies');
const navMyList = document.getElementById('nav-my-list');
const headerNav = document.querySelector('.header-nav');
const categoryNav = document.querySelector('.category-nav');
const activeCategoryText = document.getElementById('active-category-text');
const nLogos = document.querySelectorAll('.n-logo');

if (navTvShows && navMovies && headerNav && categoryNav && activeCategoryText) {
    const showCategory = (category, viewId = 'home-view') => {
        // Hide all views first
        allViews.forEach(v => {
            if (v) v.classList.add('d-none');
        });

        // Show target view
        const targetView = document.getElementById(viewId);
        if (targetView) targetView.classList.remove('d-none');

        // Toggle Header Nav
        if (viewId === 'home-view') {
            headerNav.classList.add('d-none');
            categoryNav.classList.remove('d-none');
            activeCategoryText.textContent = category;
        }
    };

    navTvShows.addEventListener('click', (e) => {
        e.preventDefault();
        showCategory('TV Shows', 'home-view');
    });

    navMovies.addEventListener('click', (e) => {
        e.preventDefault();
        showCategory('Movies', 'home-view');
    });

    navMyList.addEventListener('click', (e) => {
        e.preventDefault();
        showCategory('My List', 'my-list-view');
    });

    nLogos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            // Reset to Home
            allViews.forEach(v => {
                if (v) v.classList.add('d-none');
            });
            if (homeView) homeView.classList.remove('d-none');
            // Reset Detail header too 
            if (headerNav) headerNav.classList.remove('d-none');
            if (categoryNav) categoryNav.classList.add('d-none');
            window.scrollTo(0, 0);
        });
    });
}

function switchView(viewName) {
    // Hide all views first
    allViews.forEach(v => {
        if (v) v.classList.add('d-none');
    });

    // Reset header states if moving away from home
    if (viewName !== 'home') {
        if (headerNav) headerNav.classList.remove('d-none');
        if (categoryNav) categoryNav.classList.add('d-none');
    }

    // Show target view
    if (viewName === 'home') {
        if (homeView) homeView.classList.remove('d-none');
    } else if (viewName === 'search') {
        if (searchView) {
            searchView.classList.remove('d-none');
            updateSearchResults();
        }
    } else if (viewName === 'coming-soon') {
        if (comingSoonView) {
            comingSoonView.classList.remove('d-none');
            initComingSoon();
        }
    } else if (viewName === 'downloads') {
        if (downloadsView) {
            downloadsView.classList.remove('d-none');
            initDownloads();
        }
    } else if (viewName === 'more') {
        if (moreView) moreView.classList.remove('d-none');
    } else if (viewName === 'my-list') {
        if (myListView) myListView.classList.remove('d-none');
    }

    // Update Active Nav State
    if (navItems) {
        navItems.forEach(item => item.classList.remove('active'));
        if (viewName === 'home') navHome?.classList.add('active');
        if (viewName === 'search') navSearch?.classList.add('active');
        if (viewName === 'coming-soon') navComingSoon?.classList.add('active');
        if (viewName === 'downloads') navDownloads?.classList.add('active');
        if (viewName === 'more') navMore?.classList.add('active');
    }

    window.scrollTo(0, 0);
}

console.log('Netflix Clone Initialized');


// --- Random Search Results Functionality ---

const searchMovies = [
    // Continue Watching
    { title: "Night School", img: "/public/continue/night School.svg" },
    { title: "Christmas", img: "/public/continue/christamas.svg" },
    { title: "Designated Survivor", img: "/public/continue/designated.svg" },
    { title: "The Queen", img: "/public/continue/The Queen.jpg" },

    // Popular
    { title: "Barbarians", img: "/public/Popular/barbarians_hd.png" },
    { title: "Before 30", img: "/public/Popular/before_30_hd.png" },
    { title: "Lucifer", img: "/public/Popular/lucifer_hd.png" },
    { title: "Adam Project", img: "/public/Popular/adam_project_hd.png" },
    { title: "Game of Thrones", img: "/public/Popular/game_thrones_hd.png" },
    { title: "Hubbie Halloween", img: "/public/Popular/hubbie_halloween_hd.png" },
    { title: "Loev", img: "/public/Popular/loev_hd.png" },
    { title: "Love Like the Summer", img: "/public/Popular/love like the.png" },
    { title: "What Happened To Monday", img: "/public/Popular/what happened to monday.png" },
    { title: "Things Heard and Seen", img: "/public/Popular/Things Heard.jpg" },

    // Trending
    { title: "The Last Kingdom", img: "/public/Trending/the last kingdom.png" },
    { title: "Switched", img: "/public/Trending/switched.svg" },
    { title: "Vikings", img: "/public/Trending/viking.png" },
    { title: "Better Call Saul", img: "/public/Trending/better call saul.png" },
    { title: "Burning", img: "/public/Trending/burning.png" },
    { title: "Insidious", img: "/public/Trending/insidious.png" },
    { title: "IO", img: "/public/Trending/io.png" },
    { title: "Passing", img: "/public/Trending/passing.png" },
    { title: "Sas", img: "/public/Trending/sas.png" },
    { title: "You", img: "/public/Trending/you.png" },

    // Nigeria Today
    { title: "FBoy Island", img: "/public/Negeria/f_boy.png" },
    { title: "Mosul", img: "/public/Trending/mosul.png" },
    { title: "Army of the Dead", img: "/public/Negeria/army.png" },
    { title: "Babel", img: "/public/Negeria/babel.png" },
    { title: "Daredevil", img: "/public/Negeria/dare_devil.jpg" },
    { title: "El Hoyo 2", img: "/public/Negeria/el_hoyo_2.jpg" },
    { title: "John Wick", img: "/public/Negeria/john_wick.jpg" },
    { title: "Kate", img: "/public/Negeria/Kate.jpg" },
    { title: "Peaky Blinders", img: "/public/Negeria/Peaky.jpg" },

    // My List
    { title: "Blacklist", img: "/public/my list/blacklist.png" },
    { title: "Resurrection", img: "/public/my list/Resurrection.png" },
    { title: "The Losers", img: "/public/my list/The losers.png" },
    { title: "Rebel Ridge", img: "/public/my list/Bell ridge.jpg" },

    // African
    { title: "African Folktales", img: "/public/African/african_folktales.jpg" },
    { title: "Ayanda", img: "/public/African/ayanda.jpg" },
    { title: "Blood & Water", img: "/public/African/blood_and_water.svg" },
    { title: "Blood Sisters", img: "/public/African/blood_sisters.jpg" },
    { title: "Inkabi", img: "/public/African/Inkabi.png" },
    { title: "Merry Men 2", img: "/public/African/merry_men_2.svg" },
    { title: "The Woman King", img: "/public/African/the_woman_king.jpg" },
    { title: "Waka", img: "/public/African/waka.jpg" },
    { title: "Where Hands Touch", img: "/public/African/where_hands_touch.jpg" },
    { title: "Citation", img: "/public/African/citation.jpg" },
    { title: "Oloture", img: "/public/African/oloture.jpg" },

    // Nollywood
    { title: "Prison Break", img: "/public/Nollywood/prison_break.svg" },
    { title: "Suits", img: "/public/Nollywood/Suits.svg" },
    { title: "Greenleaf", img: "/public/Nollywood/Greenleaf.svg" },
    { title: "Broken Love", img: "/public/Nollywood/broken_love.jpg" },
    { title: "Ewo", img: "/public/Nollywood/Ewo.jpg" },
    { title: "Hijack 93", img: "/public/Nollywood/hijack_93.jpg" },
    { title: "Shanty Town", img: "/public/Nollywood/shanty_town.jpg" },
    { title: "Swallow", img: "/public/Nollywood/swallow.jpg" },
    { title: "The Black Book", img: "/public/Nollywood/the_black_book.jpg" },
    { title: "Two Girls", img: "/public/Nollywood/two_girls.jpg" },

    // Originals
    { title: "Fresh Prince", img: "/public/originals/fresh_prince.png" },
    { title: "Extraction", img: "/public/my list/Extraction.png" },
    { title: "Enola Holmes", img: "/public/originals/enola holmes.jpg" },
    { title: "Glass Onion", img: "/public/originals/glass onion.jpg" },
    { title: "Money Heist", img: "/public/originals/money heist.png" },
    { title: "Maestro", img: "/public/originals/Maestro.jpg" },
    { title: "Kasanova", img: "/public/originals/Kasanova.jpg" },
    { title: "International Assassin", img: "/public/originals/International assassin.jpg" },
    { title: "Rebel Ridge", img: "/public/originals/Bell ridge.jpg" },
    { title: "The School for Good and Evil", img: "/public/originals/school_good_evil_hd.png" },

    // Watch Again
    { title: "Big Bang Theory", img: "/public/watch/big bang theory.jpg" },
    { title: "Ayanda", img: "/public/watch/ayanda.jpg" },
    { title: "Living in Bondage Breaking Free", img: "/public/watch/living on bandage.png" },
    { title: "The Old Guard", img: "/public/watch/the old guard.png" },
    { title: "Queen of South", img: "/public/watch/Queen of south.png" },
    { title: "Bad Boys", img: "/public/watch/Bad Boys.jpg" },
    { title: "Better Call Saul", img: "/public/Trending/better call saul.png" },
    { title: "Burning", img: "/public/watch/Burning.jpg" },
    { title: "Insidious", img: "/public/watch/Insidious.jpg" },
    { title: "African Folktales", img: "/public/watch/African Folktales.jpg" },

    // New Release
    { title: "Locked Up", img: "/public/new release/locked up.png" },
    { title: "Sugar Rush", img: "/public/new release/sugar rush.png" },
    { title: "Rez Ball", img: "/public/new release/Rez ball.jpg" },
    { title: "Troll 2", img: "/public/new release/Troll 2.jpg" },
    { title: "Fast X", img: "/public/new release/fast x.png" },
    { title: "Fast & Furious: Hobbs & Shaw", img: "/public/new release/fast and furious.jpg" },
    { title: "Citation", img: "/public/new release/citation.jpg" },
    { title: "Venom", img: "/public/new release/venom.jpg" },
    { title: "The Equalizer 3", img: "/public/new release/the equilizer 3.jpg" },
    { title: "Bad Boys", img: "/public/new release/Bad Boys.jpg" },

    // TV Thriller
    { title: "Lagos Real Fake Life", img: "/public/tv thriller/Lagos real.png" },
    { title: "The Order", img: "/public/tv thriller/The Order.png" },
    { title: "Gangster Paradise", img: "/public/tv thriller/Gangster Paradise.png" },
    { title: "Behind Her Eyes", img: "/public/tv thriller/Behind her eyes.jpg" },
    { title: "Havoc", img: "/public/tv thriller/Havog.jpg" },
    { title: "The Nurse", img: "/public/tv thriller/The Nurse.jpg" },
    { title: "Oxygen", img: "/public/tv thriller/Tv thriller.jpg" },
    { title: "Carry On", img: "/public/tv thriller/carry on.jpg" },
    { title: "Fair Play", img: "/public/tv thriller/fair play.jpg" },
    { title: "The Platform", img: "/public/tv thriller/the platform.jpg" },

    // US TV
    { title: "La Reina del Sur", img: "/public/us tv/lariena.png" },
    { title: "Raising Dion", img: "/public/us tv/Raising dion.png" },
    { title: "The World of The Married", img: "/public/us tv/the married.png" },
    { title: "The Rookie", img: "/public/us tv/The rookie.jpg" },
    { title: "Dark Winds", img: "/public/us tv/dark winds.jpg" },
    { title: "We Are Your Friends", img: "/public/us tv/friends.jpg" },
    { title: "His and Hers", img: "/public/us tv/his and hers.jpg" },
    { title: "Suits", img: "/public/us tv/suites.jpg" },
    { title: "SWAT", img: "/public/us tv/swat.jpg" },
    { title: "You", img: "/public/Trending/you.png" }
];

const searchResultsList = document.querySelector('.search-results-list');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const searchInput = document.getElementById('search-input');
const voiceSearchBtn = document.getElementById('voice-search-btn');

// --- Movie Metadata & Detail Handling ---
const movieInfoDB = {
    "Lucifer": {
        year: '2016', rating: '18+', genre: ['Crime', 'Fantasy'], hd_img: '/public/Popular/lucifer_hd.png',
        desc: 'Bored with being the Lord of Hell, the devil relocates to Los Angeles, where he opens a nightclub and forms a connection with a homicide detective.'
    },
    "Barbarians": {
        year: '2020', rating: '18+', genre: ['Action', 'History'], hd_img: '/public/Popular/barbarians_hd.png',
        video: '/trailer/bel-air.mp4',
        desc: 'The loyalties of a Roman officer torn between the mighty empire that raised him and his own tribal people are put to the test during an epic historical clash.'
    },
    "Adam Project": {
        year: '2022', rating: '13+', genre: ['Sci-Fi', 'Adventure'], hd_img: '/public/Popular/adam_project_hd.png',
        video: '/trailer/adam-project.mp4',
        desc: 'After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self on a mission to save the future.'
    },
    "Game of Thrones": {
        year: '2011', rating: '18+', genre: ['Fantasy', 'Drama'], hd_img: '/public/Popular/game_thrones_hd.png',
        video: '/trailer/game_of_thrones.mp4',
        desc: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.'
    },
    "Money Heist": {
        year: '2017', rating: '18+', genre: ['Crime', 'Thriller'], hd_img: '/public/originals/money heist.png',
        desc: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.'
    },
    "Hubie Halloween": {
        year: '2020', rating: '13+', genre: ['Comedy', 'Mystery'], hd_img: '/public/Popular/hubbie_halloween_hd.png',
        desc: 'Despite his devotion to his hometown of Salem, Hubie Dubois is a figure of mockery for kids and adults alike. But this year, something really is going bump in the night, and it\'s up to Hubie to save Halloween.'
    },
    "Loev": {
        year: '2015', rating: '18+', genre: ['Romance', 'Drama'], hd_img: '/public/Popular/loev_hd.png',
        desc: 'When Sahil takes his old friend Jai on a road trip to the Western Ghats, their relationship is put to the test as they confront their buried feelings and a shared past.'
    },
    "Love Like the Falling Petals": {
        year: '2022', rating: '13+', genre: ['Romance', 'Drama'], hd_img: '/public/Popular/love like the.png',
        desc: 'An aspiring photographer falls in love with a vibrant hairstylist. Their future seems bright until a twist of fate changes everything, forcing them to cherish every fleeting moment.'
    },
    "What Happened To Monday": {
        year: '2017', rating: '18+', genre: ['Sci-Fi', 'Thriller'], hd_img: '/public/Popular/what happened to monday.png',
        desc: 'In a world with a strict one-child policy, six septuplets must search for their missing sister while staying hidden from the government.'
    },
    "Things Heard and Seen": {
        year: '2021', rating: '18+', genre: ['Horror', 'Mystery'],
        video: '/trailer/',
        desc: 'An artist moves to the Hudson Valley with her husband and begins to suspect that her new home harbors a sinister secret, as well as her marriage.'
    },
    "Fresh Prince": {
        year: '1990', rating: '7+', genre: ['Comedy', 'Sitcom'],
        hd_img: '/public/originals/fresh_prince.png',
        video: '/trailer/bel-air.mp4',
        desc: 'A street-smart teenager from West Philadelphia is sent to live with his wealthy relatives in Bel-Air.'
    },
    "Extraction": {
        year: '2020', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/my list/Extraction.png',
        video: '/trailer/extraction-bruce-willis-kellan-lutz.mp4',
        desc: 'A fearless, black market mercenary embarks on the most deadly mission of his career when he’s enlisted to rescue the kidnapped son of an imprisoned international crime lord.'
    },
    "Peaky Blinders": {
        year: '2013', rating: '18+', genre: ['Crime', 'Drama'],
        hd_img: '/public/Negeria/Peaky.jpg',
        video: '/trailer/peaky-blinders-immortal-man.mp4',
        desc: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.'
    },

    "The Last Kingdom": {
        year: '2015', rating: '18+', genre: ['Action', 'Drama'], hd_img: '/public/Trending/the last kingdom.png',
        video: '/trailer/last-kingdom-seven-kings-must.mp4',
        desc: 'A Saxon warrior raised by Vikings must choose between the people who raised him and the kingdom he was born to rule.'
    },
    "Before 30": {
        year: '2015', rating: '16+', genre: ['Drama', 'Nollywood'], hd_img: '/public/Popular/before_30_hd.png',
        video: '/trailer/before-30.mp4',
        desc: 'Four women living in Lagos are pressured by society and their families to get married before they turn 30.'
    },
    "Switched": {
        year: '2018', rating: '13+', genre: ['Sci-Fi', 'Drama'], hd_img: '/public/Trending/switched.svg',
        video: '/trailer/switched-trailers.mp4',
        desc: 'A socially anxious high school student\'s world is turned upside down when her classmate mysteriously swaps bodies with her.'
    },
    "Vikings": {
        year: '2013', rating: '18+', genre: ['Action', 'History'], hd_img: '/public/Trending/viking.png',
        video: '/trailer/vikings.mp4',
        desc: 'Transport yourself to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore and raid the distant shores across the ocean.'
    },
    "Better Call Saul": {
        year: '2015', rating: '18+', genre: ['Crime', 'Drama'], hd_img: '/public/Trending/better call saul.png',
        video: '/trailer/better-call-saul.mp4',
        desc: 'The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.'
    },
    "Burning": {
        year: '2018', rating: '18+', genre: ['Drama', 'Mystery'], hd_img: '/public/Trending/burning.png',
        video: '/trailer/burning-from-cannes.mp4',
        desc: 'An aspiring writer becomes entangled with a young woman he once knew and her mysterious, wealthy male friend who has a strange secret habit.'
    },
    "Insidious": {
        year: '2010', rating: '16+', genre: ['Horror', 'Mystery'], hd_img: '/public/Trending/insidious.png',
        video: '/trailer/insidious-james-wan.mp4',
        desc: 'A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.'
    },
    "IO": {
        year: '2019', rating: '13+', genre: ['Sci-Fi', 'Adventure'], hd_img: '/public/Trending/io.png',
        video: '/trailer/io.mp4',
        desc: 'As a young scientist searches for a way to save a dying Earth, she finds a connection with a man who\'s racing to catch the last shuttle off the planet.'
    },
    "Passing": {
        year: '2021', rating: '13+', genre: ['Drama', 'Thriller'], hd_img: '/public/Trending/passing.png',
        video: '/trailer/passing.mp4',
        desc: 'Two Black women who can "pass" as white find their lives intertwined in 1920s New York, leading to a complex exploration of identity and sisterhood.'
    },
    "Sas": {
        year: '2021', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/Trending/sas.png',
        video: '/trailer/sas-red-notice-feature-length.mp4',
        desc: 'A special forces operative is caught in a high-stakes hostage situation on a train in the Channel Tunnel.'
    },
    "You": {
        year: '2018', rating: '18+', genre: ['Crime', 'Drama'], hd_img: '/public/Trending/you.png',
        video: '/trailer/you.mp4',
        desc: 'A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is fascinated by.'
    },
    // African Movies
    "African Folktales": {
        year: '2023', rating: '7+', genre: ['Anthology', 'Culture'], hd_img: '/public/African/african_folktales.jpg',
        video: '/trailer/african-folktales-reimagined-unesco.mp4',
        desc: 'A collection of reimagined African folktales from across the continent, bringing oral traditions to life with modern cinematic storytelling.'
    },
    "Ayanda": {
        year: '2015', rating: '13+', genre: ['Drama', 'Romance'], hd_img: '/public/African/ayanda.jpg',
        video: '/trailer/ayanda-jafta-mamabolo-fulu-moguvhani.mp4',
        desc: 'After her father dies, a young woman struggles to keep his vintage car restoration business alive in the vibrant streets of Yeoville, Johannesburg.'
    },
    "Blood & Water": {
        year: '2020', rating: '16+', genre: ['Drama', 'Mystery'], hd_img: '/public/African/blood_and_water.svg',
        video: '/trailer/blood-water.mp4',
        desc: 'A local teen uncovers her family\'s secret past and navigates the complicated world of a South African high school while searching for her long-lost sister.'
    },
    "Blood Sisters": {
        year: '2022', rating: '18+', genre: ['Thriller', 'Crime'], hd_img: '/public/African/blood_sisters.jpg',
        video: '/trailer/blood-sisters.mp4',
        desc: 'Bound by a dangerous secret, best friends Sarah and Kemi are forced to go on the run after a wealthy groom disappears during his engagement party.'
    },
    "Inkabi": {
        year: '2024', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/African/Inkabi.png',
        video: '/trailer/inkabi.mp4',
        desc: 'A retired hitman is pulled back into the underworld to protect a young woman who witnessed a brutal crime.'
    },
    "Merry Men 2": {
        year: '2019', rating: '16+', genre: ['Action', 'Comedy'], hd_img: '/public/African/merry_men_2.svg',
        video: '/trailer/merry-men-starring-ay-comedian.mp4',
        desc: 'The Merry Men are back and this time they are up against a powerful foe who threatens their families and their way of life.'
    },
    "The Woman King": {
        year: '2022', rating: '16+', genre: ['Action', 'History'], hd_img: '/public/African/the_woman_king.jpg',
        video: '/trailer/woman-king.mp4',
        desc: 'A historical epic inspired by the true events of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey with skills and a fierceness unlike anything the world has ever seen.'
    },
    "Waka": {
        year: '2021', rating: '13+', genre: ['Drama', 'Adventure'], hd_img: '/public/African/waka.jpg',
        video: '/trailer/waka-waka.mp4',
        desc: 'A poignant story of survival and hope as a young man embarks on a journey across borders to find a better life for his family.'
    },
    "Where Hands Touch": {
        year: '2018', rating: '16+', genre: ['Drama', 'War'], hd_img: '/public/African/where_hands_touch.jpg',
        video: '/trailer/where-hands-touch-vertical-entertainment.mp4',
        desc: 'In Nazi Germany, a biracial girl and a member of the Hitler Youth form an unlikely bond, testing their loyalties in a world torn apart by hate.'
    },
    // Nigeria Today Movies
    "FBoy Island": {
        year: '2021', rating: '18+', genre: ['Reality', 'Romance'], hd_img: '/public/Negeria/f_boy.png',
        video: '/trailer/fboy-island-australia-binge.mp4',
        desc: 'Three women move to a tropical island where they\'re joined by 24 men - 12 self-proclaimed "Nice Guys" looking for love, and 12 self-proclaimed "FBoys," there to compete for cold, hard cash.'
    },
    "Mosul": {
        year: '2020', rating: '18+', genre: ['Action', 'War'], hd_img: '/public/Trending/mosul.png',
        video: '/trailer/hijack-93-playing.mp4',
        desc: 'After being rescued by a renegade Iraqi SWAT team, a young police officer joins them in their fight against ISIS in the decimated city of Mosul.'
    },
    "Army of the Dead": {
        year: '2021', rating: '18+', genre: ['Action', 'Horror'], hd_img: '/public/Negeria/army.png',
        video: '/trailer/army-dead-dave-bautista-zack.mp4',
        desc: 'Following a zombie outbreak in Las Vegas, a group of mercenaries takes the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist ever attempted.'
    },
    "Babel": {
        year: '2006', rating: '18+', genre: ['Drama', 'Thriller'], hd_img: '/public/Negeria/babel.png',
        video: '/trailer/babel-tráiler.mp4',
        desc: 'Tragedy strikes a married couple on vacation in the Moroccan desert, touching off an interlocking story involving four different families.'
    },
    "Daredevil": {
        year: '2015', rating: '18+', genre: ['Action', 'Crime'], hd_img: '/public/Negeria/dare_devil.jpg',
        video: '/trailer/marvel-daredevil.mp4',
        desc: 'A blind lawyer by day, vigilante by night. Matt Murdock fights the crime of Hell\'s Kitchen, New York City, as Daredevil.'
    },
    "El Hoyo 2": {
        year: '2024', rating: '18+', genre: ['Sci-Fi', 'Thriller'], hd_img: '/public/Negeria/el_hoyo_2.jpg',
        video: '/trailer/el-hoyo-trailers-movies-movies.mp4',
        desc: 'A mysterious place, an indescribable prison, a deep hole. Two inmates living on each level. A descending platform containing food and a primitive survival fight.'
    },
    "John Wick": {
        year: '2014', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/Negeria/john_wick.jpg',
        video: '/trailer/john-wick-keanu-reeves-willem.mp4',
        desc: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.'
    },
    "Kate": {
        year: '2021', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/Negeria/Kate.jpg',
        video: '/trailer/kate-entering-building-style.mp4',
        desc: 'A criminal operative has less than 24 hours to exact revenge on her enemies and in the process forms an unexpected bond with the daughter of one of her past victims.'
    },
    // New Releases
    "Locked Up": {
        year: '2017', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/new release/locked up.png',
        video: '/trailer/locked-up-catch-up-all.mp4',
        desc: 'A group of female prisoners fight for survival and justice in a high-security prison where the guards are as dangerous as the inmates.'
    },
    "Sugar Rush": {
        year: '2019', rating: '13+', genre: ['Action', 'Comedy'], hd_img: '/public/new release/sugar rush.png',
        video: '/trailer/sugar-rush.mp4',
        desc: 'Three sisters accidentally kill a dangerous crime boss and must find a way to escape the consequences while navigating the chaotic world of Lagos.'
    },
    "Rez Ball": {
        year: '2024', rating: '13+', genre: ['Drama', 'Sport'], hd_img: '/public/new release/Rez ball.jpg',
        video: '/trailer/rez-ball.mp4',
        desc: 'A Native American high school basketball team must band together after losing their star player in order to keep their state championship dreams alive.'
    },
    "Troll 2": {
        year: '2022', rating: '13+', genre: ['Action', 'Adventure'], hd_img: '/public/new release/Troll 2.jpg',
        video: '/trailer/troll.mp4',
        desc: 'Deep inside the mountain of Dovre, something gigantic awakens after being trapped for a thousand years.'
    },
    "Fast X": {
        year: '2023', rating: '13+', genre: ['Action', 'Adventure'], hd_img: '/public/new release/fast x.png',
        video: '/trailer/fast-x.mp4',
        desc: 'Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.'
    },
    "Fast & Furious: Hobbs & Shaw": {
        year: '2019', rating: '13+', genre: ['Action', 'Comedy'], hd_img: '/public/new release/fast and furious.jpg',
        video: '/trailer/fast-furious-presents-hobbs-shaw.mp4',
        desc: 'Lawman Luke Hobbs and outcast Deckard Shaw form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.'
    },
    "Citation": {
        year: '2020', rating: '13+', genre: ['Drama', 'Thriller'], hd_img: '/public/new release/citation.jpg',
        video: '/trailer/citation.mp4',
        desc: 'A bright student in Nigeria takes on the academic establishment when she reports a popular professor for attempted rape.'
    },
    "Venom": {
        year: '2018', rating: '13+', genre: ['Action', 'Sci-Fi'], hd_img: '/public/new release/venom.jpg',
        video: '/trailer/venom-last-dance.mp4',
        desc: 'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the entity takes a liking to Earth and decides to protect it.'
    },
    "The Equalizer 3": {
        year: '2023', rating: '18+', genre: ['Action', 'Crime'], hd_img: '/public/new release/the equilizer 3.jpg',
        video: '/trailer/equalizer-only-cinemas.mp4',
        desc: 'Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses.'
    },
    "Bad Boys": {
        year: '1995', rating: '18+', genre: ['Action', 'Comedy'], hd_img: '/public/new release/Bad Boys.jpg',
        video: '/trailer/bad-boys-ride-or-die.mp4',
        desc: 'Two hip detectives protect a witness to a murder while investigating a case of stolen heroin from the evidence storage room from their police precinct.'
    },
    // Nollywood Movies
    "Prison Break": {
        year: '2005', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/Nollywood/prison_break.svg',
        video: '/trailer/prison-break.mp4',
        desc: 'An innocent man is sent to death row due to a political conspiracy. His only hope is his brother, who makes it his mission to get deliberately sent to the same prison in order to break them both out from the inside.'
    },
    "Suits": {
        year: '2011', rating: '16+', genre: ['Drama', 'Comedy'], hd_img: '/public/Nollywood/Suits.svg',
        video: '/trailer/suits.mp4',
        desc: 'Mike Ross, a talented young college dropout, is hired as an associate by Harvey Specter, one of New York\'s best lawyers. They must handle cases while keeping Mike\'s lack of a law degree a secret.'
    },
    "Greenleaf": {
        year: '2016', rating: '16+', genre: ['Drama', 'Mystery'], hd_img: '/public/Nollywood/Greenleaf.svg',
        video: '/trailer/greenleaf.mp4',
        desc: 'The Greenleaf family, which runs a Memphis megachurch, appears to be a loving and holy family, but beneath the surface lies a world of deceit, greed, and adultery.'
    },
    "Broken Love": {
        year: '2020', rating: '13+', genre: ['Romance', 'Drama'], hd_img: '/public/Nollywood/broken_love.jpg',
        video: '/trailer/broken-love-หัวใจช้ำรัก.mp4',
        desc: 'When a perfect marriage is shattered by betrayal, a young woman must find the strength to pick up the pieces and rediscover her own worth.'
    },
    "Ewo": {
        year: '2024', rating: '18+', genre: ['Thriller', 'Drama'], hd_img: '/public/Nollywood/Ewo.jpg',
        video: '/trailer/ewo-bimbo-ademoye-ogogo-yinka.mp4',
        desc: 'A tense psychological thriller that explores the consequences of family secrets and the lengths one will go to protect their legacy.'
    },
    "Hijack 93": {
        year: '2024', rating: '16+', genre: ['Action', 'History'], hd_img: '/public/Nollywood/hijack_93.jpg',
        video: '/trailer/hijack-93-playing.mp4',
        desc: 'Inspired by true events: four young men hijack a Nigerian Airways plane in 1993 to demand the restoration of democracy in Nigeria.'
    },
    "Shanty Town": {
        year: '2023', rating: '18+', genre: ['Crime', 'Thriller'], hd_img: '/public/Nollywood/shanty_town.jpg',
        video: '/trailer/shanty-town.mp4',
        desc: 'A group of courtesans attempts to escape the clutches of a notorious kingpin, but political corruption and blood ties make freedom a near-impossible goal.'
    },
    "Swallow": {
        year: '2021', rating: '16+', genre: ['Drama', 'Thriller'], hd_img: '/public/Nollywood/swallow.jpg',
        video: '/trailer/swallow.mp4',
        desc: 'In 1980s Lagos, a struggling secretary considers a dangerous career move when her friend entices her into the local drug-smuggling scene.'
    },
    "The Black Book": {
        year: '2023', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/Nollywood/the_black_book.jpg',
        video: '/trailer/black-book-coming-september-22.mp4',
        desc: 'After his son is framed for a kidnapping, a bereaved deacon takes justice into his own hands and fights a corrupt police gang to absolve him.'
    },
    "Two Girls": {
        year: '1997', rating: '13+', genre: ['Comedy', 'Romance'], hd_img: '/public/Nollywood/two_girls.jpg',
        video: '/trailer/we-are-your-friends.mp4',
        desc: 'A charming story about youth, ambition, and the complications of teenage romance in a changing world.'
    },
    // Netflix Originals
    "Fresh Prince": {
        year: '2022', rating: '16+', genre: ['Drama', 'Original'], hd_img: '/public/originals/fresh_prince.png',
        video: '/trailer/bel-air.mp4',
        desc: 'A serialized reimagining of the classic 90s sitcom "The Fresh Prince of Bel-Air" set in modern-day America.'
    },
    "Enola Holmes": {
        year: '2020', rating: '13+', genre: ['Adventure', 'Mystery'], hd_img: '/public/originals/enola holmes.jpg',
        video: '/trailer/enola-holmes.mp4',
        desc: 'While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.'
    },
    "Extraction": {
        year: '2020', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/my list/Extraction.png',
        video: '/trailer/extraction-bruce-willis-kellan-lutz.mp4',
        desc: 'A fearless, black market mercenary embarks on the most deadly mission of his career when he’s enlisted to rescue the kidnapped son of an imprisoned international crime lord.'
    },
    "Glass Onion": {
        year: '2022', rating: '13+', genre: ['Mystery', 'Comedy'], hd_img: '/public/originals/glass onion.jpg',
        video: '/trailer/glass-onion-knives-out-mystery.mp4',
        desc: 'Famed southern detective Benoit Blanc travels to Greece for his latest case, surrounded by a new cast of colorful suspects.'
    },

    "Money Heist": {
        year: '2017', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/originals/money heist.png',
        video: '/trailer/money-heist.mp4',
        desc: 'A group of robbers attempts to carry out the most ambitious heist in Spanish history.'
    },
    "Maestro": {
        year: '2023', rating: '16+', genre: ['Biography', 'Drama'], hd_img: '/public/originals/Maestro.jpg',
        video: '/trailer/maestro.mp4',
        desc: 'This fearless love story chronicles the complicated lifelong relationship between music legend Leonard Bernstein and Felicia Montealegre Cohn Bernstein.'
    },
    "Kasanova": {
        year: '2019', rating: '13+', genre: ['Romance', 'Comedy'], hd_img: '/public/originals/Kasanova.jpg',
        video: '/trailer/casanova.mp4',
        desc: 'A single father falls in love with his son’s teacher, but their blooming romance is complicated by past secrets and family ties.'
    },
    "International Assassin": {
        year: '2016', rating: '13+', genre: ['Action', 'Comedy'], hd_img: '/public/originals/International assassin.jpg',
        video: '/trailer/true-memoirs-international-assassin.mp4',
        desc: 'After a publisher changes a writer’s debut novel about a deadly assassin from fiction to nonfiction, the author finds himself thrust into the world of his lead character.'
    },
    "Rebel Ridge": {
        year: '2024', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/originals/Bell ridge.jpg',
        video: '/trailer/rebel-ridge.mp4',
        desc: 'A former Marine confronts corruption in a small town when local law enforcement unjustly seizes the bag of cash he needs to post his cousin\'s bail.'
    },
    "The School for Good and Evil": {
        year: '2022', rating: '13+', genre: ['Fantasy', 'Action'], hd_img: '/public/originals/school_good_evil_hd.png',
        video: '/trailer/school-good-evil-first.mp4',
        desc: 'Best friends Sophie and Agatha find themselves on opposing sides of an epic battle when they\'re swept away into an enchanted school where aspiring heroes and villains are trained to protect the balance between Good and Evil.'
    },
    // TV Thriller & Mysteries
    "Lagos Real Fake Life": {
        year: '2018', rating: '13+', genre: ['Comedy', 'Thriller'], hd_img: '/public/tv thriller/Lagos real.png',
        video: '/trailer/lagos-real-life-fake-life.mp4',
        desc: 'Two friends living in Lagos fake a wealthy lifestyle on social media to impress people, which leads to various hilarious and thrilling consequences.'
    },
    "The Order": {
        year: '2019', rating: '18+', genre: ['Drama', 'Fantasy'], hd_img: '/public/tv thriller/The Order.png',
        video: '/trailer/order.mp4',
        desc: 'Out to avenge his mother\'s death, a college student pledges to a secret order and lands in a war between werewolves and practitioners of dark magic.'
    },
    "Gangster Paradise": {
        year: '2008', rating: '18+', genre: ['Action', 'Crime'], hd_img: '/public/tv thriller/Gangster Paradise.png',
        video: '/trailer/gangster-paradise-jerusalema.mp4',
        desc: 'A story of hope, corruption and survival in the new South Africa. A young man from Soweto starts as a petty criminal and climbs the ladder to become a powerful crime lord.'
    },
    "Behind Her Eyes": {
        year: '2021', rating: '18+', genre: ['Mystery', 'Thriller'], hd_img: '/public/tv thriller/Behind her eyes.jpg',
        video: '/trailer/behind-her-eyes-max.mp4',
        desc: 'A single mother enters a world of twisted mind games when she begins an affair with her psychiatrist boss while secretly befriending his mysterious wife.'
    },
    "Havoc": {
        year: '2023', rating: '18+', genre: ['Action', 'Thriller'], hd_img: '/public/tv thriller/Havog.jpg',
        video: '/trailer/havoc.mp4',
        desc: 'After a drug deal gone wrong, a bruised detective must fight his way through a criminal underworld to rescue a politician\'s estranged son.'
    },
    "The Nurse": {
        year: '2023', rating: '16+', genre: ['Crime', 'Biography'], hd_img: '/public/tv thriller/The Nurse.jpg',
        video: '/trailer/nurse.mp4',
        desc: 'A new nurse at a hospital begins to suspect her colleague\'s desire for attention might be tied to a series of patient deaths.'
    },
    "Oxygen": {
        year: '2021', rating: '13+', genre: ['Sci-Fi', 'Thriller'], hd_img: '/public/tv thriller/Tv thriller.jpg',
        video: '/trailer/oxygen.mp4',
        desc: 'A woman wakes up in a cryogenic chamber with no recollection of how she got there. As she runs out of oxygen, she must rebuild her memory to find a way out.'
    },
    "Carry On": {
        year: '2024', rating: '13+', genre: ['Action', 'Thriller'], hd_img: '/public/tv thriller/carry on.jpg',
        video: '/trailer/carry.mp4',
        desc: 'A young TSA agent fights to outsmart a mysterious traveler who blackmails him into letting a dangerous package onto a Christmas Eve flight.'
    },
    "Fair Play": {
        year: '2023', rating: '18+', genre: ['Drama', 'Thriller'], hd_img: '/public/tv thriller/fair play.jpg',
        video: '/trailer/fair-play.mp4',
        desc: 'An unexpected promotion at a cutthroat hedge fund pushes a young couple\'s relationship to the brink, threatening to unravel far more than their recent engagement.'
    },
    "The Platform": {
        year: '2019', rating: '18+', genre: ['Sci-Fi', 'Thriller'], hd_img: '/public/tv thriller/the platform.jpg',
        video: '/trailer/platform-sci-fi-thriller.mp4',
        desc: 'A vertical prison with one cell per level. Two people per cell. One only food platform and two minutes per day to feed. An endless nightmare trapped in The Hole.'
    },
    // US TV Shows
    "La Reina del Sur": {
        year: '2011', rating: '16+', genre: ['Crime', 'Drama'], hd_img: '/public/us tv/lariena.png',
        video: '/trailer/la-reina-del-sur-telemundo.mp4',
        desc: 'After years on the run, Teresa Mendoza is forced to return to Mexico to face the past and reclaim her throne as the world\'s most powerful drug trafficker.'
    },
    "Raising Dion": {
        year: '2019', rating: '13+', genre: ['Action', 'Sci-Fi'], hd_img: '/public/us tv/Raising dion.png',
        video: '/trailer/raising-dion.mp4',
        desc: 'A widowed mother must hide her young son\'s superpowers while investigating their origins and her husband\'s death.'
    },
    "The World of The Married": {
        year: '2020', rating: '18+', genre: ['Drama', 'Romance'], hd_img: '/public/us tv/the married.png',
        video: '/trailer/world-married-iflix.mp4',
        desc: 'A story about a married couple whose betrayal of each other leads to a whirlwind of revenge, grief, and healing.'
    },
    "The Rookie": {
        year: '2018', rating: '13+', genre: ['Crime', 'Drama'], hd_img: '/public/us tv/The rookie.jpg',
        video: '/trailer/rookie-nathan-fillion.mp4',
        desc: 'Starting over isn\'t easy, especially for small-town guy John Nolan who, after a life-altering incident, is pursuing his dream of being an LAPD officer.'
    },
    "Dark Winds": {
        year: '2022', rating: '18+', genre: ['Drama', 'Thriller'], hd_img: '/public/us tv/dark winds.jpg',
        video: '/trailer/dark-winds-premieres-july-30.mp4',
        desc: 'Follows Leaphorn and Chee, two Navajo police officers in the 1970s Southwest who are forced to challenge their own spiritual beliefs when they search for clues in a double murder case.'
    },
    "We Are Your Friends": {
        year: '2015', rating: '16+', genre: ['Drama', 'Music'], hd_img: '/public/us tv/friends.jpg',
        video: '/trailer/we-are-your-friends.mp4',
        desc: 'An aspiring DJ tries to find the one track that will set the world on fire, while navigating his relationships and his future in the Los Angeles electronic music scene.'
    },
    "His and Hers": {
        year: '2024', rating: '18+', genre: ['Thriller', 'Drama'], hd_img: '/public/us tv/his and hers.jpg',
        video: '/trailer/his-hers.mp4',
        desc: 'A gripping psychological thriller that explored the dark secrets hidden within a seemingly perfect marriage, told through two conflicting perspectives.'
    },
    "SWAT": {
        year: '2017', rating: '16+', genre: ['Action', 'Crime'], hd_img: '/public/us tv/swat.jpg',
        video: '/trailer/fox8.mp4',
        desc: 'A S.W.A.T. sergeant is tasked to run a specialized tactical unit that is the last stop in law enforcement in Los Angeles.'
    },
    "You": {
        year: '2018', rating: '18+', genre: ['Crime', 'Drama'], hd_img: '/public/Trending/you.png',
        video: '/trailer/you.mp4',
        desc: 'A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is fascinated by.'
    },
    // Watch Again Movies
    "Big Bang Theory": {
        year: '2007', rating: '12+', genre: ['Comedy', 'Sitcom'], hd_img: '/public/watch/big bang theory.jpg',
        video: '/trailer/big-bang-theory-tv-show.mp4',
        desc: 'Mensa-fied best friends and roommates Leonard and Sheldon find their lives complicated when a beautiful aspiring actress from Omaha, Penny, moves in next door.'
    },
    "Living in Bondage Breaking Free": {
        year: '2019', rating: '18+', genre: ['Drama', 'Thriller'], hd_img: '/public/watch/living on bandage.png',
        video: '/trailer/living-bondage.mp4',
        desc: 'A young man joins a mysterious club in order to satisfy his hunger for wealth and power, only to find himself trapped in a dangerous spiritual contract.'
    },
    "The Old Guard": {
        year: '2020', rating: '18+', genre: ['Action', 'Fantasy'], hd_img: '/public/watch/the old guard.png',
        video: '/trailer/old-guard.mp4',
        desc: 'A covert team of immortal mercenaries is suddenly exposed and must now fight to keep their identity a secret just as an unexpected new member is discovered.'
    },
    "Queen of South": {
        year: '2016', rating: '18+', genre: ['Crime', 'Drama'], hd_img: '/public/watch/Queen of south.png',
        video: '/trailer/queen-south.mp4',
        desc: 'Teresa Mendoza flees Mexico after her drug-runner boyfriend is murdered. Settling in Dallas, she looks to become the country\'s reigning drug smuggler and to avenge her lover\'s murder.'
    },
    "Better Call Saul": {
        year: '2015', rating: '18+', genre: ['Crime', 'Drama'], hd_img: '/public/Trending/better call saul.png',
        video: '/trailer/better-call-saul.mp4',
        desc: 'The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.'
    },
    // My List Titles
    "Blacklist": {
        year: '2013', rating: '18+', genre: ['Crime', 'Drama'], hd_img: '/public/my list/blacklist.png',
        video: '/trailer/blacklist-10.mp4',
        desc: 'A high-profile criminal, who has eluded capture for decades, turns himself in and offers to help the FBI track down other dangerous criminals on his "blacklist" on the condition that he works with a specific rookie profiler.'
    },
    "Resurrection": {
        year: '2022', rating: '18+', genre: ['Horror', 'Thriller'], hd_img: '/public/my list/Resurrection.png',
        video: '/trailer/resurrection.mp4',
        desc: 'Margaret’s life is in order. She is capable, disciplined, and successful. Everything is under control. That is, until David is back, carrying with him the horrors of Margaret’s past.'
    },
    "The Losers": {
        year: '2010', rating: '18+', genre: ['Action', 'Adventure'], hd_img: '/public/my list/The losers.png',
        video: '/trailer/losers.mp4',
        desc: 'A CIA special forces team is betrayed and left for dead by their handler. They band together to exact revenge on the man responsable and clear their names.'
    }
};

// Peaky Blinders video update
movieInfoDB["Peaky Blinders"].video = '/trailer/peaky-blinders-immortal-man.mp4';

// Update existing entries with videos
movieInfoDB["Lucifer"].video = '/trailer/lucifer.mp4';
movieInfoDB["Barbarians"].video = '/trailer/barbarians.mp4';
movieInfoDB["Adam Project"].video = '/trailer/adam-project.mp4';
movieInfoDB["Game of Thrones"].video = '/trailer/game-thrones.mp4';
movieInfoDB["Hubie Halloween"].video = '/trailer/hubie-halloween-adam-sandler-kevin.mp4';
movieInfoDB["Loev"].video = '/trailer/loev.mp4';
movieInfoDB["Love Like the Falling Petals"].video = '/trailer/love-like-falling-petals-ทีเซอร์.mp4';
movieInfoDB["What Happened To Monday"].video = '/trailer/what-happened-monday.mp4';
movieInfoDB["Things Heard and Seen"].video = '/trailer/things-heard-seen-starring-amanda.mp4';

let currentOpenedMovie = null;

function openMovieDetails(movie) {
    currentOpenedMovie = movie;
    const modal = document.getElementById('movie-details-modal');
    if (!modal) return;

    // Check our database first
    const dbInfo = movieInfoDB[movie.title];

    // Use HD image if available, otherwise fallback to the poster
    document.getElementById('modal-backdrop').src = (dbInfo && dbInfo.hd_img) ? dbInfo.hd_img : movie.img;
    document.getElementById('modal-title').textContent = movie.title;

    // Set Metadata
    document.getElementById('modal-year').textContent = dbInfo ? dbInfo.year : (movie.year || '2024');
    document.getElementById('modal-rating').textContent = dbInfo ? dbInfo.rating : (movie.rating || 'A');
    document.getElementById('modal-type').textContent = movie.type || 'Movie';

    // Set Description
    const fallbackDesc = `Experience the thrilling story of ${movie.title}, where unexpected turns and dramatic events keep you on the edge of your seat. A must-watch masterpiece.`;
    document.getElementById('modal-description').textContent = dbInfo ? dbInfo.desc : (movie.description || fallbackDesc);

    // Set Genres
    const defaultGenres = ['Drama', 'Action', 'Thriller', 'Original'];
    const g1 = dbInfo ? dbInfo.genre[0] : (movie.genre1 || defaultGenres[Math.floor(Math.random() * 2)]);
    const g2 = dbInfo ? dbInfo.genre[1] : (movie.genre2 || defaultGenres[Math.floor(Math.random() * 2) + 2]);

    document.getElementById('modal-genre1').textContent = g1;
    document.getElementById('modal-genre2').textContent = g2;

    modal.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

const closeModalBtn = document.getElementById('close-movie-modal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('movie-details-modal');
        if (modal) modal.classList.add('d-none');
        document.body.style.overflow = '';
    });
}

// --- Handle Movie Modal Actions ---
const modalDownloadBtn = document.getElementById('modal-download-btn');
if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener('click', () => {
        if (currentOpenedMovie) {
            const dbInfo = movieInfoDB[currentOpenedMovie.title];
            const success = addMovieToDownloads(currentOpenedMovie, dbInfo);
            if (success) {
                const icon = modalDownloadBtn.querySelector('i');
                const text = modalDownloadBtn.querySelector('span');
                if (icon) icon.className = 'bi bi-check-lg';
                if (text) text.textContent = 'Downloaded';

                setTimeout(() => {
                    if (icon) icon.className = 'bi bi-download';
                    if (text) text.textContent = 'Download';
                }, 2000);
            }
        }
    });
}

function updateSearchResults(query = '') {
    if (!searchResultsList) return;

    let filteredMovies = [];
    const searchTitle = document.querySelector('.search-title');

    if (query.trim() === '') {
        // Show random popular searches
        const shuffled = shuffleArray([...searchMovies]);
        filteredMovies = shuffled.slice(0, 10);
        if (searchTitle) searchTitle.textContent = 'Top Searches';
    } else {
        // Filter based on query
        filteredMovies = searchMovies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        if (searchTitle) {
            searchTitle.textContent = filteredMovies.length > 0 ? `Results for "${query}"` : 'No results found';
        }
    }

    if (filteredMovies.length === 0 && query.trim() !== '') {
        const template = document.getElementById('search-no-results-template');
        if (template) {
            const clone = template.content.cloneNode(true);
            searchResultsList.appendChild(clone);
        }
        return;
    }

    searchResultsList.replaceChildren();

    const itemTemplate = document.getElementById('search-item-template');
    if (!itemTemplate) return;

    filteredMovies.forEach(movie => {
        const clone = itemTemplate.content.cloneNode(true);
        const item = clone.querySelector('.search-item');

        const img = item.querySelector('img');
        const title = item.querySelector('.search-item-title');

        if (img) {
            img.src = movie.img;
            img.alt = movie.title;
        }
        if (title) title.textContent = movie.title;

        item.addEventListener('click', () => openMovieDetails(movie));
        searchResultsList.appendChild(item);
    });
}

// Global listener for ANY item that looks like a movie poster or info button
document.addEventListener('click', (e) => {
    // 1. Handle clicks on movie items (posters) and their containers
    const itemContainer = e.target.closest('.slider-item, .preview-item, .grid-item, .movie-item, .movie-poster');

    // Ensure we aren't clicking an info button or action button (which have their own logic or shouldn't trigger this)
    if (itemContainer && !e.target.classList.contains('bi-info-circle') && !e.target.closest('.action-btn')) {
        const img = itemContainer.querySelector('img');
        if (img) {
            const title = img.alt || 'Unknown Movie';
            const src = img.src;
            const movie = searchMovies.find(m => m.title === title) || { title, img: src };
            openMovieDetails(movie);
            return;
        }
    }

    // 2. Handle Info Icon clicks
    if (e.target.classList.contains('bi-info-circle')) {
        // Expanded to include preview-item and other containers
        const movieItem = e.target.closest('.preview-item, .movie-item, .action-btn');
        if (movieItem) {
            const img = movieItem.querySelector('img');
            const title = img ? img.alt : 'Unknown Movie';
            const src = img ? img.src : '';
            const movie = searchMovies.find(m => m.title === title) || { title, img: src };
            openMovieDetails(movie);
        }
    }
});

// Voice Search Logic
if (voiceSearchBtn && searchInput) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    // Helper for voice search
    const handleVoiceSearch = (transcript) => {
        // Sanitize: remove trailing dots/punctuation common in speech-to-text
        const query = transcript.replace(/[.,!?]+$/g, '').trim();

        searchInput.value = query;
        voiceSearchBtn.classList.remove('listening');

        const lowerQuery = query.toLowerCase();

        // 1. Try Exact Match
        const exactMatch = searchMovies.find(m => m.title.toLowerCase() === lowerQuery);

        if (exactMatch) {
            openMovieDetails(exactMatch);
        }

        // 2. Always update the list (Visual confirmation + Fallback for partials)
        // This ensures "School for Good and Evil" still shows "The School..."
        updateSearchResults(query);
    };

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            voiceSearchBtn.classList.add('listening');
            searchInput.placeholder = "Listening...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleVoiceSearch(transcript);
        };

        recognition.onend = () => {
            voiceSearchBtn.classList.remove('listening');
            searchInput.placeholder = "Search for a show, movie, genre, e.t.c.";
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            voiceSearchBtn.classList.remove('listening');
            searchInput.placeholder = "Search for a show, movie, genre, e.t.c.";

            if (event.error === 'no-speech') {
                // Fallback to manual input if mic fails to pick up audio
                const manualInput = prompt('No speech detected. Please type your command here:');
                if (manualInput) {
                    handleVoiceSearch(manualInput);
                }
            } else if (event.error === 'not-allowed') {
                alert('Microphone permission was denied. Please allow access in browser settings.');
            } else if (event.error === 'network') {
                alert('Network error. Voice search requires an internet connection.');
            } else {
                alert('Voice search error: ' + event.error);
            }
        };
    }

    // Always attach click listener
    voiceSearchBtn.addEventListener('click', () => {
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.log('Recognition already started');
            }
        } else {
            // Fallback for unsupported browsers
            const simulatedText = prompt("Voice search is not supported in this browser. Please type your search:");
            if (simulatedText) {
                handleVoiceSearch(simulatedText);
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        updateSearchResults(e.target.value);
    });
}

// Initial update
updateSearchResults();


// View Switching Logic (Bottom Nav Wire-up)

if (navHome) {
    navHome.addEventListener('click', () => switchView('home'));
}

if (navSearch) {
    navSearch.addEventListener('click', () => switchView('search'));
}

if (navComingSoon) {
    navComingSoon.addEventListener('click', () => switchView('coming-soon'));
}

if (navDownloads) {
    navDownloads.addEventListener('click', () => switchView('downloads'));
}

if (navMore) {
    navMore.addEventListener('click', () => switchView('more'));
}

console.log('Navigation Initialized');


// --- Hero Banner Slider ---
const sliderItems = document.querySelectorAll('.slider-item');
const heroRankText = document.querySelector('#hero-rank');
const heroBadge = document.querySelector('#hero-badge');

let currentSlide = 0;
const slideData = [
    { rank: "#2 in Nigeria Today", video: "/trailer/spartacus-war-damned-starz.mp4" },
    { rank: "#1 in Movies Today", video: "/trailer/extraction-bruce-willis-kellan-lutz.mp4" },
    { rank: "#5 in Nigeria Today", video: "/trailer/money-heist.mp4" },
    { rank: "#3 in TV Shows Today", video: "/trailer/school-good-evil-first.mp4" },
    { rank: "#1 in Nigeria Today", video: "/trailer/fast-x.mp4" },
    { rank: "#4 in Movies Today", video: "/trailer/bel-air.mp4" },
    { rank: "#10 in Nigeria Today", video: "/trailer/enola-holmes.mp4" }
];

function nextSlide() {
    // Remove active class from current slide
    sliderItems[currentSlide].classList.remove('active');

    // Increment index
    currentSlide = (currentSlide + 1) % sliderItems.length;

    // Add active class to new slide
    sliderItems[currentSlide].classList.add('active');

    // Update Rank with a small animation
    if (heroRankText) {
        heroRankText.style.opacity = '0';
        setTimeout(() => {
            heroRankText.textContent = slideData[currentSlide].rank;
            heroRankText.style.opacity = '1';
        }, 300);
    }
}

// Start automatic transition every 3 seconds
if (sliderItems.length > 0) {
    setInterval(nextSlide, 3000);
}

// --- Video Player Functionality ---
const playButton = document.querySelector('.play-btn');
const videoPlayerView = document.querySelector('#video-player-view');
const mainVideo = document.querySelector('#main-video');
const closePlayer = document.querySelector('.close-player');
const playerPlayBtn = document.querySelector('.play-pause-btn');
const playerPlayIcon = document.querySelector('#player-play-icon');
const backwardBtn = document.querySelector('.backward-10');
const forwardBtn = document.querySelector('.forward-10');
const playerProgress = document.querySelector('.player-progress');
const timeDisplay = document.querySelector('.time-display');

let hideTimeout;

function resetHideTimer() {
    clearTimeout(hideTimeout);
    const lockOverlay = document.querySelector('#player-lock-overlay');
    // Only set timer if the screen isn't locked
    if (lockOverlay && lockOverlay.classList.contains('d-none')) {
        hideTimeout = setTimeout(() => {
            const controls = document.querySelector('.player-controls');
            if (controls) controls.classList.add('d-none');
        }, 3000);
    }
}

function showControls() {
    const controls = document.querySelector('.player-controls');
    if (controls) {
        controls.classList.remove('d-none');
        resetHideTimer();
    }
}

function openPlayer(videoSrc) {
    if (!videoPlayerView || !mainVideo) return;

    // Set video source - use provided src or fallback to current slide video
    mainVideo.src = videoSrc || slideData[currentSlide].video;

    // Show player
    videoPlayerView.classList.remove('d-none');
    showControls(); // Reveal controls and start timer

    // Start playback
    mainVideo.play();
    if (playerPlayIcon) playerPlayIcon.className = 'bi bi-pause-fill';
}
window.openPlayer = openPlayer;

function closePlayerView() {
    mainVideo.pause();
    videoPlayerView.classList.add('d-none');
}

if (playButton) {
    playButton.addEventListener('click', () => openPlayer());
}

if (closePlayer) {
    closePlayer.addEventListener('click', closePlayerView);
}

// Modal Play Button Logic
const modalPlayBtn = document.querySelector('.center-play-btn');
if (modalPlayBtn) {
    modalPlayBtn.addEventListener('click', () => {
        if (!currentOpenedMovie) return;
        const dbInfo = movieInfoDB[currentOpenedMovie.title];
        if (dbInfo && dbInfo.video) {
            // Close the modal first
            const modal = document.getElementById('movie-details-modal');
            if (modal) modal.classList.add('d-none');
            document.body.style.overflow = '';

            // Open video player with the trailer
            openPlayer(dbInfo.video);
        } else {
            alert("Trailer not available yet!");
        }
    });
}

if (playerPlayBtn) {
    playerPlayBtn.addEventListener('click', () => {
        if (mainVideo.paused) {
            mainVideo.play();
            playerPlayIcon.className = 'bi bi-pause-fill';
        } else {
            mainVideo.pause();
            playerPlayIcon.className = 'bi bi-play-fill';
        }
    });
}

if (backwardBtn) {
    backwardBtn.addEventListener('click', () => {
        mainVideo.currentTime = Math.max(0, mainVideo.currentTime - 10);
    });
}

if (forwardBtn) {
    forwardBtn.addEventListener('click', () => {
        mainVideo.currentTime = Math.min(mainVideo.duration, mainVideo.currentTime + 10);
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

if (mainVideo) {
    mainVideo.addEventListener('loadedmetadata', () => {
        if (playerProgress) {
            playerProgress.max = mainVideo.duration;
            playerProgress.value = 0;
        }
        if (timeDisplay) timeDisplay.textContent = formatTime(mainVideo.duration);
    });

    mainVideo.addEventListener('timeupdate', () => {
        if (playerProgress) playerProgress.value = mainVideo.currentTime;
        if (timeDisplay) {
            const remaining = mainVideo.duration - mainVideo.currentTime;
            timeDisplay.textContent = formatTime(remaining);
        }
    });
}

if (playerProgress) {
    playerProgress.addEventListener('input', () => {
        mainVideo.currentTime = playerProgress.value;
    });
}

// --- Dynamic Player Features ---
const brightnessSlider = document.querySelector('#brightness-slider-container');
const brightnessTrack = document.querySelector('#brightness-track');
const brightnessThumb = document.querySelector('#brightness-thumb');
const brightnessOverlay = document.querySelector('#brightness-overlay');

const speedBtn = document.querySelector('#player-speed');
const lockBtn = document.querySelector('#player-lock');
const episodesBtn = document.querySelector('#player-episodes');
const audioBtn = document.querySelector('#player-audio');
const audioBtnTop = document.querySelector('#player-audio-top');
const nextBtn = document.querySelector('#player-next');
const lockOverlay = document.querySelector('#player-lock-overlay');
const unlockBtn = document.querySelector('#player-unlock-btn');
const lockBtnTop = document.querySelector('#player-lock-top');

// 1. Brightness Logic
if (brightnessSlider) {
    let isDraggingBrightness = false;

    const updateBrightness = (event) => {
        const rect = brightnessSlider.getBoundingClientRect();
        const videoContainer = document.querySelector('.video-container');
        const isLandscape = videoContainer && videoContainer.classList.contains('landscape-mode') && window.innerWidth <= 1200;

        let clientX, clientY;
        if (event.touches) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        let percentage;
        if (isLandscape) {
            // When rotated 90deg, the vertical slider is horizontal on screen.
            // Dragging left-to-right (relative to screen) is visually moving the thumb.
            percentage = (clientX - rect.left) / rect.width;
        } else {
            // Normal vertical slider logic
            percentage = (rect.bottom - clientY) / rect.height;
        }

        percentage = Math.max(0, Math.min(1, percentage));

        // Update UI
        if (brightnessTrack) brightnessTrack.style.height = `${percentage * 100}%`;
        if (brightnessThumb) brightnessThumb.style.bottom = `${percentage * 100}%`;

        // Update Overlay (Opacity 1 is dark, 0 is bright)
        if (brightnessOverlay) brightnessOverlay.style.opacity = 1 - percentage;

        resetHideTimer();
    };

    const startDrag = (e) => {
        isDraggingBrightness = true;
        updateBrightness(e);
    };

    brightnessSlider.addEventListener('mousedown', startDrag);
    brightnessSlider.addEventListener('touchstart', (e) => {
        startDrag(e);
    }, { passive: false });

    window.addEventListener('mousemove', (e) => {
        if (isDraggingBrightness) updateBrightness(e);
    });
    window.addEventListener('touchmove', (e) => {
        if (isDraggingBrightness) {
            e.preventDefault(); // Prevent scrolling while adjusting brightness
            updateBrightness(e);
        }
    }, { passive: false });

    window.addEventListener('mouseup', () => isDraggingBrightness = false);
    window.addEventListener('touchend', () => isDraggingBrightness = false);
}

// 2. Playback Speed Logic
if (speedBtn) {
    const speeds = [1, 1.25, 1.5, 0.5, 0.75];
    let speedIdx = 0;
    speedBtn.addEventListener('click', () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        const newSpeed = speeds[speedIdx];
        mainVideo.playbackRate = newSpeed;
        speedBtn.querySelector('span').textContent = `Speed (${newSpeed}x)`;
    });
}

// 3. Lock Screen Logic
function activateLock() {
    const controls = document.querySelector('.player-controls');
    controls.classList.add('d-none');
    if (lockOverlay) lockOverlay.classList.remove('d-none');
}

if (lockBtn) lockBtn.addEventListener('click', activateLock);
if (lockBtnTop) lockBtnTop.addEventListener('click', activateLock);

if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        const controls = document.querySelector('.player-controls');
        if (lockOverlay) lockOverlay.classList.add('d-none');
        controls.classList.remove('d-none');
    });
}

// 4. Next Episode skip
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideData.length;
        mainVideo.src = slideData[currentSlide].video;
        mainVideo.play();
    });
}

// 6. Zoom & Orientation Logic
const zoomBtn = document.querySelector('#player-zoom');
if (zoomBtn && mainVideo) {
    zoomBtn.addEventListener('click', () => {
        const isMobileBreakPoint = window.innerWidth <= 1200;
        const videoContainer = document.querySelector('.video-container');
        mainVideo.classList.toggle('zoomed');

        if (videoContainer) {
            videoContainer.classList.toggle('landscape-mode');
        }

        if (isMobileBreakPoint) {
            // Mobile-specific Orientation Handler
            if (mainVideo.classList.contains('zoomed')) {
                // Enter Landscape mode
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().then(() => {
                        if (screen.orientation && screen.orientation.lock) {
                            screen.orientation.lock('landscape').catch(err => {
                                console.log("Orientation lock failed:", err);
                            });
                        }
                    }).catch(err => console.log("Fullscreen request failed:", err));
                }
            } else {
                // Exit Landscape mode
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
                if (document.fullscreenElement && document.exitFullscreen) {
                    document.exitFullscreen().catch(err => console.log("Exit fullscreen failed:", err));
                }
            }
        }

        resetHideTimer();

        // Update Icon based on state and device
        if (mainVideo.classList.contains('zoomed')) {
            zoomBtn.className = isMobileBreakPoint ? 'bi bi-phone-landscape' : 'bi bi-fullscreen-exit';
        } else {
            zoomBtn.className = isMobileBreakPoint ? 'bi bi-phone' : 'bi bi-aspect-ratio';
        }
    });
}

// 5. Episodes/Audio Alerts
const showAudioAlert = () => alert("Audio & Subtitles settings coming soon!");

if (episodesBtn) episodesBtn.addEventListener('click', () => alert("Episodes list coming soon!"));
if (audioBtn) audioBtn.addEventListener('click', showAudioAlert);
if (audioBtnTop) audioBtnTop.addEventListener('click', showAudioAlert);
// --- User Interaction for Controls ---
const videoContainer = document.querySelector('.video-container');

if (videoContainer) {
    videoContainer.addEventListener('click', (e) => {
        const controls = document.querySelector('.player-controls');
        const lockOverlay = document.querySelector('#player-lock-overlay');

        // Don't toggle if we clicked on the lock screen (it has its own unlock btn)
        if (lockOverlay && !lockOverlay.classList.contains('d-none')) return;

        // If we click on the background/video, we toggle.
        if (e.target === videoContainer || e.target === mainVideo || e.target === controls || e.target.classList.contains('player-controls')) {
            if (controls.classList.contains('d-none')) {
                showControls();
            } else {
                controls.classList.add('d-none');
                clearTimeout(hideTimeout);
            }
        } else {
            // If we clicked an interactive element (button/slider), just reset the timer
            resetHideTimer();
        }
    });
}

// --- More View Profile Switching ---
const moreViewProfiles = document.querySelectorAll('.more-header .profiles-list .profile-card:not(.add-profile-card)');

if (moreViewProfiles.length > 0) {
    moreViewProfiles.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            moreViewProfiles.forEach(c => c.classList.remove('active'));
            // Add active class to clicked one
            card.classList.add('active');
        });
    });
}
