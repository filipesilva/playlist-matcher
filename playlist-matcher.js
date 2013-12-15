var fs = require('fs');

var makeHash = function(array){
    var hash = {};
    for (var i = array.length - 1; i >= 0; i--) {
        hash[array[i]] = true;
    }
    return hash;
};

var dirHash = makeHash(fs.readdirSync("./"));
console.log(dirHash);

var filesHash = makeHash(fs.readFileSync("./playlist.small.m3u", "utf8")
                .toString().split("\r\n")
                .filter(function(line){ return line.charAt(0) != '#';})
                .map(function(line){
                    if (line.indexOf("\\") != -1){
                        return line.substring(0, line.indexOf("\\"));
                    }else{
                        return line;
                    }
                }));
console.log(filesHash);

