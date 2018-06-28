import React from 'react';

import {connect} from 'react-redux';

import numeral from 'numeral'

import selectTotalExpenses from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary=(props)=>{

    const expenseWord=props.expenseCount===1?'expense':'expenses';
    const expensesTotal=numeral(props.expensesTotal/100).format('$0,0.00');

    return (
        <div>
        <h1>Viewing {props.expenseCount} {expenseWord} totalling {expensesTotal} </h1>
        </div>
    )
}

const mapStateToProps=(state)=>{
    const visibleExpenses=selectExpenses(state.expenses,state.filters);

    return {
        expenseCount:visibleExpenses.length,
        expensesTotal:selectTotalExpenses(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);