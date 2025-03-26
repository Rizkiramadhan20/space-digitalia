import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Validate that we have an IP address
        if (!data.ip) {
            throw new Error('No IP address in response')
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching IP info:', error)
        return NextResponse.json({
            error: 'Failed to fetch IP info',
            ip: 'unknown' // Provide a fallback IP
        })
    }
}