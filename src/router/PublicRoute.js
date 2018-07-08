import React from 'react';

import { connect } from 'react-redux';

import { Redirect, Route } from 'react-router-dom';


//...rest retrieves all the variables we did not destruct 



//when route renders component, it will pass in route props
//containing match , props, history

const PublicRoute=({
    isAuthenticated,
    component:Component,
    ...rest
})=>{
    return(
    <Route {...rest} component={(props)=>(
            isAuthenticated ? (
                <Redirect to="/dashboard"/>

            ):
            <Component {...props}/>
            )

        }/>
    )
}



const mapStateToProps=(state)=>{
    return {
        isAuthenticated:!!state.auth.uid
    }
}


export default connect(mapStateToProps)(PublicRoute);