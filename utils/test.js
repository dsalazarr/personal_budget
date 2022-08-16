import assert from "assert";
import { transformExpenseRow } from "utils";

describe('transformExpenseRow', () => {
    const row = {
        movement: 'Glovo',
        movementDate: '10/03/2022',
    }
    const categoriesMapping = {
        categories1: {
            Glovo: 'Leisure',
        },
        categories2: {
            Glovo: 'Delivery'
        }
    }
    it('should assign category from mapping', () => {
        const newRow = transformExpenseRow(row, categoriesMapping)
        assert.equal(newRow.categories1, "Leisure")
        assert.equal(newRow.categories2, "Delivery")
    })
})