//file that runs to allow us 
// to configure the environment 
// we are running in

// we are gonna wire up the adapter 
// to connect enzyme to react v16. 
// Then enzyme can provide the needed 
// support to reactV16 for testing



import DotEnv from 'dotenv';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter:new Adapter()
})

DotEnv.config({path:'.env.test'});