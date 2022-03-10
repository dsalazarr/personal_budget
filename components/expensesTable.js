import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import { Autocomplete, TextField } from '@mui/material'

export default function ExpensesTable({data, categories1, categories2, handleChange}) {
    const rowData = data || []
    return (
        <TableContainer component={Paper} m={4}>
            <Table width="100%" m={4} aria-label="expenses table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell>Month</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Subcategory</TableCell>
                        <TableCell>Import</TableCell>
                        <TableCell>Movement</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.month}</TableCell>
                                <TableCell>
                                    <Autocomplete
                                        id="categories1"
                                        options={categories1}
                                        defaultValue={item.category1}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Category"/>}
                                        onChange={(event, newValue) =>
                                          handleChange("categories1", newValue, item.movement)
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Autocomplete
                                        id="categories2"
                                        defaultValue={item.category2}
                                        options={categories2}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Subcategory"/>}
                                        onChange={(event, newValue) =>
                                          handleChange("categories2", newValue, item.movement)
                                        }
                                    />
                                </TableCell>
                                <TableCell>{item.import} €</TableCell>
                                <TableCell>
                                    {item.movement}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}