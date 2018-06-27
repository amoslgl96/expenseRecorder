//file that runs to allow us 
// to configure the environment 
// we are running in

// we are gonna wire up the adapter 
// to connect enzyme to react v16. 
// Then enzyme can provide the needed 
// support to reactV16 for testing



import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter:new Adapter()
})
//can refer to docs airbnb/enzyme for it



//we would need to have a jest configuration file
//jest.config.js 
// to indicate that this setUpTest file 
// should be run 


//.setUpFiles-> specify files to run before you run your tests 
