export function capitalize(str: string): string {
    if (typeof str !== 'string') {
        throw new Error('Entrée invalide : une chaîne est attendue')
    }
    if (str.length === 0) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}
