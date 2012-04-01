#!/bin/sh

echo" Version: "
read VERSION;
ZIP=../trello-points.v$VERSION.zip
echo "Press a key to continue (and build $ZIP) or CTRL-C"
read aaa
zip -r $ZIP *
echo "Done."