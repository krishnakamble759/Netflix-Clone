# Netflix Clone

A fully responsive, feature-rich Netflix Clone built with **HTML**, **SCSS**, and **JavaScript**. This project replicates the core functionality and design of Netflix, including video playback, voice search, responsive carousels, and user profile management.

![Netflix Clone Preview](./public/netfilx_logo.png)

## 🚀 Features

-   **🎬 Video Playback:** Seamless video streaming for movies and TV shows (Hosted locally).
-   **🎤 Voice Search:** Integrated voice command functionality:
    -   *Strict Mode:* Opens movies automatically if the exact name is spoken (e.g., "Venom").
    -   *Smart Fallback:* Shows search results if proper names aren't matched exactly (e.g., "School for Good and Evil").
    -   *Error Handling:* Visual feedback and manual input fallback if the microphone fails.
-   **📂 My List:** Add and remove movies from your personal watchlist.
-   **📱 Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile devices using SCSS.
-   **🔍 Dynamic Search:** Real-time search filtering for movies and genres.
-   **👤 Profile Management:** Switch between user profiles with custom "Continue Watching" contexts.
-   **⬇️ Downloads:** Simulate downloading movies for offline viewing.

## 🛠️ Technologies Used

-   **HTML5:** Semantic structure.
-   **SCSS (Sass):** Advanced styling with variables, mixins, and responsive layouts.
-   **JavaScript (ES6+):** Core logic for DOM manipulation, search algorithms, and event handling.
-   **Vite:** Fast development build tool.
-   **Bootstrap Icons:** For UI icons (Microphone, Search, Play, etc.).

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/krishnakamble759/Netflix-Clone.git
    cd Netflix-Clone
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:3000` (or similar).

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🎥 Project Assets
This repository includes all necessary assets:
-   **Movie Posters & Thumbnails:** Located in `public/`.
-   **Trailers & Video Clips:** High-quality `.mp4` files for playback testing.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is for educational purposes. All movie assets and trademarks belong to their respective owners.
