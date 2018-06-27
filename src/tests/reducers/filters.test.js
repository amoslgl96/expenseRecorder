
import filtersReducer from '../../reducers/filters';
import moment from 'moment';



//test for filters default state
test('should have default state set',()=>{
    const defaultState={
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }

    const result=filtersReducer(undefined,{type:'@@INIT'});

    expect(result).toEqual(defaultState);
})



//check set_text_filter reducer 
//return obj should have text prop
//set correctly 


test('Should set text filter',
()=>{
    const action={
        text:'Testing by Amos',
        type:'SET_TEXT_FILTER'
    }
    
    const result=filtersReducer(undefined,action);

    expect(result.text).toBe('Testing by Amos');
})



//check sort_by_amount reducer 
//return obj should have sortBy prop set to amount


test('Should return state with sortBy property set to amount',
()=>{
    const action={
        type:'SORT_BY_AMOUNT'
    }
    
    const result=filtersReducer(undefined,action);

    expect(result.sortBy).toBe('amount');
})





//check sort_by_date reducer 
//return obj should have sortBy prop set to date


test('Should return state with sortBy property set to date',
()=>{
    //since default sortBy is date, we need to redefine the default
    //state 

    const filtersReducerDefaultState={
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const action={
        type:'SORT_BY_DATE'
    }
    
    const result=filtersReducer(filtersReducerDefaultState,action);

    expect(result.sortBy).toBe('date');
})




//check set_start_date reducer 
//return obj should have startDate prop
//set correctly 


test('Should set startDate filter',
()=>{
    const action={
        startDate:moment(),
        type:'SET_START_DATE'
    }
    
    const result=filtersReducer(undefined,action);

    expect(result.startDate).toEqual(moment());
})

//for moment , arrays, objects -> need to use toEqual





//check set_end_date reducer 
//return obj should have endDate prop
//set correctly 


test('Should set endDate filter',
()=>{
    const action={
        endDate:moment(),
        type:'SET_END_DATE'
    }
    
    const result=filtersReducer(undefined,action);

    expect(result.endDate).toEqual(moment());
})
