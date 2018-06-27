import React from 'react';

import {ExpenseList} from '../../components/ExpenseList';

import { shallow } from 'enzyme';


import test_expenses from '../fixtures/expenses'




test('Should return expenseList with all the test_expenses',
()=>{
    const wrapper=shallow(<ExpenseList expenses={test_expenses}/>);

    expect(wrapper).toMatchSnapshot();
})




//input conditional rendering in the expenseList component
//when no expenses, what should be rendered?

test('Should return expenseList with empty message',
()=>{
    const wrapper=shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
})
