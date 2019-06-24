import { timeDifference } from './timeConversion'

describe('timeDifference function', () => {
    it('works with correct date', () => {
        const startDate = new Date('2019-05-29T07:10:54.152Z')
        const endDate = new Date('2019-06-02T03:00:06.276Z')
        const time = timeDifference(startDate, endDate)
        expect(time.milliseconds).toEqual(330552124)
        expect(time.days).toEqual('03')
        expect(time.hours).toEqual('19')
        expect(time.minutes).toEqual('49')
        expect(time.seconds).toEqual('12')
        expect(time.totalHours).toEqual('91')
    })
})
