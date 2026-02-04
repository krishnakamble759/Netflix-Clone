// Coming Soon Data and Logic

const upcomingMovies = [

    {
        title: "Project Hail Mary",
        img: "/public/ComingSoon/project_hail_mary.png",
        video: "/trailer/project-hail-mary.mp4",
        releaseDate: "Coming March 2026",
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
        genres: ["Sci-Fi", "Space", "Suspense"]
    },
    {
        title: "The Batman: Part II",
        img: "/public/comingSoon/batman II.png",
        video: "/trailer/batman-robert-pattinson.mp4",
        releaseDate: "Coming October 2026",
        description: "Batman continues his war on crime in Gotham City, facing new threats that challenge his physical limits and his detective skills.",
        genres: ["Action", "Crime", "Dark"]
    },
    {
        title: "Avengers: Doomsday",
        img: "/public/ComingSoon/avengers_doomsday.png",
        video: "/trailer/avengers-doomsday-robert-downey-jr.mp4",
        releaseDate: "Coming May 2026",
        description: "Earth's mightiest heroes must band together with allies from across the multiverse to face a threat that endangers all of reality.",
        genres: ["Action", "Superhero", "Epic"]
    },
    {
        title: "Stranger Things: 5",
        img: "/public/ComingSoon/stranger things.png",
        video: "/trailer/stranger-things-finale.mp4",
        releaseDate: "Coming November 2026",
        description: "the group seeking to find and kill Vecna following the opening of rifts throughout Hawkins.",
        genres: ["Horror", "Science Fiction", "Coming of Age Drama"]
    },
    {
        title: "Dune: Messiah",
        img: "/public/ComingSoon/dune_messiah.png",
        video: "/trailer/dune-first-timothée-chalamet-robert.mp4",
        releaseDate: "Coming December 2026",
        description: "Paul Atreides faces the consequences of becoming a messiah to the Fremen as political intrigue and betrayal threaten his rule.",
        genres: ["Sci-Fi", "Drama", "Epic"]
    }
];

export function initComingSoon() {
    const container = document.querySelector('.coming-soon-list');
    if (!container) return;

    container.replaceChildren();
    const template = document.getElementById('coming-soon-item-template');
    if (!template) return;

    upcomingMovies.forEach(movie => {
        const clone = template.content.cloneNode(true);
        const item = clone.querySelector('.coming-soon-item');

        const img = item.querySelector('.movie-preview img');
        if (img) {
            img.src = movie.img;
            img.alt = movie.title;
            // Add click listener to play trailer
            img.addEventListener('click', () => {
                if (movie.video && window.openPlayer) {
                    window.openPlayer(movie.video);
                } else {
                    console.warn(`No video source or player found for ${movie.title}`);
                }
            });
            img.style.cursor = 'pointer';
        }

        const title = item.querySelector('.item-title-img');
        if (title) title.textContent = movie.title;

        const date = item.querySelector('.date');
        if (date) date.textContent = movie.releaseDate;

        const synopsis = item.querySelector('.synopsis');
        if (synopsis) synopsis.textContent = movie.description;

        const genresDiv = item.querySelector('.genres');
        const genreTemplate = document.getElementById('genre-tag-template');
        if (genresDiv && genreTemplate) {
            movie.genres.forEach(g => {
                const clone = genreTemplate.content.cloneNode(true);
                const span = clone.querySelector('span');
                if (span) {
                    span.textContent = g;
                    genresDiv.appendChild(span);
                }
            });
        }

        container.appendChild(item);
    });

    // Add interactivity
    const remindButtons = container.querySelectorAll('.remind-me');
    remindButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');
            if (icon.classList.contains('bi-bell')) {
                icon.classList.replace('bi-bell', 'bi-bell-fill');
                icon.style.color = '#fff';
                span.textContent = 'Reminded';
            } else {
                icon.classList.replace('bi-bell-fill', 'bi-bell');
                icon.style.color = '';
                span.textContent = 'Remind Me';
            }
        });
    });

    // Share Functionality
    const shareButtons = container.querySelectorAll('.action-item:has(.bi-share-fill)');
    const shareModal = document.querySelector('#share-modal');
    const closeShare = document.querySelector('.close-share');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (shareModal) {
        shareButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                shareModal.classList.remove('d-none');
            });
        });

        // Close logic
        const closeModal = () => shareModal.classList.add('d-none');

        if (closeShare) closeShare.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    }
}
