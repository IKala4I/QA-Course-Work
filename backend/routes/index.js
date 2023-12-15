import express from 'express';
import fs from 'fs';
import {checkCode} from '../utils/eslintChecker.js';
import path from 'path';

const router = express.Router();

const fileNames = ['Filtration', 'Searching', 'Sorting', 'Validation'];
const paths = ['./shared/scripts/Filtration.js', './shared/scripts/Searching.js', './shared/scripts/Sorting.js', './shared/scripts/Validation.js'];

/* GET home page. */
router.get('/statistic', async function (req, res, next) {
    try {
        const {separate} = req.query;

        if (separate) {
            const errors = await checkFiles();
            res.status(200).send(errors);
        } else {
            const errors = await checkFiles();
            const combinedErrors = combineErrors(errors);
            res.status(200).send(combinedErrors);
        }
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/statistic/files', function (req, res, next) {
    try {
        res.status(200).send(fileNames);
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/statistic/:fileName', async function (req, res, next) {
    try {
        const {fileName} = req.params;

        if (!fileNames.includes(fileName))
            return res.status(400).send('Invalid file name');

        const path = paths.find(path => path.includes(fileName));

        const errors = await checkFile(path);
        res.status(200).send(errors);
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
});

async function checkFiles() {
    const errorDictionary = {};

    for (const filePath of paths) {
        const fileName = path.basename(filePath, path.extname(filePath));
        const errors = await checkFile(filePath);
        errorDictionary[fileName] = errors;
    }
    return errorDictionary;
}

async function checkFile(path) {
    let errors;

    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', async function (err, data) {
            if (err) {
                console.error(`Помилка при читанні файлу: ${err}`);
                reject(err);
            } else {
                errors = await checkCode(data);
                resolve(errors);
            }
        });
    });
}

function combineErrors(inputObject) {
    const result = {};

    for (const category in inputObject) {
        const categoryErrors = inputObject[category];

        for (const errorType in categoryErrors) {
            if (!result[errorType]) {
                result[errorType] = 0;
            }

            result[errorType] += categoryErrors[errorType];
        }
    }

    return result;
}

export default router;