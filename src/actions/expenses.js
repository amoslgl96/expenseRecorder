import uuid from 'uuid';

import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});


export const startAddExpense=(expenseData={})=>{

  return (dispatch,getState)=>{
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense= { description, note, amount, createdAt};
    const uid=getState().auth.uid;

    //return this, so when dispatch(function), it returns below statement
    //this allows us to do our testing with .then() chaining
    return database.ref(`users/${uid}/expenses`).push(expense)
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
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
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
  return (dispatch,getState)=>{
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(
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

  return (dispatch,getState)=>{

  const uid=getState().auth.uid;
  
  //call data from firebase
  return database.ref(`users/${uid}/expenses`).once('value')
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


