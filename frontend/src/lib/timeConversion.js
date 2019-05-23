function timeConversion(startDate, endDate) {
    const diffMs = Math.abs(endDate - startDate)
    const diffDays = Math.floor(diffMs / 86400000)
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
    const diffSecs = Math.round(((((diffMs % 86400000) % 3600000) % 60000) % 60000) / 1000)

    return {
        milliseconds: diffMs,
        days: diffDays < 10 ? `0${diffDays}` : diffDays,
        hours: diffHrs < 10 ? `0${diffHrs}` : diffHrs,
        minutes: diffMins < 10 ? `0${diffMins}` : diffMins,
        seconds: diffSecs < 10 ? `0${diffSecs}` : diffSecs,
    }
}

export default timeConversion

// function timeDifference(current, previous) {
//     const milliSecondsPerMinute = 60 * 1000
//     const milliSecondsPerHour = milliSecondsPerMinute * 60
//     const milliSecondsPerDay = milliSecondsPerHour * 24
//     const milliSecondsPerMonth = milliSecondsPerDay * 30
//     const milliSecondsPerYear = milliSecondsPerDay * 365
  
//     const elapsed = current - previous
  
//     if (elapsed < milliSecondsPerMinute / 3) {
//       return 'just now'
//     }
  
//     if (elapsed < milliSecondsPerMinute) {
//       return 'less than 1 min ago'
//     } else if (elapsed < milliSecondsPerHour) {
//       return Math.round(elapsed / milliSecondsPerMinute) + ' min ago'
//     } else if (elapsed < milliSecondsPerDay) {
//       return Math.round(elapsed / milliSecondsPerHour) + ' h ago'
//     } else if (elapsed < milliSecondsPerMonth) {
//       return Math.round(elapsed / milliSecondsPerDay) + ' days ago'
//     } else if (elapsed < milliSecondsPerYear) {
//       return Math.round(elapsed / milliSecondsPerMonth) + ' mo ago'
//     } else {
//       return Math.round(elapsed / milliSecondsPerYear) + ' years ago'
//     }
//   }
  
//   export function timeDifferenceForDate(date) {
//     const now = new Date().getTime()
//     const updated = new Date(date).getTime()
//     return timeDifference(now, updated)
//   }
  