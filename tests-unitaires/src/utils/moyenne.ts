export function moyenne(values: number[]): number {
    if (!Array.isArray(values) || values.length === 0) {
        throw new Error("Le tableau ne peut pas être vide")
    }
    const sum = values.reduce((acc, val) => acc + val, 0)
    return sum / values.length
}
