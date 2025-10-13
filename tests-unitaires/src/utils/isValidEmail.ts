export function isValidEmail(email: string): boolean {
    if (typeof email !== 'string' || email.trim() === '') return false
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}
