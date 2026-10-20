# Mind Maya Games — Website

A responsive, cinematic static website for Mind Maya Games and the Guliga prototype.

## Files
- `index.html` — page structure and content
- `styles.css` — responsive design and visual styling
- `site-config.js` — add YouTube video IDs and screenshots here
- `script.js` — embeds configured videos, builds gallery cards, mobile navigation, scroll reveals
- `assets/mind-maya-games-logo.jpg` — your full official logo artwork
- `assets/mind-maya-games-mark.jpg` — cropped emblem used in the website header and footer
- `assets/screenshots/` — includes the first two Guliga images; add future screenshots here

## Add YouTube videos and Shorts
1. Open `site-config.js`.
2. In the `videos` array, add one object per video:
   ```js
   { id: "YOUTUBE_VIDEO_ID", title: "Guliga prototype update", description: "A look at the current build.", type: "DEVLOG" }
   ```
3. For a Short, use its YouTube ID and `type: "SHORT"`.
4. Save the file and refresh the site.

Example: `https://www.youtube.com/watch?v=abc123xyz89` has the ID `abc123xyz89`.
Example: `https://www.youtube.com/shorts/abc123xyz89` also has the ID `abc123xyz89`.

## Add game screenshots
1. Copy JPG, PNG, or WebP screenshots into `assets/screenshots/`.
2. Add entries in the `gallery` array in `site-config.js`, for example:
   ```js
   { src: "assets/screenshots/guliga-world.jpg", title: "The first environment", category: "ENVIRONMENT" }
   ```
3. The gallery automatically uses your configured images. If the gallery array is empty, the site shows stylized sample panels so the layout is still previewable.

## Preview locally
Open `index.html` in a modern browser. For the most reliable local preview, use VS Code with the Live Server extension or run a simple local HTTP server.

## Free deployment with GitHub Pages
1. Create or sign in to a GitHub account.
2. Create a **public** repository, e.g. `mind-maya-games`.
3. Upload the contents of this folder to the repository root (not the parent folder).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. GitHub will show the published `github.io` URL in the Pages section after deployment finishes.

GitHub Pages can host static HTML/CSS/JS sites on a free GitHub plan using a public repository. A custom domain can be connected later, but registering the domain itself generally costs money.

## Before launch
- Add more Guliga screenshots to `assets/screenshots/` and list them in `site-config.js` when ready.
- Add your YouTube video and Shorts IDs in `site-config.js`.
- The uploaded official Mind Maya Games emblem is now used in the header and footer.
- Confirm the wording of the studio description and the game's public description.
- Discord and Instagram links are configured in `site-config.js` and shown in the follow section and footer. Update those URLs there whenever your community links change.

## Notes
- YouTube embeds use youtube-nocookie.com for privacy-enhanced playback.
- This is a static website; no backend or login system is required.
- The site is not published online by this package. Deployment requires your own GitHub account and a few setup steps.
