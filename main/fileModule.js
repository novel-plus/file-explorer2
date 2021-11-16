const path = require('path');
const { opendir, readFile } = require('fs/promises');

async function getDirectoryTree(dirName, {encoding="utf-8"}={}) {
    const result = {
        path: dirName,
        name: path.basename(dirName),
        items: []
    }
    const dir = await opendir(dirName, {encoding: encoding});
    for await (const dirent of dir) {
        const direntPath = path.join(dirName, dirent.name);
        if (dirent.isDirectory()) {
            const subTree = await getDirectoryTree(direntPath, encoding=encoding);
            result.items.push(subTree);
        } else {
            result.items.push({
                path: direntPath,
                name: dirent.name,
                items: null
            })
        }
    }
    return result;
}

async function getFileContent(fileName, {encoding="utf-8"}={}) {
    const result = {
        content: ""
    };
    result.content = await readFile(fileName, {encoding: encoding});
    return result;
}

module.exports = {
    getDirectoryTree: getDirectoryTree,
    getFileContent: getFileContent,
}