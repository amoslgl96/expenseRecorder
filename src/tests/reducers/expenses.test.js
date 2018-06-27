
import test_expenses from '../fixtures/expenses';

import expensesReducer from '../../reducers/expenses';


//test if default state is set for expensesReducer 
test('Should set up default state',()=>{
    const result=expensesReducer(undefined,{type:'@@INIT'});

    expect(result).toEqual([]);

})


//test if addExpense reducer returns array with added expense
test('Should add an expense',()=>{

    const expense={
        id:3,
        description:'test add expense',
        note:'',
        amount:29500,
        createdAt:20000
    }

    const action={
        type:'ADD_EXPENSE',
        expense
    }
    const result=expensesReducer(test_expenses,action);

    expect(result).toEqual([...test_expenses,expense]);

})



//test if removeExpense reducer returns array without the removed expense 
test('Should remove an expense',()=>{
    const action={
        type:'REMOVE_EXPENSE',
        id:test_expenses[1].id
    }
    const result=expensesReducer(test_expenses,action);

    expect(result).toEqual([test_expenses[0],test_expenses[2]]);

})



//test if removeExpense reducer returns original array when a non existing id 
//is given 
test('Should not remove expenses if id not found',()=>{
    const action={
        type:'REMOVE_EXPENSE',
        id:'-1'
    }
    const result=expensesReducer(test_expenses,action);

    expect(result).toEqual(test_expenses);

})






//test if editExpense reducer returns state array with edited expense
test('Should edit an expense',()=>{
    const updates={
        notes:'changes'

    }
    const action={
        type:'EDIT_EXPENSE',
        id:test_expenses[1].id,
        updates
    }
    const result=expensesReducer(test_expenses,action);

    expect(result[1].notes).toBe(updates.notes);

})



//test if editExpense reducer returns state array intact
test('Should not edit any expense if id not found',()=>{
    const updates={
        notes:'changes'
    }
    const action={
        type:'EDIT_EXPENSE',
        id:-1,
        updates
    }
    const result=expensesReducer(test_expenses,action);

    expect(result).toEqual(test_expenses);

})
