import axios from "axios"

export default async function updateCategoriesMapping(field, value, movement) {
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        }
    }
    await axios.post(
        '/api/categories',
        {
            field, value, movement
        },
        options
    )
}

export async function getTransformedExpensesFromCsv(file) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const formData = new FormData()
    formData.append('csvfile', file)

    const response = await axios.post(
        '/api/expenses',
        formData,
        options
    )
    const result = response.data
    return result.data
}