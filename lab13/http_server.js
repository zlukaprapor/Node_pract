const http = require('http');

// Створення HTTP сервера
const http_server = http.createServer((req, res) => {
    // Отримання URL-шляху з запиту
    const url = req.url;

    // Визначення відповіді в залежності від URL-шляху
    let responseText = '';
    if (url === '/') {
        responseText = 'Hello, World!';
    } else if (url === '/about') {
        responseText = 'This is the About page.';
    } else if (url === '/contact') {
        responseText = 'Contact us at contact@example.com.';
    } else {
        responseText = 'Page not found.';
    }

    // Відправлення відповіді на клієнт
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(responseText);
});

// Прослуховування на певному порті (наприклад, 3000)
const port = 3000;
http_server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
