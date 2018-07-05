import { firebase , googleAuthProvider} from 
'../firebase/firebase';


//we separate the login, logout action
//from startLogin and startLogout because, if we 
// dispatch the action inside them, it does not account for 
// implicit login where user is logged in but refreshes
// since startLogin/startLogout is triggered by button press

export const login=(uid)=>{
    return {
        type: 'LOGIN',
        uid
    }
}


export const logout=()=>{
    return {
        type: 'LOGOUT'
    }
}


//the login button will fire this startLogin
//async action
export const startLogin=()=>{
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}


//logout 
export const startLogout=()=>{
    return ()=>{
        return firebase.auth().signOut();
    }
}




