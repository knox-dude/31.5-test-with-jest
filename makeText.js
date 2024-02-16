/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require("./markov");

function cat(path, callback) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching webpage:', error);
        process.exit(1);
    }
}

let read_type;
let file_or_url;

if (!process.argv[2]) {
    console.log("Invalid cmdline arguments. Should be like: node makeText.js [file|url] [your_file.txt|your_url]")
    process.exit(1);
} else {
    read_type = process.argv[2];
    file_or_url=process.argv[3];
}

async function readFileOrUrl(text_or_url, user_choice=null) {
    if (text_or_url.startsWith('http') || user_choice == 'url') {
        return await webCat(text_or_url);
    } else {
        return new Promise((resolve, reject) => {
            cat(text_or_url, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}

const data = readFileOrUrl(file_or_url, read_type);
data.then((content) => {
    let mm = new MarkovMachine(content);
    console.log(mm.makeText());
    process.exit(0);
}).catch((error) => {
    console.error(error.message);
    process.exit(1);
});
