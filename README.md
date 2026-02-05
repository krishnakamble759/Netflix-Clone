# 🎬 Netflix Clone - Premium Streaming UI

![Netflix Clone Header](https://raw.githubusercontent.com/krishnakamble759/Netflix-Clone/main/logos_netflix.svg)

A high-performance, fully responsive **Netflix Clone** built with a modern stack. This project mimics the premium user experience of the Netflix mobile and web app, featuring a robust video player, real-time voice search, and a modular JavaScript architecture.

---

## ⚡ Live Demo
🚀 **Check out the live site here:** [Netflix Clone Live](https://krishnakamble759.github.io/Netflix-Clone/)

---

## 🔥 Key features

### 🎥 Immersive Video Experience
- **Custom Video Player:** Built-in controls for play/pause, seek (+/- 10s), brightness adjustment, and playback speed.
- **Auto-Transitioning Hero:** A dynamic high-definition slider on the home page that cycles through trending trailers.
- **Smart Asset Resolution:** Custom logic ensures all videos and images load flawlessly even when deployed in subdirectories (GitHub Pages).

### 🎤 Advanced Search Capabilities
- **Voice Search Integration:** Speak the name of a movie to find it instantly. 
- **Auto-Play Matching:** If an exact match is found via voice, the movie modal opens automatically.
- **Dynamic Filtering:** Search results update in real-time as you type.

### 📱 Premium UI/UX
- **Fully Responsive:** Beautifully crafted with **SCSS** and **Bootstrap** to look stunning on iPhone, Android, and Desktop.
- **Profile Management:** Interactive profile selection screen with add/edit functionality.
- **Offline Simulation:** Functional "Downloads" and "Coming Soon" sections with persistent state.

---

## 🛠️ Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) (For lighting fast builds)
- **Language:** JavaScript ES6+, HTML5
- **Styling:** SCSS (Sass), Bootstrap 5
- **Icons:** Bootstrap Icons
- **Deployment:** GitHub Actions (Automated CI/CD)

---

## 🏗️ Project Structure

```text
├── .github/workflows/   # Automated Deployment (CI/CD)
├── public/              # High-res movie assets & Trailers (.mp4)
├── src/
│   ├── js/              # Modular JavaScript Logic
│   │   ├── main.js      # Core DB & DOM Manipulation
│   │   ├── downloads.js # LocalStorage Logic
│   │   └── ...
│   └── scss/            # Professional Design System
└── index.html           # Main Entry Point
```

---

## 🚀 Quick Start

1. **Clone the project**
   ```bash
   git clone https://github.com/krishnakamble759/Netflix-Clone.git
   cd Netflix-Clone
   ```

2. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

3. **Build For Production**
   ```bash
   npm run build
   ```

---

## 📸 Screenshots

| Mobile View | Movie Details | Video Player |
|:---:|:---:|:---:|
| ![Mobile Home](https://raw.githubusercontent.com/krishnakamble759/Netflix-Clone/main/public/Trending/passing.png) | ![Modal](https://raw.githubusercontent.com/krishnakamble759/Netflix-Clone/main/public/Popular/lucifer_hd.png) | ![Player](https://raw.githubusercontent.com/krishnakamble759/Netflix-Clone/main/public/ComingSoon/batman%20II.png) |

---

## 📄 Final Notes
This project was built for educational purposes to demonstrate advanced JavaScript asset handling, SCSS design systems, and modern deployment workflows. All movie trademarks belong to their respective owners.

**Created by [Krishna Kamble](https://github.com/krishnakamble759)**
