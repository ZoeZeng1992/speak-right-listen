#!/bin/bash
set -e
cd "$(dirname "$0")"
cp ../fav-listen.html ./index.html
git add index.html README.md .gitignore
git commit -m "Update listen page" || echo "(no content changes to commit)"
git push -u origin main
echo "Pushed. Site: https://ZoeZeng1992.github.io/speak-right-listen/"
