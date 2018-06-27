import React from 'react';

import {filters, alt_filters} from '../fixtures/filters';

import {shallow} from 'enzyme';

import moment from 'moment';

import {ExpenseListFilters} from '../../components/ExpenseListFilters';



let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount,
wrapper;


beforeEach(()=>{
    
    setStartDate=jest.fn();
    setEndDate=jest.fn();
    setTextFilter=jest.fn();
    sortByDate=jest.fn();
    sortByAmount=jest.fn();

    wrapper=shallow(<ExpenseListFilters setStartDate={setStartDate}
    setEndDate={setEndDate} setTextFilter={setTextFilter}
    sortByDate={sortByDate} sortByAmount={sortByAmount}
    filters={filters}
    />)

})



test('Should render ExpenseListFilters correctly',
()=>{
    expect(wrapper).toMatchSnapshot();
})



test('Should render expenseListFilters correctly with non-default filters',
()=>{
    //overwrite the props for wrapper
    wrapper.setProps({ filters: alt_filters });
    expect(wrapper).toMatchSnapshot();
})



//handle text change
test('onTextChange should be triggered with the correct text input',
()=>{
    const value='test';
    wrapper.find('input').simulate('change',{target:{
        value
    }})

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})




//sort by Date

test('onSortChange should be triggered with sortByDate called',
()=>{
    const value='date';
    wrapper.setProps({
        filters:alt_filters
    })
    wrapper.find('select').simulate('change',{target:{
        value
    }})

    expect(sortByDate).toHaveBeenCalled();
    expect(sortByAmount).not.toHaveBeenCalled();
})



//sort by Amount
test('onSortChange should be triggered with sortByAmount called',
()=>{
    const value='amount';
    wrapper.find('select').simulate('change',{target:{
        value
    }})

    expect(sortByDate).not.toHaveBeenCalled();
    expect(sortByAmount).toHaveBeenCalled();
})



//handle date changes , //check if setStartDate and enDate is called with correct dates 
test('onDatesChange should be triggered with setStartDate and setEndDate called correctly',
()=>{

    const startDate=moment(0).add(4,'years');
    const endDate=moment(0).add(8,'years');

    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,
    endDate});

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})


//handle date focus change 
//check if state is updated
//onFocusChange
test('onFocusChange should be triggered and set calenderFocused correctly',
()=>{
    const calenderFocused='endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
    
})



