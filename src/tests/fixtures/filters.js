import moment from 'moment';



const filters={
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}




const alt_filters={
    text: '',
    sortBy: 'amount',
    startDate: moment(),
    endDate: moment().add(3,'days')
}



export { filters, alt_filters };