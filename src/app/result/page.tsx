import Spinner from "@/components/etc/Spinner"
import { Suspense, } from "react"
import ResultContent from "./ResultContent"
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ mbti: string, imgName: string, name: string }> }): Promise<Metadata> {
    const { mbti, imgName, name } = await searchParams
    const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/image/result/${imgName}`;

    // 결과페이지에 맞게 OG 메타태그 구성
    return {
        title: `내 디지몬은 ${name}이야`,
        description: '너의 디지몬은 누굴까?',
        openGraph: {
            title: `내 디지몬은 ${name}이야`,
            description: '너의 디지몬은 누굴까?',
            images: [imageUrl],
        },
    };
}

export default function Result() {
    return (
        <Suspense fallback={<Spinner text="결과를 분석중입니다." />}>
            <ResultContent />
        </Suspense>
    )
}