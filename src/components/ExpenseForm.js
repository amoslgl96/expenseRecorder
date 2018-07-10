

import React from 'react';

//import the moment library 

import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

//remember we have webpack to convert this .css file
//into <style> tag into our .html page 
//you can find this .css file in the node_modules

//for the singleDatePicker component, we can find
//the props that we can pass into the component for usage

/*
with the datepicker,
we need to learn how to use the react-dates library
to generate moment instances from the moment library



We can also configure datepicker
to show how many number of months to be on display.

check the documentaton for the necessary props to show:

like numberOfMonths -> by default, 2 months is shown at once 
when focus is true.
we can set it to be 1 only 


we also want to be able to select months before today.


*/

export default class ExpenseForm extends React.Component {

    constructor(props)
    {
        //initialize the props
        super(props);
        //using ternary operator, we check if this.props.expense exist, if it does
        //populate the current values into the state

        //amount and createdAt, need to convert them to string values
        //b4 populating the state
        this.state={
            description: props.expense?props.expense.description:'',
            note: props.expense?props.expense.note:'',
            amount:props.expense?(props.expense.amount/100).toString():'',
            createdAt: props.expense? moment(props.expense.createdAt):moment(),
            calenderFocused: false,
            error:''
        }
    }


    onDescriptionChange=(e)=>{
        const description=e.target.value;
        this.setState(()=>({
            description
        }))
    }

    onNoteChange=(e)=>{
        const note=e.target.value;
        this.setState(()=>({
            note
        }))
    }




    onAmountChange=(e)=>{
        const amount=e.target.value;
        //the !amount allows us to clear the input, else
        //the regex would prevent our state to be set
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
        {
            this.setState(()=>({
                amount:amount
            }))
        }

    }


    //when you look at the API for SingleDatePicker
    //you would know that the onChange event handlerr receives
    //the moment date as arg much like what our 'e' is for onAmountChange
    onDateChange=(createdAt)=>{
        this.setState(()=>({
            createdAt
        }))
    }


    onFocusChange=({focused})=>{
        //console.log(focused);
        //focused means when the calender opens, and when it closes
        //when it opens = true, when closed= null
        this.setState(()=>({calenderFocused: focused}))
    }

    onSubmit=(e)=>{
        e.preventDefault();

        if(!this.state.description || !this.state.amount)
        {
            //set error state equal to 'Please provide description and amount.'
            this.setState(()=>({
                error: 'Please provide description and amount.'
            }))
        }

        else
        {
            //clear the error 
            this.setState(()=>({
                error: ''
            }))
            //with this onSubmit method passed down by either
            //addexpensePage or EditExpensePage
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10) * 100,
                //parseFloat helps to keep the decimal, and converts it from str to float value
                //10 as second arg meaning base 10,  *100 to keep it in terms of cents
                createdAt: this.state.createdAt.valueOf(),
                //for createdAt -> we also need to parse it, because we need a regular number
                //that represents its value instead of moment instance
                //using the moment obj method valueOf -> we can convert to number (Epoch number)
                note:this.state.note

            })
        }
    }

    render()
    {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input
                        type='text'
                        className='text-input'
                        placeholder='Description'
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    {/* while input type='number' already allows us to prevent
                    userinput from enter alphabets,
                    we need to also find a way to prevent users from entering
                    numbers with more than 2 decimal points. 
                    Hence, to get this done, we should just change the type to 'text'
                    so we can do our own validation code
                    */}
                    <input
                        type='text'
                        className='text-input'
                        placeholder='Amount'
                        value={this.state.amount}
                        onChange={this.onAmountChange}

                    />
                    {/*for the createAt which is
                    a date input, we would use a third-party
                    component for it */}

                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />
                    {/* The date props - moment object that represents where we want to start

                        onDateChange-> is a function that we can create that
                        would be called with Moment instance when someone picks a new day



                    */ }

                    <textarea 
                        className='textarea'
                        placeholder='Add a note for your expense'
                        value={this.state.note}
                        onChange={this.onNoteChange}>

                    </textarea>

                    <div>
                        <button className="button">Save Expense</button>
                    </div>
                </form>
        )
    }
}