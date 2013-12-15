var fs = require('fs');

var makeObj = function(array){
    var hash = {};
    for (var i = array.length - 1; i >= 0; i--) {
        hash[array[i]] = true;
    }
    return hash;
};

var objDiff = function (obj1, obj2){
    var diff = {};
    for (var prop in obj1){
        if (!obj2.hasOwnProperty(prop)){
            diff[prop] = true;
        }
    }
    return diff;
};

var makeObj2 = function(array){
    return array;
};

var objDiff2 = function (obj1, obj2){
    var diff = [];
    for (var i = obj1.length - 1; i >= 0; i--) {
        if (obj2.indexOf(obj1[i]) == -1){
            diff.push(obj1[i]);
        }
    }
    return diff;
};

console.time('with obj');

var dirObj = makeObj(fs.readdirSync("./"));
var filesObj = makeObj(
                    fs.readFileSync("./"+process.argv[2], "utf8")
                    .toString().split("\r\n")
                    .filter(function(line){ return line.charAt(0) != '#';})
                    .map(function(line){
                        if (line.indexOf("\\") != -1){
                            return line.substring(0, line.indexOf("\\"));
                        }else{
                            return line;
                        }
                    })
                );
var missing = objDiff(filesObj, dirObj);
var unused = objDiff(dirObj, filesObj);

console.timeEnd('with obj');

console.time('with arr');

var dirObj = makeObj2(fs.readdirSync("./"));
var filesObj = makeObj2(
                    fs.readFileSync("./"+process.argv[2], "utf8")
                    .toString().split("\r\n")
                    .filter(function(line){ return line.charAt(0) != '#';})
                    .map(function(line){
                        if (line.indexOf("\\") != -1){
                            return line.substring(0, line.indexOf("\\"));
                        }else{
                            return line;
                        }
                    })
                );
var missing = objDiff2(filesObj, dirObj);
var unused = objDiff2(dirObj, filesObj);

console.timeEnd('with arr');

fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2));
fs.writeFileSync('unused.json', JSON.stringify(unused, null, 2));



