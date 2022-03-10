import { writeFileSync } from "fs";
import nextConnect from "next-connect";
import { getCategories } from "../../utils/utils";

const apiRoute = nextConnect({})

apiRoute.post((req, res) => {
    const {field, movement, value} = req.body;

    const categoriesData = getCategories();
    const mapping = categoriesData[field + "Mapping"]
    const newMapping = {...mapping, [movement]: value}
    const newData = {
        ...categoriesData, [field + "Mapping"]: newMapping
    }
    writeFileSync(dataDirectory + '/data.json', JSON.stringify(newData))
    res.status(204).json({})
})

export default apiRoute;