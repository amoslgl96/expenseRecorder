import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses'



//change to class-based component, to abstract
// the addExpense out from the component 
// using mapDispatchToProps , another functionality 
// other than mapStateToProps.

export class AddExpensePage extends React.Component{
  onSubmit=(expense)=>{
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }
  render()
  {
    return(
       <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        
        <div className="content-container">
        <ExpenseForm
          onSubmit={this.onSubmit}/>
        </div>
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
    //dispatch(startAddExpense):
    //passes dispatch, and getState as parameters
    startAddExpense:(expense)=>dispatch(startAddExpense(expense))
  }
}


export default connect(undefined,mapDispatchToProps)(AddExpensePage);
