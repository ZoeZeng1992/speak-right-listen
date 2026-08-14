#!/bin/bash
set -e
cd "$(dirname "$0")"
cp ../fav-listen.html ./index.html
cp ../app-h16.js ../app-h17.js ./
git add index.html app-h16.js app-h17.js version.json README.md .gitignore
git commit -m "Update listen page" || echo "(no content changes to commit)"
git push -u origin main
echo "Pushed. Site: https://ZoeZeng1992.github.io/speak-right-listen/"
