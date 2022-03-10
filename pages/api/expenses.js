import fs from "fs";
import { parse } from "csv-parse/sync";
import { parse as parseDate, format } from "date-fns";
import multer from "multer";
import nextConnect from "next-connect"
import path from "path";
import { getCategories, parseExpensesCsvFile } from "../../utils/utils";
const upload = multer({
    storage: multer.memoryStorage()
});

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: 'Method not allowed' });
    },
})

apiRoute.use(upload.single('csvfile'));

apiRoute.post(async (req, res) => {
    const file = req.file

    const records = parseExpensesCsvFile(file.buffer)
    const categoriesData = getCategories()
    const result = records.map((item, index) => {
        const category1 = categoriesData.categories1Mapping[item.movement]
        const category2 = categoriesData.categories2Mapping[item.movement]
        const movementDate = parseDate(item.movementDate, 'dd/MM/yy', new Date());
        const year = format(movementDate, 'yyyy');
        const month = format(movementDate, 'MMM')
        return {
            year, month, category1, category2, ...item
        }
    })

    res.status(200).json({ data: result })

})

export const config = {
    api: {
        bodyParser: false
    }
}
export default apiRoute;