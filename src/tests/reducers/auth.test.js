
import authReducer from '../../reducers/auth'

test('should have default state set',()=>{
    const defaultState={}

    const result=authReducer(undefined,{type:'@@INIT'});

    expect(result).toEqual(defaultState);
})


test('should set uid for login', ()=>{
    const action={
        type:'LOGIN',
        uid:'123abc'
    }

    const state= authReducer({},action);
    expect(state).toEqual({
        uid:'123abc'
    })
})





test('should remove uid from state', ()=>{
    const action={
        type:'LOGOUT'
    }

    const state= authReducer({
        uid:'123abc'
    },action);
    expect(state).toEqual({})
})

