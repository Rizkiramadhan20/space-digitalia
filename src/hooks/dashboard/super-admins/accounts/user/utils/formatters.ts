export const formatPhoneNumberForDisplay = (phoneNumber: string): string => {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '')

    // Check if it's empty
    if (!cleaned) return ''

    // Format based on length
    if (cleaned.length <= 3) {
        return cleaned
    } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    } else {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    }
}