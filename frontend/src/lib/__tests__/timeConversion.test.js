import { timeDifference } from '../timeConversion'

it('works with correct date', () => {
    const startDate = new Date('2019-05-29T07:10:54.152Z')
    const endDate = new Date('2019-06-02T03:00:06.276Z')
    const time = timeDifference(startDate, endDate)

    expect(time).toEqual({
        milliseconds: 330552124,
        days: '03',
        hours: '19',
        minutes: '49',
        seconds: '12',
        totalHours: '91',
    })
})

it('returns null when endDate is equal/before startDate', () => {
    const startDate = new Date('2019-06-02T03:00:06.276Z')
    const endDate = new Date('2019-05-29T07:10:54.152Z')
    const time = timeDifference(startDate, endDate)

    expect(time).toBe(null)
})
