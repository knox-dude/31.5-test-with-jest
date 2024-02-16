/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');

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

async function readFileOrUrl(text_or_url) {
    if (text_or_url.startsWith('http')) {
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