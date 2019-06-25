import { differenceInMilliseconds, differenceInHours, format } from 'date-fns'

// function timeConversion(time) {
//     const diffMs = time

//     const diffDays = Math.floor(diffMs / 86400000)
//     const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
//     const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
//     const diffSecs = Math.round(((((diffMs % 86400000) % 3600000) % 60000) % 60000) / 1000)
//     const totalHrs = Math.floor(diffMs % 86400000)

//     const duration = {
//         milliseconds: diffMs,
//         days: diffDays.toString().padStart(2, '0'),
//         hours: diffHrs.toString().padStart(2, '0'),
//         minutes: diffMins.toString().padStart(2, '0'),
//         seconds: diffSecs.toString().padStart(2, '0'),
//         totalHours: totalHrs.toString().padStart(2, '0'),
//     }

//     return duration
// }

// function timeDifference(startDate, endDate) {
//     const diffMs = Math.abs(endDate - startDate)
//     return timeConversion(diffMs)
// }

function timeDifference(startDate, endDate) {
    if (startDate >= endDate) return null

    const diffMs = differenceInMilliseconds(endDate, startDate)

    const diffDays = Math.floor(diffMs / 86400000)
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
    // const diffDays = format(diffMs, 'DD')
    // const diffHrs = format(diffMs, 'HH')
    const diffMins = format(diffMs, 'mm')
    const diffSecs = format(diffMs, 'ss')
    const totalHrs = differenceInHours(endDate, startDate)

    const duration = {
        milliseconds: diffMs,
        days: diffDays.toString().padStart(2, '0'),
        hours: diffHrs.toString().padStart(2, '0'),
        minutes: diffMins.toString().padStart(2, '0'),
        seconds: diffSecs.toString().padStart(2, '0'),
        totalHours: totalHrs.toString().padStart(2, '0'),
    }

    return duration
}

export { timeDifference }
