import { writeFileSync } from "fs";
import nextConnect from "next-connect";
import { getCategories, writeCategoriesMapping } from "../../utils/utils";

const apiRoute = nextConnect({})

apiRoute.post(async (req, res) => {
    const {field, movement, value} = req.body;

    const categoriesData = getCategories();
    const mapping = categoriesData[field + "Mapping"]
    const newMapping = {...mapping, [movement]: value}
    const newData = {
        ...categoriesData, [field + "Mapping"]: newMapping
    }
    writeCategoriesMapping(newData)
    res.status(204).json({})
})

export default apiRoute;