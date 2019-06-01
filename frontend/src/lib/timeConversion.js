function timeConversion(time) {
    const diffMs = time

    const diffDays = Math.floor(diffMs / 86400000)
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
    const diffSecs = Math.round(((((diffMs % 86400000) % 3600000) % 60000) % 60000) / 1000)
    const totalHrs = Math.floor(diffMs % 86400000)

    const duration = {
        milliseconds: diffMs,
        days: diffDays,
        hours: diffHrs < 10 ? `0${diffHrs}` : diffHrs,
        minutes: diffMins < 10 ? `0${diffMins}` : diffMins,
        seconds: diffSecs < 10 ? `0${diffSecs}` : diffSecs,
        totalHours: totalHrs < 10 ? `0${totalHrs}` : totalHrs,
    }
    // const duration = {
    //     milliseconds: diffMs,
    //     days: diffDays,
    //     hours: diffHrs,
    //     minutes: diffMins,
    //     seconds: diffSecs,
    //     totalHours: totalHrs,
    // }

    return duration
}

function timeDifference(startDate, endDate) {
    // const end = endDate === null ? new Date() : endDate
    const diffMs = Math.abs(endDate - startDate)
    // console.log(`timeDifference: ${diffMs}`)
    return timeConversion(diffMs)
}

export { timeConversion, timeDifference }
