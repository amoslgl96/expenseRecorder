import React from 'react';

import { Header } from '../../components/Header';

import { shallow } from 'enzyme';



//enzyme allows us to test dyanmic components that uses props
//and states
test('should render Header correctly', ()=>{
    const wrapper=shallow(<Header startLogout={()=>{}}/>);

    expect(wrapper).toMatchSnapshot();

})


//test if startLogout is called when logout button gets clicked

test("Should call startLogout on button click ",
()=>{
    const startLogout = jest.fn();
    const wrapper= shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})


