"use client"

import ChevronLeft from "@/components/test/ChevronLeft";
import ChevronRight from "@/components/test/ChevronRight";
import ProgressBar from "@/components/test/ProgressBar";
import QA from "@/components/test/QA";
import Spinner from "@/components/etc/Spinner";
import { useTestStore } from "@/hooks/useTestStore";
import { Question } from "@/types/test";
import { useEffect, useState } from "react";

export default function Test() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQa, setCurrentQa] = useState(0);
    const currentValue = useTestStore((state) => state.answers.get(currentQa + 1) ?? null)
    const answersLen = useTestStore((state) => state.answers.size)

    const setAnswer = useTestStore((state) => state.setAnswer)

    const handleNext = () => {
        if (currentQa < questions.length - 1) {
            setCurrentQa(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQa > 0) {
            setCurrentQa(prev => prev - 1);
        }
    };

    useEffect(() => {
        fetch("/data/question.json")
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    if (!questions.length) {
        return <Spinner />
    }

    return (
        <>
            {/* 진행률 */}
            <ProgressBar total={questions.length} count={answersLen} />

            {/* 질답 */}
            <QA idx={currentQa} currentQ={questions[currentQa]} value={currentValue} setValue={setAnswer} />

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between items-center">
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
                    disabled={!currentValue || currentQa === questions.length - 1}
                    className={`
flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
${!currentValue || currentQa === questions.length - 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                        }
`}
                >
                    {currentQa === questions.length - 1 ? '결과보기' : '다음'}
                    {currentQa !== questions.length - 1 && (
                        <ChevronRight className="w-4 h-4 ml-1" />
                    )}
                </button>
            </div>
        </>
    )
}