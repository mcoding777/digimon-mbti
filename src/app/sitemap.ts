import { ROUTES } from '@/utils/data/routes'
import type { MetadataRoute } from 'next'
import mbti from '@/app/result/data/mbti.json'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
    const resultList: MetadataRoute.Sitemap = []

    for (const [key] of Object.entries(mbti)) {
        resultList.push({
            url: `${baseUrl}${ROUTES.RESULT.DETAIL(key)}`,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 1,
        },)
    }

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 1,
        },
        {
            url: `${baseUrl}${ROUTES.TEST}`,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 1,
        },
        ...resultList,
    ]
}