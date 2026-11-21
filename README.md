# person-wiki.loan

An SCP-wiki-style joke site about SCP-PERSON. Plain HTML, no build step.

## Adding a page
Edit `entries.js`, copy a block in DOCS, change the text. `[[text]]` makes a hover-to-reveal redaction bar.
To add a photo, put it in the `img/` folder and set `photo: "img/whatever.jpg"` on the main file, or `POSTER_PHOTO` for the missing poster.

## Hosting
GitHub Pages: Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
The `CNAME` file points the site at person-wiki.loan.
