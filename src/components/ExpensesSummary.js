import React from 'react';

import {connect} from 'react-redux';

import numeral from 'numeral'
import { Link } from 'react-router-dom';
import selectTotalExpenses from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary=(props)=>{

    const expenseWord=props.expenseCount===1?'expense':'expenses';
    const expensesTotal=numeral(props.expensesTotal/100).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{props.expenseCount}</span> {expenseWord} totalling <span>{expensesTotal}</span> </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create"> Add Expense </Link>
                </div>
            </div>
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