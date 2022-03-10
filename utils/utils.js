import { readFileSync } from "fs";
import path from "path";
import { parse as parseCsv } from "csv-parse/sync"

export function getCategories() {
    const dataDirectory = path.join(process.cwd(), 'data')
    const jsonData = readFileSync(dataDirectory + '/data.json')
    const data = JSON.parse(jsonData)
    return data
}

export function parseExpensesCsvFile(fileBuffer) {
    const records = parseCsv(fileBuffer.toString('utf8'), {
        columns: true,
        trim: true,
        delimiter: ';',
        skipEmptyLines: true
    })
    return records
}
