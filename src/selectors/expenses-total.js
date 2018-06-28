
//take in array of expenses, cough out the total amount



export default (expenses)=>{
    return expenses.reduce((total_expense,expense)=>{
        return total_expense+expense.amount;
    },0)
}