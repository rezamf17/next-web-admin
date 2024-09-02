import moment from 'moment';
import 'moment/locale/id'; // Import locale bahasa Indonesia

moment.locale('id'); // Set locale ke bahasa Indonesia

export const dashboardToday = (date) => {
    const formattedDate = moment(date).format('dddd, DD MMM YYYY');
    return formattedDate;
}