import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

//with the expense id, we can retrieve the global store
//by connect this component page to the store
//and find the particular expense 



export class EditExpensePage extends React.Component{

  onSubmit=(expense)=>{
    this.props.startEditExpense(this.props.expense.id,expense);
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
  startEditExpense: (id,expense)=>dispatch(startEditExpense(id,expense)),
  startRemoveExpense: (id)=>dispatch(startRemoveExpense(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);



