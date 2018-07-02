import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, startRemoveExpense} from '../actions/expenses';

//with the expense id, we can retrieve the global store
//by connect this component page to the store
//and find the particular expense 



export class EditExpensePage extends React.Component{

  onSubmit=(expense)=>{
    this.props.editExpense(expense);
    this.props.history.push('/')
  }


  onRemove=()=>{
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/')

  }
  
  render(){
  return (
    <div>
      <ExpenseForm
        expense={this.props.expense}
        onSubmit={this.onSubmit}/>

        
      <button onClick={this.onRemove}>Remove Expense</button>
    </div>

  );
  }

};


//array.find() -> if returns true, it would stop as it has
//found the particular item it is looking for

const mapStateToProps=(state,props)=>({
  expense: state.expenses.find((expense)=>{
    return expense.id===props.match.params.id
  })
})


const mapDispatchToProps=(dispatch)=>({
  editExpense: (expense)=>dispatch(editExpense(expense.id,expense)),
  startRemoveExpense: (id)=>dispatch(startRemoveExpense(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);


/*
Our react-router renders the HOC by calling connect()(editExpensePage)


passes props into the HOC,

hence for mapStateToProps,
the second arg props, is what the current props are,
or what props are being passed into editexpensepage,
this props is passed via the router.

using this current props,
we can work with the global state to retrieve
the correct expense to pass over to EditExpensePage
component as a prop.

*/
