import uuid from 'uuid';

import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});


//action generator without redux-thunk would not be able to return a function
export const startAddExpense=(expenseData={})=>{
  //the return function gets called internally by redux with dispatch obj
  //over here, when an event happens, we will update the database with
  //the expense, and wait for the async to be done b4 dispatching-update the store

  return (dispatch)=>{
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense= { description, note, amount, createdAt};

    //return this, so when dispatch(function), it returns below statement
    //this allows us to do our testing with .then() chaining
    return database.ref('expenses').push(expense)
    .then((ref)=>{
      dispatch(addExpense({...expense,id:ref.key}));
    })
  }
}


// REMOVE_EXPENSE
// export const removeExpense = ({ id } = {}) => ({
//   type: 'REMOVE_EXPENSE',
//   id
// });
export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
});


// redux-thunk action generator for removeExpense
// returns a function for dispatch
export const startRemoveExpense=(id)=>{
  return (dispatch)=>{
    
    return database.ref(`expenses/${id}`).remove().then(()=>{
      dispatch(removeExpense(id));
    })
  }

}




// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});


export const startEditExpense = (id, updates)=>{
  return (dispatch)=>{

    return database.ref(`expenses/${id}`).update(updates).then(
      ()=>{
        dispatch(editExpense(id,updates));
      }
    )
  }
}


// SET_EXPENSES from firebase to store 
export const setExpenses=(expenses)=>(
  {
    type:'SET_EXPENSES',
    expenses
  }
)



// return function -> action generator
export const startSetExpenses=()=>{

  return (dispatch)=>{
  
  //call data from firebase
  return database.ref('expenses').once('value')
  .then((snapshot)=>{

    const expenses=[];

    snapshot.forEach((childSnapShot)=>{
      expenses.push({
        id:childSnapShot.key,
        ...childSnapShot.val()
      })
    })

    dispatch(setExpenses(expenses));
  })

  }
}


