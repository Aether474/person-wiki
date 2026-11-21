# person-wiki.loan

An SCP-wiki-style joke site about our friends. Plain HTML, no build step.

## Adding a person
Edit `entries.js`, copy a block, change the text. `[[text]]` makes a hover-to-reveal redaction bar.
To add a photo, put it in an `img/` folder and set `photo: "img/whatever.jpg"`.

## Hosting
GitHub Pages: Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
The `CNAME` file points the site at person-wiki.loan.
