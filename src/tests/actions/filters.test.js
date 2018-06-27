import {setTextFilter, sortByDate, sortByAmount,
setStartDate,setEndDate} from '../../actions/filters';

import moment from 'moment';



//setStartDate test 

test('Should setup a setStartDate action object',
()=>{
    const result=setStartDate(moment(0));
    expect(result).toEqual({
        type:'SET_START_DATE',
        startDate:moment(0)
    })
})


//action generator setEndDate test
test('Should setup a setEndDate action object',
()=>{
    const result=setEndDate(moment(0));
    expect(result).toEqual({
        type:'SET_END_DATE',
        endDate:moment(0)
    })
})



//action generator setTextFilter test 
test('Should setup a setTextFilter action object with text value',
()=>{
    const result=setTextFilter('amos');
    expect(result).toEqual({
        type:'SET_TEXT_FILTER',
        text:'amos'
    })
})


//action generator setTextFilter default value test 
test('Should setup a setTextFilter action object with default value',
()=>{
    const result=setTextFilter();
    expect(result).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    })
})


//action generator sortByDate
test('Should setup a sortByDate action object',
()=>{
    const result=sortByDate();
    expect(result).toEqual({
        type:'SORT_BY_DATE'
    })
})


//action generator sortByAmount
test('Should setup a sortByAmount action object',
()=>{
    const result=sortByAmount();
    expect(result).toEqual({
        type:'SORT_BY_AMOUNT'
    })
})


