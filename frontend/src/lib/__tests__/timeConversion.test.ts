import { timeDifference } from '../timeConversion'

it('works with correct date', () => {
    const startDate: Date = new Date('2019-05-29T07:10:54.152Z')
    const endDate: Date = new Date('2019-06-02T03:00:06.276Z')
    const time: object | null = timeDifference(startDate, endDate)

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
    const startDate: Date = new Date('2019-06-02T03:00:06.276Z')
    const endDate: Date = new Date('2019-05-29T07:10:54.152Z')
    const time: object | null = timeDifference(startDate, endDate)

    expect(time).toBe(null)
})
