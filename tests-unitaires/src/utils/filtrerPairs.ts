export function filtrerPairs(values: any[]): number[] {
    return values.filter(v => typeof v === 'number' && v % 2 === 0)
}
