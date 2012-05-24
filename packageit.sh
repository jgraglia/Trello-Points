#!/bin/sh

echo "Version: "
read VERSION
ZIP=../trello-points.v$VERSION.zip
echo "Press a key to continue (and build $ZIP) or CTRL-C"
read aaa
rm -f $ZIP || true
zip -r $ZIP * -x tests/* -x screenshots/* -x tests/libs/*
echo "Done."
unzip -l $ZIP
ls -alh $ZIP
