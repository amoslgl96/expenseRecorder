import React from 'react';

import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

import { shallow } from 'enzyme';



test('Should return expenseDashboardPage containing expenseList and expenseListFilters',
()=>{
    const wrapper=shallow(<ExpenseDashboardPage/>);

    expect(wrapper).toMatchSnapshot();
})




