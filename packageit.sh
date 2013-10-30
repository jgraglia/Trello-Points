#!/bin/sh

DISTFOLDER=dist
echo "Zips found: "
ls -alh $DISTFOLDER/*.zip
echo "Version found in manifest.json"
fgrep \"version manifest.json

VERSION=`fgrep \"version manifest.json | cut -d '"' -f 4`
echo "Default version is (found in manifest.json): $VERSION"
echo "Ctrl+C if sth wrong or..."
echo "Press a key to continue (and build $ZIP) or CTRL-C"
read aaa
ZIP=$DISTFOLDER/points-for-trello.v$VERSION.zip
rm -f $ZIP || true
zip -r $ZIP * -x tests/* -x screenshots/* -x tests/libs/*
echo "Done."
unzip -l $ZIP
ls -alh $ZIP

echo "To release it : https://chrome.google.com/webstore/developer/dashboard"
