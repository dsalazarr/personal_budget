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

    try {
        const response = await axios.post(
            '/api/expenses',
            formData,
            options
        );
        console.log("formData: ", formData)
        const result = response.data
        console.log("result: ", result)
        return {data: result.data, error: false}
    } catch (error) {
        console.log('Error')
        return {data: undefined, error: true}
    }
    
}