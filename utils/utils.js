import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { parse as parseCsv } from "csv-parse/sync"
import { parse as parseDate, format } from "date-fns"

const dataDirectory = path.join(process.cwd(), 'data')

export function getCategories() {
    const dataDirectory = path.join(process.cwd(), 'data')
    const jsonData = readFileSync(dataDirectory + '/data.json')
    const data = JSON.parse(jsonData)
    return data
}

export function writeCategoriesMapping(data) {
    writeFileSync(dataDirectory + '/data.json', JSON.stringify(data))
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

export function transformExpenseRow(row, dataMapping) {
    const category1 = dataMapping.categories1Mapping[row.movement]
    const category2 = dataMapping.categories2Mapping[row.movement]
    const movementDate = parseDate(row.movementDate, 'dd/MM/yy', new Date());
    const year = format(movementDate, 'yyyy');
    const month = format(movementDate, 'MMM')
    return {
        year, month, category1, category2, ...row
    }
}