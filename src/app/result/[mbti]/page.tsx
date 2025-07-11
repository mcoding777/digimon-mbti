import Spinner from "@/components/etc/Spinner"
import { Suspense, } from "react"
import ResultContent from "./ResultContent"
import { Metadata } from "next";
import { DigimonData, MatchData } from "@/utils/types/result";
import matchData from '@/app/result/data/mbti.json';
import digimonData from '@/app/result/data/digimon.json';

interface ResultSearchParams {
    mbti: string;
    imgName: string;
    name: string
}

type MbtiKey = keyof typeof matchData;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export async function generateMetadata({ params }: { params: Promise<ResultSearchParams> }): Promise<Metadata> {
    const { mbti } = await params

    const matchMbti: MatchData = matchData[mbti as MbtiKey]
    const digimon: DigimonData = digimonData[matchMbti.id - 1]

    // 결과페이지에 맞게 OG 메타태그 구성
    return {
        title: `내 디지몬은 ${digimon.name}이야`,
        description: '너의 디지몬은 누굴까?',
        openGraph: {
            title: `내 디지몬은 ${digimon.name}이야`,
            description: '너의 디지몬은 누굴까?',
            images: [`${baseUrl}/image/result/${digimon.img}`],
        },
    };
}

export async function generateStaticParams() {
    const newData = []
    for (const [key] of Object.entries(matchData)) {
        newData.push({ mbti: key })
    }

    return newData
}

export default async function Result({ params }: { params: Promise<ResultSearchParams> }) {
    const { mbti } = await params

    const matchMbti: MatchData = matchData[mbti as MbtiKey]
    const matchDigimon = digimonData[matchMbti.id - 1]

    if (!mbti || !matchMbti) {
        return <Spinner text="결과를 분석중입니다." />
    }

    return (
        <ResultContent {...matchDigimon} description={matchMbti.description} />
    )
}