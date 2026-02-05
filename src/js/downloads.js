// Downloads Logic
import { videoStats } from './video_metadata.js';
import { getAssetPath } from './main.js';


// Persistent storage for downloaded movies
let downloadedMovies = JSON.parse(localStorage.getItem('netflix_downloads_v5')) || [
];

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('netflix_downloads_v5', JSON.stringify(downloadedMovies));
}

export function initDownloads() {
    const container = document.querySelector('#downloads-view');
    if (!container) return;

    renderDownloads(downloadedMovies);
}

export function addMovieToDownloads(movie, dbInfo) {
    // Check if already downloaded
    if (downloadedMovies.some(m => m.title === movie.title)) {
        console.log('Movie already in downloads');
        return false;
    }

    let size = "15.0 MB";
    let quality = "HD";
    let video = "";

    if (dbInfo && dbInfo.video) {
        video = dbInfo.video;
        const stats = videoStats[dbInfo.video];
        if (stats) {
            size = stats.size;
            quality = stats.quality;
        } else {
            // Try to extract quality from name if not in stats
            const qualMatch = dbInfo.video.match(/\((720p|1080p|480p|360p)\)/);
            if (qualMatch) quality = qualMatch[1];
        }
    }

    const newDownload = {
        id: Date.now(),
        title: movie.title,
        img: movie.img || movie.hd_img,
        size: size,
        quality: quality,
        video: video
    };

    downloadedMovies.push(newDownload);
    saveToStorage();
    renderDownloads(downloadedMovies);
    return true;
}

function renderDownloads(movies) {
    const container = document.querySelector('#downloads-view');
    if (!container) return;
    container.replaceChildren();

    // Header Template
    const headerTpl = document.getElementById('downloads-header-template');
    if (headerTpl) {
        const clone = headerTpl.content.cloneNode(true);
        const icon = clone.querySelector('i');
        if (icon) icon.className = movies.length === 0 ? 'bi bi-info-circle' : 'bi bi-gear';
        container.appendChild(clone);
    }

    if (movies.length === 0) {
        const emptyTpl = document.getElementById('downloads-empty-template');
        if (emptyTpl) {
            const clone = emptyTpl.content.cloneNode(true);
            const setupBtn = clone.querySelector('.btn-setup');
            if (setupBtn) {
                setupBtn.addEventListener('click', () => {
                    downloadedMovies = [
                        { id: 1, title: "Money Heist", img: "originals/money heist.png", size: "10.7 MB", quality: "144p", video: "trailer/money-heist.mp4" },
                        { id: 2, title: "Extraction", img: "my list/Extraction.png", size: "12.7 MB", quality: "144p", video: "trailer/extraction-bruce-willis-kellan-lutz.mp4" },
                        { id: 3, title: "Loev", img: "Popular/loev_hd.png", size: "15.6 MB", quality: "144p", video: "trailer/lucifer.mp4" }
                    ];
                    saveToStorage();
                    renderDownloads(downloadedMovies);
                });
            }
            container.appendChild(clone);
        }
    } else {
        const contentTpl = document.getElementById('downloads-content-template');
        if (!contentTpl) return;

        const contentClone = contentTpl.content.cloneNode(true);
        const listContainer = contentClone.querySelector('.list-container');

        const itemTpl = document.getElementById('download-item-template');
        if (itemTpl && listContainer) {
            movies.forEach(movie => {
                const clone = itemTpl.content.cloneNode(true);
                const item = clone.querySelector('.download-item');
                const imgWrap = clone.querySelector('.item-img');
                const infoWrap = clone.querySelector('.item-info');
                const img = imgWrap.querySelector('img');
                const title = infoWrap.querySelector('h4');
                const pInfo = infoWrap.querySelector('p');
                const chevron = clone.querySelector('.item-chevron-btn');
                const chevIcon = chevron.querySelector('i');
                // Image Path Repair Logic (Fixes legacy broken paths in localStorage)
                let movieImg = movie.img;
                const repairMap = {
                    "Before 30": "Popular/before_30_hd.png",
                    "Game of Thrones": "Popular/game_thrones_hd.png",
                    "Barbarians": "Popular/barbarians_hd.png",
                    "Lucifer": "Popular/lucifer_hd.png",
                    "Adam Project": "Popular/adam_project_hd.png",
                    "Hubbie Halloween": "Popular/hubbie_halloween_hd.png",
                    "Loev": "Popular/loev_hd.png",
                    "FBoy Island": "Negeria/f_boy.png",
                    "Mosul": "Trending/mosul.png",
                    "Night School": "continue/night School.svg",
                    "Christmas": "continue/christamas.svg",
                    "Designated Survivor": "continue/designated.svg"
                };

                if (repairMap[movie.title]) {
                    movieImg = repairMap[movie.title];
                }

                if (img) {
                    img.src = getAssetPath(movieImg);
                    img.alt = movie.title;
                }
                if (title) title.textContent = movie.title;
                const removeOpt = clone.querySelector('.remove-option');
                if (pInfo) pInfo.textContent = `${movie.size} | ${movie.quality}`;

                // Play video when item is clicked (except when clicking the chevron or remove option)
                const playMovie = () => {
                    if (window.openPlayer && movie.video) {
                        window.openPlayer(movie.video);
                    } else if (!movie.video) {
                        alert("Offline video file not found.");
                    }
                };

                imgWrap.addEventListener('click', playMovie);
                infoWrap.addEventListener('click', playMovie);

                // Long Press for Mobile to show Delete Option
                let longPressTimer;
                const containerElem = clone.querySelector('.download-item-container');

                const showRemoveOption = () => {
                    container.querySelectorAll('.remove-option').forEach(opt => {
                        if (opt !== removeOpt) opt.classList.add('d-none');
                    });
                    container.querySelectorAll('.item-chevron-btn i').forEach(otherIcon => {
                        if (otherIcon !== chevIcon) otherIcon.className = 'bi bi-chevron-right';
                    });

                    if (removeOpt.classList.contains('d-none')) {
                        removeOpt.classList.remove('d-none');
                        chevIcon.className = 'bi bi-chevron-down';
                        if (navigator.vibrate) navigator.vibrate(50);
                    } else {
                        removeOpt.classList.add('d-none');
                        chevIcon.className = 'bi bi-chevron-right';
                    }
                };

                if (containerElem) {
                    containerElem.addEventListener('touchstart', (e) => {
                        longPressTimer = setTimeout(() => {
                            showRemoveOption();
                        }, 800);
                    }, { passive: true });

                    containerElem.addEventListener('touchend', () => clearTimeout(longPressTimer));
                    containerElem.addEventListener('touchmove', () => clearTimeout(longPressTimer));

                    // Desktop: Right click to show options (Different functionality as requested)
                    containerElem.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        showRemoveOption();
                    });
                }

                chevron.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showRemoveOption();
                });

                removeOpt.addEventListener('click', (e) => {
                    e.stopPropagation();
                    downloadedMovies = downloadedMovies.filter(m => m.id !== movie.id);
                    saveToStorage();
                    renderDownloads(downloadedMovies);
                });

                listContainer.appendChild(clone);
            });
        }
        container.appendChild(contentClone);
    }
}
