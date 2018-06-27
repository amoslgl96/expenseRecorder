

import moment from 'moment';

export default [
    {
        description:'Rent',
        note:'every month',
        amount:50000,
        createdAt:moment(0).add(4,'days').valueOf(),
        id:'1'
    },

    {
        description:'Credit Card',
        note:'',
        amount:4500,
        createdAt:moment(0).subtract(4,'days').valueOf(),
        id:'2'
    },

    {
        description:'Gum',
        note:'',
        amount:195,
        createdAt:0,
        id:'3'
    }

    
]