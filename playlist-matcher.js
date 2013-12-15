var path = require('path');
var fs = require('fs');

var makeHash = function(array){
    var hash = {};
    for (var i = array.length - 1; i >= 0; i--) {
        hash[array[i]] = true;
    }
    return hash;
};

fs.readdir("./", function (err, files) {
    if(err) {
        console.log(err);
    } else {
        dirHash = makeHash(files);
        console.log(dirHash);
    }
});

fs.readFile("./playlist.small.m3u", 'utf8',function (err, data) {
    if(err) {
        console.log(err);
    } else {
        var lines = data.toString().split("\r\n")
                    .filter(function(line){ return line.charAt(0) != '#';})
                    .map(function(line){
                        if (line.indexOf("\\") != -1){
                            return line.substring(0, line.indexOf("\\"));
                        }else{
                            return line;
                        }
                    });
        filesHash = makeHash(lines);
        console.log(filesHash);
    }
});