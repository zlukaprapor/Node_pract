const http = require('http');

// Опції для GET-запиту
const getOptions = {
    hostname: 'localhost',
    port: 3000, // Змініть порт на той, на якому ви запустили свій HTTP сервер
    path: '/',
    method: 'GET',
};

// Опції для POST-запиту
const postData = 'Деякі дані у тілі POST-запиту';
const postOptions = {
    hostname: 'localhost',
    port: 3000, // Змініть порт на той, на якому ви запустили свій HTTP сервер
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(postData),
    },
};

// GET-запит
const getRequest = http.request(getOptions, (getResponse) => {
    let data = '';

    getResponse.on('data', (chunk) => {
        data += chunk;
    });

    getResponse.on('end', () => {
        console.log('GET Response:', data);
    });
});

getRequest.end();

// POST-запит
const postRequest = http.request(postOptions, (postResponse) => {
    let data = '';

    postResponse.on('data', (chunk) => {
        data += chunk;
    });

    postResponse.on('end', () => {
        console.log('POST Response:', data);
    });
});

// Відправлення даних у тілі POST-запиту
postRequest.write(postData);
postRequest.end();
