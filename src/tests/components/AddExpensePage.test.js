import React from 'react';
import {shallow} from 'enzyme';

import {AddExpensePage} from '../../components/AddExpensePage';

import test_expenses from '../fixtures/expenses';


let onSubmit, history , wrapper;

//Lifecycle method for jest
//this would be carried out before each test
beforeEach(()=>{
    onSubmit=jest.fn();
    history={push:jest.fn()};
    wrapper=shallow(<AddExpensePage addExpense={onSubmit} history={history}/>) 
})

//check if addExpensePage renders correctly

test('Check if addExpensePage renders correctly',
()=>{

    //take snapshot to see if renders correctly
    expect(wrapper).toMatchSnapshot();

    
})


//check props.onSubmit, props.history.push works correctly
test('should handle onSubmit ',
()=>{

    wrapper.find('ExpenseForm').prop('onSubmit')(test_expenses[0]);

    //test if props.history gets called correctly 
    expect(history.push).toHaveBeenLastCalledWith('/');

    //test if props.onSubmit gets called correctly
    expect(onSubmit).toHaveBeenLastCalledWith(test_expenses[0]);


    
})






