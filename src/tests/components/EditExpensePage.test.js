import React from 'react';

import {shallow} from 'enzyme';

import {EditExpensePage} from '../../components/EditExpensePage';

import test_expenses from '../fixtures/expenses'

//check if editExpensePage renders correctly, put in one of the expense from expenses


let history,editExpense,removeExpense,wrapper,expense;

//need to do this way as for each tests, the history and onsubmit
//mock functions would be called with different arguments
//so need to reset for every test.
beforeEach(()=>{
    history={push:jest.fn()};
    editExpense=jest.fn();
    expense=test_expenses[0];
    removeExpense=jest.fn();

    wrapper=shallow(<EditExpensePage 
    editExpense={editExpense} 
    history={history} 
    expense={expense} 
    removeExpense={removeExpense}/>)
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
    expect(editExpense).toHaveBeenLastCalledWith(expense);

    expect(history.push).toHaveBeenLastCalledWith('/');
})




//check onRemove function, removeExpense and history.push is called correctly
test('should handle onRemove where expense is removed',
()=>{
    

    wrapper.find('button').simulate('click');

    //test if props.history gets called correctly 
    expect(history.push).toHaveBeenLastCalledWith('/');

    //test if props.removeExpense gets called correctly
    expect(removeExpense).toHaveBeenLastCalledWith({id:expense.id});


    
})
