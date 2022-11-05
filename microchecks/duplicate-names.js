import {readdirSync, lstatSync} from 'fs';

const filenames = {};

function readDir(directory)
{
    for (const file of readdirSync(directory, 'utf8')) {
        if (file.match(/\.md$/i)) {
            filenames[file.toLowerCase()] = filenames[file.toLowerCase()] || {files:[],count:0};
            filenames[file.toLowerCase()].count++;
            filenames[file.toLowerCase()].files.push(`${directory}/${file}`);
        } else if (file!=="node_modules" && lstatSync(`${directory}/${file}`).isDirectory()) {
            readDir(`${directory}/${file}`);
        }
    }
}

readDir(process.cwd());
let error = false;
for (const file of Object.keys(filenames)) {
    if (filenames[file].count > 1 && file!=="readme.md") {
        console.error(`${file} is used ${filenames[file].count}x times.`);
        for (const path of filenames[file].files) {
            console.log(`  ${path}`);
        }
        error = true;
    }
}

process.exit(error?1:0);
