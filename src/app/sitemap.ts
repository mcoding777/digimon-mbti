import { ROUTES } from '@/utils/data/routes'
import type { MetadataRoute } from 'next'
import mbti from '@/app/result/data/mbti.json'
import { BASE_URL } from '@/utils/data/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const resultList: MetadataRoute.Sitemap = []

    for (const [key] of Object.entries(mbti)) {
        resultList.push({
            url: `${BASE_URL}${ROUTES.RESULT.DETAIL(key)}`,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 1,
        },)
    }

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 1,
        },
        {
            url: `${BASE_URL}${ROUTES.TEST}`,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 1,
        },
        ...resultList,
    ]
}