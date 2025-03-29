import { useState, useEffect } from 'react'
import { database } from '@/utils/firebase'
import { ref, set, onValue, get } from 'firebase/database'

export function useArticleViews(slug: string) {
    const [viewCount, setViewCount] = useState(0)

    useEffect(() => {
        const viewCountRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
        const viewCountUnsubscribe = onValue(viewCountRef, (snapshot) => {
            setViewCount(snapshot.val() || 0)
        })

        const recordView = async () => {
            const sessionKey = `article_view_${slug}`
            if (sessionStorage.getItem(sessionKey)) return

            try {
                const response = await fetch('/api/ip-info')
                const data = await response.json()

                const ipIdentifier = data.ip ? data.ip.replace(/\./g, '_') : 'unknown'
                const visitorRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/visitors/${ipIdentifier}`)
                const visitorSnapshot = await get(visitorRef)

                if (!visitorSnapshot.exists()) {
                    await set(visitorRef, {
                        first_visit: new Date().toISOString(),
                        last_visit: new Date().toISOString(),
                        city: data.city || 'unknown',
                        region: data.region || 'unknown',
                        country: data.country_name || 'unknown',
                        latitude: data.latitude || 0,
                        longitude: data.longitude || 0,
                        isp: data.org || 'unknown',
                        timezone: data.timezone || 'unknown',
                        visit_count: 1
                    })

                    const totalRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
                    const totalSnapshot = await get(totalRef)
                    await set(totalRef, (totalSnapshot.val() || 0) + 1)
                } else {
                    const currentData = visitorSnapshot.val()
                    await set(visitorRef, {
                        ...currentData,
                        last_visit: new Date().toISOString(),
                        visit_count: (currentData.visit_count || 0) + 1
                    })
                }

                sessionStorage.setItem(sessionKey, 'true')
            } catch (error) {
                console.error('Error recording view:', error)
                const anonymousRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/visitors/anonymous`)
                const anonymousSnapshot = await get(anonymousRef)

                if (!anonymousSnapshot.exists()) {
                    await set(anonymousRef, {
                        first_visit: new Date().toISOString(),
                        last_visit: new Date().toISOString(),
                        visit_count: 1
                    })

                    const totalRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
                    const totalSnapshot = await get(totalRef)
                    await set(totalRef, (totalSnapshot.val() || 0) + 1)
                }

                sessionStorage.setItem(sessionKey, 'true')
            }
        }

        recordView()
        return () => viewCountUnsubscribe()
    }, [slug])

    return { viewCount }
}