Playlist matcher
================

Playlist matcher is a node script for matching existing files/folders
between a m3u8 playlist and a directory. I use it to filter my music
collection for unused and missing files/folders, and it will only
consider folders with mp3/wav/flac/aac files in it.

It can also delete unused files/folders, but this should be done with
care. Run it without the option first to double check if you really
want to delete all the directories.

Usage
=====

Run the following command to produce two json files, unused.json (not in
playlist) and missing.json (not in file structure). Add in the `del`
option to remove these directories.

    node playlist-matcher.js playlist.m3u8 [del]

Prerequisites
-------------

-   Node.js - Download and Install
    [Node.js](http://www.nodejs.org/download/).

License
-------

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
