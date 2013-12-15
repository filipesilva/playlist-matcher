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

deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

var dirObj = makeObj(fs.readdirSync("./"));
var filesObj = makeObj(
                    fs.readFileSync("./"+process.argv[2], 'utf8')
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

delete unused[process.argv[2]];
delete unused["playlist-matcher.js"];
delete unused["missing.json"];
delete unused["unused.json"];

fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2));
fs.writeFileSync('unused.json', JSON.stringify(unused, null, 2));

if (process.argv[3] == "del"){
    for (var path in unused){
        if (fs.statSync(path).isDirectory()){
            deleteFolderRecursive(path);
        }else{
            fs.unlinkSync(path);
        }
    }
}


