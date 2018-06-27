import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter,sortByDate,sortByAmount,setStartDate,setEndDate} from '../actions/filters'

/*
task: 
set dropdown for sortBy. and update
store according to what is selected
*/

//the dateRangePicker require local state to track focusedInput props
//hence ExpenseListFilters need to change into class based component
import { DateRangePicker } from 'react-dates';


export class ExpenseListFilters extends React.Component {
    
    state={
        calenderFocused: null
    };


    //this function will be called from react-dates library
    //this function will be called with an obj
    //this obj will have a startDate and endDate
    onDatesChange=({startDate, endDate})=>{
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    //this method would receive the new value as arg automatically
    onFocusChange=(calenderFocused)=>{
        this.setState(()=>({calenderFocused}))
    }

    onTextChange=(e)=>{
        this.props.setTextFilter(e.target.value);
    }


    onSortChange=(e)=>{
        let selectedOption=e.target.value;
        switch(selectedOption)
        {
            case 'date':
                this.props.sortByDate();
                break;
            case 'amount':
                this.props.sortByAmount();
                break;

        }
    }


    render() {
        return (
            <div>
                <input 
                value={this.props.filters.text} 
                onChange={this.onTextChange}
                type='text'/>
        
                <select 
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange
                    }>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>

                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={()=>false}
                    showClearDates={true}
                />
            </div>
        )
    }
}

//regular component 





//function to pass redux store data to ExpenseListFilters
const mapStateToProps=(state)=>({
    filters:state.filters
    //implicit dispatch() is also passed down as props
})



const mapDispatchToProps=(dispatch)=>({
    setStartDate:(startDate)=>{
        dispatch(setStartDate(startDate));
    },

    setEndDate:(endDate)=>{
        dispatch(setEndDate(endDate));
    },

    setTextFilter:(text)=>{
        dispatch(setTextFilter(text))
    },

    sortByDate:()=>{
        dispatch(sortByDate());
    },

    sortByAmount:()=>{
        dispatch(sortByAmount());
    }


})




//export default ExpenseListFilters;
export default connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilters);
