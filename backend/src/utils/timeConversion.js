function timeConversion(startDate, endDate) {
    const diffMs = Math.abs(endDate - startDate)
    const diffDays = Math.floor(diffMs / 86400000)
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
    const diffSecs = Math.round(((((diffMs % 86400000) % 3600000) % 60000) % 60000) / 1000)

    return {
        milliseconds: diffMs,
        days: diffDays,
        hours: diffHrs < 10 ? `0${diffHrs}` : diffHrs,
        minutes: diffMins < 10 ? `0${diffMins}` : diffMins,
        seconds: diffSecs < 10 ? `0${diffSecs}` : diffSecs,
    }
}

exports.timeConversion = timeConversion
