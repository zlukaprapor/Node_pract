const fs = require('fs');
const { Transform, PassThrough, EventEmitter } = require('stream');
const path = require('path');

// Шляхи до файлів
const inputFilePath = path.join(__dirname, 'source.txt');
const outputFilePath = path.join(__dirname, 'destination.txt');

// EventEmitter для сповіщення про завершення читання файлу та модифікацію даних
const fileProcessEmitter = new EventEmitter();

// Створення файлу з випадковим вмістом
fs.writeFile(inputFilePath, 'Це тестовий файл з деяким вмістом.', (err) => {
    if (err) throw err;
    console.log('Файл "source.txt" було успішно створено.');

    // Читання файлу у асинхронному режимі
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        // Виклик події завершення читання файлу
        fileProcessEmitter.emit('fileReadComplete', data);
    });
});

// Обробник події для успішного читання файлу
fileProcessEmitter.on('fileReadComplete', (data) => {
    // Створення читаючого потоку
    const readStream = fs.createReadStream(inputFilePath, 'utf8');

    // Створення записуючого потоку
    const writeStream = fs.createWriteStream(outputFilePath);

    // Потік перетворення для модифікації даних
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().toUpperCase()); // наприклад, перетворення тексту на верхній регістр
            callback();
        }
    });

    // Потік, що пропускає дані через себе без змін
    const passThroughStream = new PassThrough();

    // Перенаправлення даних з читаючого потоку у записуючий з використанням потоку перетворення
    readStream.pipe(transformStream).pipe(passThroughStream).pipe(writeStream);

    console.log('Data is being processed and written to the output file.');

    // Обробник завершення запису в файл
    writeStream.on('finish', () => {
        console.log('Data processing and writing to the output file complete.');
    });
});

