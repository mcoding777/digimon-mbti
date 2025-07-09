"use client"

import { Dispatch, SetStateAction } from "react";
import ChevronLeft from "./ChevronLeft";
import { useTestStore } from "@/hooks/useTestStore";
import ChevronRight from "./ChevronRight";
import { useRouter } from "next/navigation";

interface NaviButtonsProps {
    currentQa: number
    max: number
    min: number
    onSetQa: Dispatch<SetStateAction<number>>
    onComplete: () => void
}

export default function NaviButtons({ currentQa, max, min, onComplete, onSetQa, }: NaviButtonsProps) {
    const currentValue = useTestStore((state) => state.answers.get(currentQa + 1) ?? null)
    const router = useRouter()

    const handleNext = () => {
        if (currentQa === max) {
            onComplete()
        } else {
            onSetQa(prev => {
                if (prev < max) {
                    return prev + 1
                }
                return prev
            });
        }
    };

    const handlePrev = () => {
        onSetQa(prev => {
            if (currentQa > min) {
                return prev - 1
            }
            return prev
        });
    };

    return <div className="flex justify-between items-center">
        <button
            onClick={handlePrev}
            disabled={currentQa === 0}
            className={`
flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
${currentQa === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }
`}
        >
            <ChevronLeft className="w-4 h-4 mr-1" />
            이전
        </button>

        <button
            onClick={handleNext}
            disabled={!currentValue}
            className={`
flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
${!currentValue
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                }
`}
        >
            {currentQa === max ? '결과보기' : '다음'}
            {currentQa !== max && (
                <ChevronRight className="w-4 h-4 ml-1" />
            )}
        </button>
    </div>
}