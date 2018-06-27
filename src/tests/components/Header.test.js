import React from 'react';

import Header from '../../components/Header';

import { shallow } from 'enzyme';



//enzyme allows us to test dyanmic components that uses props
//and states
test('should render Header correctly', ()=>{
    const wrapper=shallow(<Header/>);

    expect(wrapper).toMatchSnapshot();
 
    
})


