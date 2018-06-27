import React from 'react';

import ExpenseListItem from '../../components/ExpenseListItem';

import { shallow } from 'enzyme';


import test_expenses from '../fixtures/expenses'




test('Should return an expenseListItem',
()=>{
    const test_expense=test_expenses[0];
    const wrapper=shallow(<ExpenseListItem {...test_expense}/>);

    expect(wrapper).toMatchSnapshot();
})

