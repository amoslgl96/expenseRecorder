import React from 'react';

import {shallow} from 'enzyme';

import {EditExpensePage} from '../../components/EditExpensePage';

import test_expenses from '../fixtures/expenses'

//check if editExpensePage renders correctly, put in one of the expense from expenses


let history,startEditExpense,startRemoveExpense,wrapper,expense;

//need to do this way as for each tests, the history and onsubmit
//mock functions would be called with different arguments
//so need to reset for every test.
beforeEach(()=>{
    history={push:jest.fn()};
    startEditExpense=jest.fn();
    expense=test_expenses[0];
    startRemoveExpense=jest.fn();

    wrapper=shallow(<EditExpensePage 
    startEditExpense={startEditExpense} 
    history={history} 
    expense={expense} 
    startRemoveExpense={startRemoveExpense}/>)
})

test('Should render editExpensePage correctly',
()=>{
    expect(wrapper).toMatchSnapshot();
})

//check if editExpense onsubmit works correctly, with history.push and editExpense 
//being called with the correct arguments.


test('should handle editExpense for editing expense',
()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id,expense);

    expect(history.push).toHaveBeenLastCalledWith('/');
})




//check onRemove function, StartremoveExpense and history.push is called correctly
test('should handle startRemoveExpense',
()=>{
    

    wrapper.find('button').simulate('click');

    //test if props.history gets called correctly 
    expect(history.push).toHaveBeenLastCalledWith('/');

    //test if props.removeExpense gets called correctly
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);


    
})
