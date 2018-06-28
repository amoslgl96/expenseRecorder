
import React from 'react';
import { Link } from 'react-router-dom'

import moment from 'moment';

import numeral from 'numeral';
//wiring up edit_expense
//first set up a Link to edit-expense page with the expense' id


const ExpenseListItem=({description,amount,createdAt,id})=>(
    <div>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
        <p>
        {numeral(amount/100).format('$0,0.00')} 
        - 
        {moment(createdAt).format("MMMM Do, YYYY")}
        </p>
       
    </div>
)
//export const removeExpense = ({ id } = {}) => ({


export default ExpenseListItem;
//if connect() does not specify any arg
// it just means there are no state values passed into
// expenselistitem, but dispatch is still passed in