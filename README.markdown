Trello Points
===========

First of all, Trello Points was inspired by TrelloScrum extension originally developped by 
[Marcel Duin](http://webglmarcel.q42.net/) and [Jasper Kaizer](https://twitter.com/jkaizer).
https://github.com/Q42/TrelloScrum

Trello is just great, and with TrelloScrum it was event better... But times are changing and TrelloScrum
start to behave erractically...

Why I have forked ?
===========
The main idea was to solve a bug with filtering cards. Total points of the list were not 
refreshed.
Furthermore, display of points were ... quite erratics. (https://github.com/Q42/TrelloScrum/issues/11)

So I start to develop some missing unit tests (using QUnit as I want to compare it to Jasmine but that's another story)
... and to add an option pane with some settings (in order to test Google Extension)
... Few hours laters, it was (IMHO) a different project.

Goals
=====
Quite same goals as Trello Scrum : 

 * Add points to cards.
 * List display total of visible cards
 * Trello Points adds functionality to the awesome trello.com for use in Scrum projects.

Setup
-----

TrelloPoints is a Chrome extension and you can install it via the Chrome Webstore.

Don't miss the options pane of the extension were you can configure the behavior of the extension.

Or, clone this repository and load the TrelloPoints folder as an unpacked extension.

How does it work?
-----------------
In the card titles you can add the points between parentheses. The assigned points
will be picked up by TrelloPoints and displayed in the upper right corner of the card.

For each list the total amount of points will be calculated and shown in the title
of the list.

Points modifications will be detected and calculated. So changing a number or moving
a card will be reflected almost immediately.

Tests
-------
Wrote using QUnit (http://docs.jquery.com/QUnit).

See [tests/alltests.html](Trello-Points/blob/master/tests/alltests.html)

and there is a Trello dedicated to live test : https://trello.com/board/trello-scrum-test/4f7581c3e8ddc47f1c4e7c95


License
-------
Apache License 2.0
	http://www.apache.org/licenses/LICENSE-2.0
	
Credits
-------
As I say above, Trello Points is a "fork" of TrelloScrum!!
https://github.com/Q42/TrelloScrum

Julien Graglia (@jgraglia)
https://github.com/jgraglia/Trello-Points

nafg
https://github.com/nafg