import React from 'react';

import ExpenseForm from '../../components/ExpenseForm';

import { shallow } from 'enzyme';

import test_expenses from '../fixtures/expenses';

import moment from 'moment';


test('Should render expenseForm with default values',()=>{
    const wrapper=shallow(<ExpenseForm/>)
    expect(wrapper).toMatchSnapshot();
})




test('Should render expenseForm with the correct expense data',
()=>{
    const wrapper=shallow(<ExpenseForm expense={test_expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
})




//test if expenseForm when submitted, error output is rendered
//the state error would have value 

test('Should render error message when expenseForm is submitted w/o data',
()=>{
    const wrapper=shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
    //snapshot to check b4 error message appears is what it is

    wrapper.find('form').simulate('submit',{preventDefault:()=>{}});
    //simulate submit forms with no input data. set preventDefault to be nothing
    //so when the onSubmit method in expenseform gets called, e.preventdefault is not triggered
    //for testing


    //after simulate submit, wrapper would be a diferent dom, with error output rendered.
    
    //check if error state is updated.
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    //to check for error output, we can use snapshot.
    expect(wrapper).toMatchSnapshot();


})





//test expenseForm onDescriptionChange
test('state description should change on onDescriptionChange',
()=>{
    const wrapper=shallow(<ExpenseForm/>);
    const value='test w jest';
    wrapper.find('input').at(0).simulate('change',{target:{
        value
    }});

    expect(wrapper.state('description')).toBe(value);
})




//test expenseForm onNoteChange
test('state note should change on onNoteChange',
()=>{
    const wrapper=shallow(<ExpenseForm/>);
    const value='test note with jest';
    wrapper.find('textarea').at(0).simulate('change',{target:{
        value
    }});

    expect(wrapper.state('note')).toBe(value);
})



//test onAmountChange , with correct amount entered

test('state amount should change on onAmountChange',
()=>{
    const wrapper=shallow(<ExpenseForm/>);
    const value='12.50';
    wrapper.find('input').at(1).simulate('change',{target:{
        value
    }});

    expect(wrapper.state('amount')).toBe(value);
})





//test onAmountChange , with incorrect amount entered

test('state amount should not change on onAmountChange',
()=>{
    const wrapper=shallow(<ExpenseForm/>);
    const value='12.5044';
    wrapper.find('input').at(1).simulate('change',{target:{
        value
    }});

    expect(wrapper.state('amount')).toBe('');
})




//test whether props onSubmit gets called and submits the correct data 
//using spies(mock function : jest.fn() -> to act as the props onSubmit for testing)

test("should call onSubmit prop for valid form submission",
()=>{
    const spyOnSubmit=jest.fn();
    //The jest object is automatically in scope within every test file. The methods in the jest object help create mocks and let you control Jest's overall behavior.
    const wrapper=shallow(<ExpenseForm expense={test_expenses[0]} onSubmit={spyOnSubmit}/>);

    //simulate wrapper being submitted
    wrapper.find('form').simulate("submit",{preventDefault:()=>{ }})

    //check if error state is populated
    expect(wrapper.state('error')).toBe('');

    //if error state is not populated, check if props onSubmit is submitted correctly
    expect(spyOnSubmit).toHaveBeenLastCalledWith({
        description:test_expenses[0].description,
        amount:test_expenses[0].amount,
        createdAt:test_expenses[0].createdAt,
        note:test_expenses[0].note
    })
    //https://facebook.github.io/jest/docs/en/expect#tohavebeenlastcalledwitharg1-arg2-

})



//onDateChange
// retrieve the onDateChange function prop from datepicker
// then call the function, and check date state 


test('onDateChange should update state createdAt',
()=>{
    const now=moment();
    const wrapper=shallow(<ExpenseForm/>);
    //find the component singledatepicker, call the function ondateChange with moment()
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);

    //check state
    expect(wrapper.state('createdAt')).toEqual(now);

})



//onFocusChange

test('onFocusChange should update state calenderFocused',
()=>{

    const wrapper=shallow(<ExpenseForm/>);
    //find the component singledatepicker, call the function onFocusChange with moment()
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused:true});

    //check state
    expect(wrapper.state('calenderFocused')).toBe(true);

})

