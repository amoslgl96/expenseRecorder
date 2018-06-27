
import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

import test_expenses from '../fixtures/expenses';


//test selector for filter text and date-sortBy


test('Should setup array of selected expenses with filtered text and date sorted descendingly',
()=>{
    const filters={
        text:'e',
        sortBy:'date',
        startDate: undefined,
        endDate: undefined
    };

    const result=selectExpenses(test_expenses,filters);

    expect(result).toEqual([
        test_expenses[0],
        test_expenses[1]
    ])
})




//test selector for startDate 

test('Should filter by startDate',()=>{
    const filters={
        text:'',
        sortBy:'date',
        startDate: moment(0),
        endDate: undefined
    };

    const result=selectExpenses(test_expenses,filters);

    expect(result).toEqual([
        test_expenses[0],
        test_expenses[2]
    ])
})

//when refactoring codes, there might be errors,
//and via this test code, we can identify them




//test selector for endDate
test('Should filter by endDate',()=>{
    const filters={
        text:'',
        sortBy:'date',
        startDate: undefined,
        endDate: moment(0)
    };

    const result=selectExpenses(test_expenses,filters);

    expect(result).toEqual([
        test_expenses[2],
        test_expenses[1]
    ])
})



//test selector for sortByDate 
test('Should sort by date',()=>{
    const filters={
        text:'',
        sortBy:'date',
        startDate: undefined,
        endDate: undefined
        };

    const result=selectExpenses(test_expenses,filters);

    expect(result).toEqual([
        test_expenses[0],
        test_expenses[2],
        test_expenses[1]
    ])
})





//test selector for sortByAmount 

test('Should sort by date',()=>{
    const filters={
        text:'',
        sortBy:'amount',
        startDate: undefined,
        endDate: undefined
        };

    const result=selectExpenses(test_expenses,filters);

    expect(result).toEqual([
        test_expenses[0],
        test_expenses[1],
        test_expenses[2]
    ])
})