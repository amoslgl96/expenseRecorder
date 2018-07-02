

import {startAddExpense, startEditExpense, addExpense,removeExpense,editExpense, setExpenses, startSetExpenses, startRemoveExpense} from '../../actions/expenses';

import thunk from 'redux-thunk';
//to use the mock-store, we also need the thunk 

import configureMockStore from 'redux-mock-store';

import test_expenses from '../fixtures/expenses';

//to check if data was stored correctly in database
import database from '../../firebase/firebase';

//creating mockStore to test async action generators
const createMockStore=configureMockStore([thunk]);



//beforeEach test, we set the test database with the test_expenses 
//This allows us to test setExpenses in updating the redux store with data in firebase


beforeEach((done)=>{
    const expenses={};
    test_expenses.forEach(({id,description,note,amount,createdAt})=>{
        expenses[id]={
            description,
            note,
            amount,
            createdAt
        }
    });
    //overwrite whole of expenses in the db to be filled with test_expenses

    //to ensure that this async functions complete before beforeEach() gets done,
    //so that when test runs, the database is fully set up, we use done()
    database.ref('expenses').set(expenses).then(()=>done());
    
})

//test for removeExpense

test('Should setup remove expense action object',()=>{
    //const result=removeExpense({id:'123abc'});
    const result=removeExpense('123abc');
    expect(result).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
    })
})

//test for startRemoveExpense

test('Should remove expense from database',(done)=>{

    const store=createMockStore({});
    store.dispatch(startRemoveExpense(test_expenses[0].id)).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id:test_expenses[0].id
        })

        return database.ref(`expenses/${test_expenses[0].id}`)
        .once('value');

    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    })
})




//test for editExpense

test('Should setup edit expense action object',()=>{
    const result=editExpense('123abc',{description:'test',note:'Learning Jest'});
    expect(result).toEqual({
        type:'EDIT_EXPENSE',
        id:'123abc',
        updates:{
        description:'test',
        note:'Learning Jest'
        }
    })
})




test('should update database on edited expense',(done)=>{
    const store=createMockStore();
    const expense=test_expenses[0];
    store.dispatch(startEditExpense(expense.id,{description:'testing edit expense'}))
    .then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:'EDIT_EXPENSE',
            id:expense.id,
            updates:{
                description:'testing edit expense'
            }
        })

        //check if database expense is updated
        database.ref(`expenses/${expense.id}`).once('value')
        .then((snapshot)=>{
            expect(snapshot.val().description).toBe('testing edit expense');
            done();
        })

    })

  })



//test for addExpense

//for random values like uuid(), 
//jest has the method to account for that
//-> we only check the type of value we are 
//expecting using expect.any() method.
//string-> Constructor- String(), number-> Number()


test('Should setup add expense action object',()=>{
    const result=addExpense(test_expenses[2]);
    expect(result).toEqual({
        type:'ADD_EXPENSE',
        expense:test_expenses[2]
    })
})


//involves creating a mock store  - using a module called redux-mock-store
test('should add expense to database and store',
(done)=>{
    const store=createMockStore({});
    const expenseData={
        description:'Mouse',
        amount:3000,
        note:'This one is better',
        createdAt:1000
    };
    //promise chaining-> chain calls on promises
    //this .then() is chained to the return .then()
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        });

        //check if database is updated
        //return a promise here, so .then() can be executed
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData);
            done();
            });

});

test('should add expense with defaults to database and store',
(done)=>{
    const store=createMockStore({});

    store.dispatch(startAddExpense()).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{           
                    description : '',
                    note : '',
                    amount : 0,
                    createdAt : 0,
                    id:expect.any(String)

                    }
             });

        //check if database is updated
        //return a promise here, so .then() can be executed
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        }).then((snapshot)=>{
            expect(snapshot.val()).toEqual({
                            description : '',
                            note : '',
                            amount : 0,
                            createdAt: 0
                            });
                done();
                })

});


//test for setExpenses
test("should setup setExpenses action object",
()=>{
    const action=setExpenses(test_expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses:test_expenses
    })
})

//test startSetExpenses
test("Should fetch expenses from firebase",
(done)=>{
    const store=createMockStore({});
    store.dispatch(startSetExpenses()).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:"SET_EXPENSES",
            expenses: test_expenses
        })
        done();
    })
})




