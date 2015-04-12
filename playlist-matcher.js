var fs = require('fs');

var makeObj = function(array) {
  var hash = {};
  for (var i = array.length - 1; i >= 0; i--) {
    hash[array[i]] = true;
  }
  return hash;
};

var objDiff = function(obj1, obj2) {
  var diff = {};
  for (var prop in obj1) {
    if (!obj2.hasOwnProperty(prop)) {
      diff[prop] = true;
    }
  }
  return diff;
};

var deleteFolderRecursive = function(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath)
        .isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// adapted from http://stackoverflow.com/a/16684530/2116927
var walk = function(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.indexOf(".mp3") != -1 || file.indexOf(".wav") != -1 ||
      file.indexOf(".flac") != -1 || file.indexOf(".aac") != -1) {
      // only add dirs with audio files
      if (file.lastIndexOf("/") > 1) {
        results.push(file.substring(0, file.lastIndexOf("/")));
      } else {
        results.push(file);
      }
    }
  });
  return results;
};

var dirObj = makeObj(walk(".")
  .map(function(file) {
    // match the path format on the playlist
    return file.replace('./', '')
      .replace(/\//g, '\\');
  }));
var filesObj = makeObj(
  fs.readFileSync("./" + process.argv[2], 'utf8')
  .toString()
  .split("\r\n")
  .filter(function(line) {
    return line.charAt(0) != '#';
  })
  .map(function(line) {
    if (line.indexOf("\\") != -1) {
      var lines = [];
      var index = line.indexOf("\\");
      while (index != -1) {
        lines.push(line.substring(0, line.indexOf("\\", index)));
        index = line.indexOf("\\", index + 1);
      }
      return lines;
    } else {
      return line;
    }
  })
  .reduce(function(previous, current) {
    return previous.concat(current);
  }, [])
);
var missing = objDiff(filesObj, dirObj);
var unused = objDiff(dirObj, filesObj);

delete unused[process.argv[2]];
delete unused["playlist-matcher.js"];
delete unused["missing.json"];
delete unused["unused.json"];

fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2));
fs.writeFileSync('unused.json', JSON.stringify(unused, null, 2));

if (process.argv[3] == "del") {
  for (var path in unused) {
    if (fs.statSync(path)
      .isDirectory()) {
      deleteFolderRecursive(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}