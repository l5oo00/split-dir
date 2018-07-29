const pathLib = require('path');
const fs = require('fs-extra');

let subDirPrefix = 'package';
let fileCountPerDir = 500;

function split(dir, fileList) {
    let dirIndex = 0;
    let subDir = '';

    fileList.forEach((filePath, i) => {

        // 创建子文件夹
        if (i % fileCountPerDir === 0) {
            do {
                dirIndex++;
                subDir = pathLib.resolve(dir, subDirPrefix + '-' + dirIndex.toString());
            }
            while (fs.pathExistsSync(subDir));

            fs.ensureDirSync(subDir);
        }

        fs.moveSync(filePath, pathLib.resolve(subDir, pathLib.basename(filePath)));
    });
}

function readDir(dir) {
    const list = fs.readdirSync(dir);
    
    const dirList = [];
    const fileList = [];

    list.forEach(n => {
        const name = pathLib.resolve(dir, n);
        const stat = fs.statSync(name);

        if (stat.isDirectory()) {
            dirList.push(name);
        }
        else if (stat.isFile()) {
            fileList.push(name);
        }
    });

    if (fileList.length > fileCountPerDir) {
        split(dir, fileList);
    }

    dirList.forEach(readDir);
}

function start(rootDir, options = {}) {
    subDirPrefix = options.subDirPrefix || 'package';
    fileCountPerDir = options.fileCountPerDir || 500;

    readDir(rootDir);
}

exports.start = start;