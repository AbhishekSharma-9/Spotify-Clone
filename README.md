# Spotify Clone

A sleek Spotify-inspired music streaming web app built with modern web technologies and the Spotify Developer API.

##  Live Demo

Access the live demo here:  
https://abhisheksharma-9.github.io/Spotify-Clone/

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Environment Variables](#environment-variables)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features

- **Browse & Search** songs, artists, and albums using Spotify’s rich catalog  
- **Play & Control** music playback: play, pause, seek, skip, shuffle, repeat  
- **Playlist Management**: create, view, and manage your playlists  
- **Now Playing**: preview current track with cover art, metadata, and audio controls  
- **User Authentication** via Spotify OAuth for personalized experience  
- **Responsive UI** ensures smooth navigation on both desktop and mobile devices

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, optionally Tailwind CSS or a UI framework  
- **Bundler/Tooling**: Vite, Webpack, or similar  
- **API**: Spotify Web API & Authorization flow  
- **Hosting**: GitHub Pages (via `gh-pages`) or Netlify/Vercel

---

## Installation

```bash
# Clone the repo
git clone https://github.com/AbhishekSharma-9/Spotify-Clone.git
cd Spotify-Clone

# Install dependencies
npm install

# Run the app locally
npm run dev
```

---

## Usage

1. Sign up or log in to [Spotify for Developers](https://developer.spotify.com/)
2. Create a new application to obtain your **Client ID** and **Redirect URI**
3. Add the redirect URI (e.g. `http://localhost:3000`) in your Spotify app settings
4. Create a `.env` file in your project root with:
   ```
   VITE_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
   VITE_REDIRECT_URI=http://localhost:3000
   ```
5. Run the development server and start exploring!

---

## Environment Variables

| Variable         | Description                        |
|------------------|------------------------------------|
| `VITE_CLIENT_ID` | Your Spotify API Client ID         |
| `VITE_REDIRECT_URI` | Redirect URI configured in Spotify app |

---

## Folder Structure

```
Spotify-Clone/
├── public/          # Static files (e.g. public assets, favicon)
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Main views (e.g. Login, Dashboard, Player)
│   ├── api/         # Spotify API interaction utilities
│   ├── styles/      # CSS / Tailwind styles
│   ├── App.js       # Root component
│   └── main.js      # Entry point
├── .env             # Local environment variables
├── index.html
├── package.json
└── README.md
```

---

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository  
2. Create a new feature branch: `git checkout -b feature/my-feature`  
3. Make your changes and commit: `git commit -m 'Add awesome feature'`  
4. Push to your branch: `git push origin feature/my-feature`  
5. Open a Pull Request and describe your changes

---

## License

This project is open source under the **MIT License**. Feel free to adapt and build upon it!
