import selectTotalExpenses from '../../selectors/expenses-total';

import moment from 'moment';

import test_expenses from '../fixtures/expenses';


//test when no expenses 
test('should return 0 for no expenses',()=>{
    expect(selectTotalExpenses([])).toBe(0);
})


//test add up an expense
test('Should return an expense',()=>{
    expect(selectTotalExpenses([test_expenses[0]])).toBe(50000)
})


//test correctly add up multiple expenses
test('Should return total expenses',()=>{
    expect(selectTotalExpenses(test_expenses)).toBe(54695)
})



