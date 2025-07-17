"use client"

import RestartButton from "@/app/result/components/RestartButton"
import ShareButton from "@/app/result/components/ShareButton"
import { useSmoothScrollControl } from "@/hooks/useSmoothScroll"
import Image from "next/image"
import { DigimonData } from "@/utils/types/result"


export default function ResultContent({ name, img, description }: DigimonData) {
    const { container } = useSmoothScrollControl()

    return (
        <div className="max-h-[70vh] flex flex-col gap-[20px]">
            <div ref={container} className="flex-1 overflow-y-auto custom-scrollbar relative pt-5">
                <div className="overflow-y-auto custom-scrollbar h-full">
                    {/* 결과 헤더 */}
                    <div className="text-center">
                        <div className="w-2/3 aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden relative">
                            <Image fill priority src={`/image/result/${img}`} className="object-cover" alt="디지몬" />
                        </div>
                        <div className="mt-6 mb-6">
                            <p className="text-lg text-gray-600">
                                당신과 어울리는 디지몬은
                            </p>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                {name}
                            </h1>
                        </div>
                    </div>

                    {/* 한줄 요약 */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                        <p className="text-md text-gray-700 text-center font-normal">
                            {description}
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

