import Moment from 'moment-timezone'
import moment from 'moment'
function getIndoTime(date) {
    let getIndoDate = Moment.tz(new Date(moment(date).format()), 'Asia/Jakarta')
    let indoTime = getIndoDate.format()
    return indoTime;
}
export default getIndoTime;