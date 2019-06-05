import timeConversion from './src/lib/timeConversion'
import timeDifference from './src/lib/timeConversion'

describe('timeDifference function', () => {
    it('works with ', () => {
        const startDate = new Date('2019-05-29T07:10:54.152Z')
        const endDate = new Date('2019-06-02T03:00:06.276Z')
        const time = timeDifference(startDate, endDate)
        expect(time.toEqual(86409848))
    })
})

describe('timeConversion function', () => {
    it('works with ', () => {
        const startDate = new Date('2019-05-29T07:10:54.152Z')
        const endDate = new Date('2019-06-02T03:00:06.276Z')
        const time = timeDifference(startDate, endDate)
        const timeConv = timeConversion(time)
        expect(timeConv.toEqual(86409848))
    })

    // const duration = {
    //     milliseconds: diffMs,
    //     days: diffDays,
    //     hours: diffHrs,
    //     minutes: diffMins,
    //     seconds: diffSecs,
    //     totalHours: totalHrs,
    // }
})
