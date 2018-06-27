import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses'



//change to class-based component, to abstract
// the addExpense out from the component 
// using mapDispatchToProps , another functionality 
// other than mapStateToProps.

export class AddExpensePage extends React.Component{
  onSubmit=(expense)=>{
    this.props.addExpense(expense);
    this.props.history.push('/');
  }
  render()
  {
    return(
       <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}/>
      </div>
        )
  }
}

// const AddExpensePage = (props) => (
//   <div>
//     <h1>Add Expense</h1>
//     <ExpenseForm
//       onSubmit={(expense)=>{
//         props.dispatch(addExpense(expense));
//         props.history.push('/');//this would not go thru the server/page refresh but via the BrowserRouter
//         }}/>
//   </div>
// );

const mapDispatchToProps=(dispatch)=>{
  return {
    addExpense:(expense)=>dispatch(addExpense(expense))
  }
}


export default connect(undefined,mapDispatchToProps)(AddExpensePage);
