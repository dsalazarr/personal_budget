import multer from "multer";
import nextConnect from "next-connect"
import { getCategories, parseExpensesCsvFile, transformExpenseRow } from "../../utils/utils";
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
        return transformExpenseRow(item, categoriesData)
    })

    res.status(200).json({ data: result })

})

export const config = {
    api: {
        bodyParser: false
    }
}
export default apiRoute;