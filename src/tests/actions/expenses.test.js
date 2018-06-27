

//objects {} is not equal to another obj {}
//so is array []  !== []
//hence {'a':1,'b':2} !== {'a':1,'b':2}

//hence to check for a function that returns obj,
//we have to check the properties of the obj

//Jest provides a method for that .isEqual -> which helps
//you to check the properties one-by-one 


import {addExpense,removeExpense,editExpense} from '../../actions/expenses';



//test for removeExpense

test('Should setup remove expense action object',()=>{
    const result=removeExpense({id:'123abc'});
    expect(result).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
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



//test for addExpense

//for random values like uuid(), 
//jest has the method to account for that
//-> we only check the type of value we are 
//expecting using expect.any() method.
//string-> Constructor- String(), number-> Number()


test('Should setup add expense action object',()=>{
    const expense={
        description:'testing using jest',
        note:'taught via udemy',
        amount:5000,
        createdAt:1000
        };
    const result=addExpense(expense);
    expect(result).toEqual({
        type:'ADD_EXPENSE',
        expense:
        {
        ...expense,
        id:expect.any(String)
        }
    })
})


//test for default addExpense

test('Should setup add expense action object with default values',
()=>{
    const result=addExpense();
    expect(result).toEqual({
        type:'ADD_EXPENSE',
        expense:
        {
        description : '',
        note : '',
        amount : 0,
        createdAt : 0,
        id:expect.any(String)
        }
    })
})