
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, {history} from './router/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login,logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

import { firebase } from './firebase/firebase';

const store = configureStore();


const jsx=(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

let hasRendered= false;

const renderApp=()=>{
    if (!hasRendered)
    {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered=true;
    }
}


//when app starts, retrieve existing data from database and update the store 
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));





//onAuthStateChanged triggers when a user logs in/logs out
//if logged in successfully, call-back fucntion (user)=>{} will be triggered
//acts as an event listener
//this gets called whenever a user presses login/logout/refresehs
firebase.auth().onAuthStateChanged((user)=>{
    if(user)
    {
        store.dispatch(login(user.uid));
        
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname==='/')
            {
                history.push('/dashboard');
            }
        })
        
    }
    else
    {
        store.dispatch(logout());
        renderApp();
        //when log out 
        history.push('/');
    }
})



