function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
): object {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    }
}

function describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
): string {
    const start: object = polarToCartesian(x, y, radius, endAngle)
    const end: object = polarToCartesian(x, y, radius, startAngle)

    const largeArcFlag: string = endAngle - startAngle <= 180 ? '0' : '1'

    const d: string = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
    ].join(' ')

    return d
}

function mapNumber(
    number: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
): number {
    const result: number = ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    return result
}

export { polarToCartesian, describeArc, mapNumber }
