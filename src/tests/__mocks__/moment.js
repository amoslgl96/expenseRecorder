/* 
To ensure that a manual mock and its real implementation stay in sync, it might be useful to require the real module using require.requireActual(moduleName) in your manual mock and amending it with mock functions before exporting it.
-https://facebook.github.io/jest/docs/en/manual-mocks
*/

//instead of import moment from 'moment'
const moment=require.requireActual('moment');

export default (timestamp=0)=>{
    return moment(timestamp);
    //without actual moment specified above
    // this moment would be treated as the mock moment 
    // and this causes an infinite recursion loop
}