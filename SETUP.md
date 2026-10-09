# ARS project — setup guide

## Quick preview on your computer
1. Extract the ZIP.
2. Open the extracted `ARS_Adarsh_Ke_Alfaaz_COMPLETE` folder.
3. Double-click `index.html` to view static pages. Some browser features and service-worker caching work best over a local web server.
4. Recommended local preview: install VS Code and the Live Server extension, open the project folder and choose **Go Live**.

## Upload the website to GitHub Pages
1. Sign in to GitHub and open the repository `Adarshrajshyar/Adarshrajshyar.github.io` (or the repository you intend to use).
2. Keep a backup of the current repository before replacing files.
3. Extract this ZIP on your computer.
4. Open the extracted folder. Select everything *inside* it (`index.html`, `css`, `js`, `assets`, `backend`, `database`, etc.) and upload those items to the repository root. Do not upload only the ZIP file and do not accidentally create a second nested folder.
5. If GitHub asks how to handle existing files, review the changes first. Replace the project files only after confirming that the backup exists.
6. In repository **Settings → Pages**, select the correct branch and `/ (root)` if that is your setup; save.
7. Wait for the Pages deployment to complete and open `https://adarshrajshyar.github.io`.
8. Test the main nav, mobile menu, images, search, theme toggle, filters and all book links.

You may instead use **Add file → Upload files** in the GitHub web interface. For many files, GitHub Desktop or Git is more reliable. Never upload `.env` files or secrets.

## Folder rule
The HTML pages are at the project root so GitHub Pages can serve them directly. `backend/` is only a scaffold and does not run on GitHub Pages. `database/schema.sql` is not automatically executed; it must be reviewed and run only in the chosen database project.
