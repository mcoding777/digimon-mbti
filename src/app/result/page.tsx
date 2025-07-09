"use client"

import Spinner from "@/components/etc/Spinner"
import RestartButton from "@/components/result/RestartButton"
import ShareButton from "@/components/result/ShareButton"
import { useSmoothScrollControl } from "@/hooks/useSmoothScroll"
import { useTestStore } from "@/hooks/useTestStore"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

interface MatchData {
    id: number
    name: string
    mbti: string
    description: string
}

interface DigimonData {
    id: number
    name: string
    mbti: string
    partnerId: number
    img: string
    description: string
}

export default function Result() {
    const { container } = useSmoothScrollControl()

    const searchParams = useSearchParams()
    const mbti = searchParams.get('mbti')

    const answers = useTestStore((state) => state.answers)
    const [matchData, setMatchData] = useState<Record<string, MatchData>>()
    const [digimon, setDigimon] = useState<DigimonData[]>()
    const result = useMemo(() => {
        if (mbti && matchData && digimon) {
            return matchData[mbti]
        }
        return null
    }, [mbti, matchData, digimon])

    useEffect(() => {
        if (mbti || answers.size === 0) return;

        const count: Record<string, number> = {};

        answers.forEach((value) => {
            count[value] = (count?.[value] || 0) + 1;
        })
        const result = `${findMbti(count, 'I', 'E')}${findMbti(count, 'N', 'S')}${findMbti(count, 'T', 'F')}${findMbti(count, 'J', 'P')}`

        const params = new URLSearchParams(searchParams.toString())
        params.set('mbti', result)
        window.history.pushState(null, '', `?${params.toString()}`)
    }, [mbti, answers])

    useEffect(() => {
        if (!mbti) return

        fetch("/data/mbti.json")
            .then((res) => res.json())
            .then((data) => setMatchData(data));

        fetch("/data/digimon.json")
            .then((res) => res.json())
            .then((data) => setDigimon(data));
    }, [mbti])

    if (!mbti || !result) {
        return <Spinner text="결과를 분석중입니다." />
    }

    return (
        <div className="max-h-[70vh] flex flex-col gap-[20px]">
            <div ref={container} className="flex-1 overflow-y-auto custom-scrollbar relative pt-5">
                <div className="overflow-y-auto custom-scrollbar h-full">
                    {/* 결과 헤더 */}
                    <div className="text-center">
                        <div className="w-2/3 aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                            <img src={`/image/result/${digimon?.[result.id - 1].img}` || ''} className="w-full h-full object-cover" alt="디지몬" />
                        </div>
                        <div className="mt-6 mb-6">
                            <p className="text-lg text-gray-600">
                                당신과 어울리는 디지몬은
                            </p>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                {result?.name}
                            </h1>
                        </div>
                    </div>

                    {/* 한줄 요약 */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                        <p className="text-md text-gray-700 text-center font-normal">
                            {result?.description}
                        </p>
                    </div>
                </div>

                {/* 스크롤 그라디언트 오버레이 */}
                <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

            {/* 공유 버튼 */}
            <div className="flex space-x-3 shrink-0">
                <ShareButton />
                <RestartButton />
            </div>
        </div>
    )
}

function findMbti(obj: Record<string, number>, target1: string, target2: string) {
    const num1 = obj?.[target1] || 0, num2 = obj?.[target2] || 0;
    return num1 > num2 ? target1 : target2;

}