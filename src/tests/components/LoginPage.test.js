
import { shallow } from 'enzyme';

import React from 'react';

import {LoginPage} from '../../components/LoginPage';


test("Should render login page properly",()=>{

    const wrapper=shallow(<LoginPage startLogin={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();
})

//test if startLogin gets called when login is pressed
test("Should call startLogin on button click ",
()=>{
    const startLogin = jest.fn();
    const wrapper= shallow(<LoginPage startLogin={startLogin}/>);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
})
