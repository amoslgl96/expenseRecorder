import React from 'react';

import { connect } from 'react-redux';

import { Redirect, Route } from 'react-router-dom';

import Header from '../components/Header';

//...rest retrieves all the variables we did not destruct 



//when route renders component, it will pass in route props
//containing match , props, history

const privateRoute=({
    isAuthenticated,
    component:Component,
    ...rest
})=>{
    return(
    <Route {...rest} component={(props)=>(
            isAuthenticated ? (
                <div>
                    <Header/>
                    <Component {...props}/>
                </div>           
            ):
            <Redirect to="/"/>
            )

        }/>
    )
}



const mapStateToProps=(state)=>{
    return {
        isAuthenticated:!!state.auth.uid
    }
}


export default connect(mapStateToProps)(privateRoute);