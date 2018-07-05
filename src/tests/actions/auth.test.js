
import {login,logout} from '../../actions/auth';



test("Should return action object with uid after login",()=>{
    const result=login('123abc');
    expect(result).toEqual({
        type:'LOGIN',
        uid:'123abc'
    })
})


test("Should return action object with no uid after logout",()=>{
    const result=logout();
    expect(result).toEqual({
        type:'LOGOUT',
    })
})