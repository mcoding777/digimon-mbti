"use client"

import Spinner from "@/components/etc/Spinner"
import { useTestStore } from "@/hooks/useTestStore"
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
    const answers = useTestStore((state) => state.answers)
    const mbti = useMemo(() => {
        const result: Record<string, number> = {};

        answers.forEach((value) => {
            result[value] = result?.[value] || 0 + 1;
        })

        return `${findMbti(result, 'I', 'E')}${findMbti(result, 'N', 'S')}${findMbti(result, 'T', 'F')}${findMbti(result, 'J', 'P')}`
    }, [answers])
    const [matchData, setMatchData] = useState<Record<string, MatchData>>()
    const [digimon, setDigimon] = useState<DigimonData[]>()
    const result = useMemo(() => {
        if (mbti && matchData && digimon) {
            return matchData[mbti]
        }
        return null
    }, [mbti, matchData, digimon])

    useEffect(() => {
        fetch("/data/mbti.json")
            .then((res) => res.json())
            .then((data) => setMatchData(data));

        fetch("/data/digimon.json")
            .then((res) => res.json())
            .then((data) => setDigimon(data));
    }, [])

    if (!result) {
        return <Spinner />
    }

    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <div className="p-5">
                {/* 결과 헤더 */}
                <div className="text-center mb-8">
                    <div className="w-2/3 aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                        <img src={`/image/result/${digimon?.[result.id - 1].img}` || ''} className="w-full h-full object-cover" alt="디지몬" />
                    </div>
                    <p className="text-lg text-gray-600">
                        당신과 어울리는 디지몬은
                    </p>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {result?.name}
                    </h1>
                </div>

                {/* 한줄 요약 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                    <p className="text-md text-gray-700 text-center font-normal">
                        {result?.description}
                    </p>
                </div>

                {/* 공유 버튼 */}
                <div className="flex space-x-3 mb-6">
                    <button className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
                        결과 공유하기
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                        다시 테스트
                    </button>
                </div>
            </div>
        </div>
    )
}

function findMbti(obj: Record<string, number>, target1: string, target2: string) {
    const num1 = obj[target1], num2 = obj[target2];
    return num1 > num2 ? target1 : target2;

}