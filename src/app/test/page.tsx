"use client"

import ChevronLeft from "@/components/test/ChevronLeft";
import ChevronRight from "@/components/test/ChevronRight";
import QA from "@/components/test/QA";
import { useTestStore } from "@/hooks/useTestStore";
import { Question } from "@/types/test";
import { useEffect, useMemo, useState } from "react";

export default function Test() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQa, setCurrentQa] = useState(0);
    const currentValue = useTestStore((state) => state.answers.get(currentQa + 1) ?? null)

    const setAnswer = useTestStore((state) => state.setAnswer)

    const progress = ((currentQa + 1) / questions.length) * 100;

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
            <main className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-8">

                {/* 프로그레스 바 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                            {currentQa + 1} / {questions.length}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* 질답 */}
                {questions.length && <QA currentQ={questions[currentQa]} value={currentValue} setValue={setAnswer} />}

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
            </main>

            {/* 푸터 */}
            <footer className="text-center mt-5 text-xs text-gray-400">
                copyright 2025. all rights reserved.
            </footer>
        </div>
    )
}