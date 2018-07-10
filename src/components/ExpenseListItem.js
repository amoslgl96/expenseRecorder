
import React from 'react';
import { Link } from 'react-router-dom'

import moment from 'moment';

import numeral from 'numeral';
//wiring up edit_expense
//first set up a Link to edit-expense page with the expense' id


const ExpenseListItem=({description,amount,createdAt,id})=>(

        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">
                {moment(createdAt).format("MMMM Do, YYYY")}            
                </span>
            </div>
            
            <h3 className="list-item__data">
                {numeral(amount/100).format('$0,0.00')} 
            </h3>
            
        </Link>
       

)
//export const removeExpense = ({ id } = {}) => ({


export default ExpenseListItem;
//if connect() does not specify any arg
// it just means there are no state values passed into
// expenselistitem, but dispatch is still passed in