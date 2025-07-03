"use client"

import { useTestStore } from "@/hooks/useTestStore";
import { Question } from "@/types/test";
import { useEffect, useMemo, useState } from "react"

interface QA {
    currentQ: Question
    value: string | null;
    setValue: (id: number, value: string) => void
}

export default function QA({ currentQ, value, setValue }: QA) {
    return (
        <div>
            {/* 상황 이미지 */}
            <div className="mb-6">
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                    {/* 이미지가 있을 경우 */}
                    {currentQ.img ? (
                        <img
                            src={`/image/question/${currentQ.img}`}
                            alt="상황 이미지"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        /* 플레이스홀더 */
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-gray-500 text-xl">🎯</span>
                            </div>
                            <p className="text-sm text-gray-500">상황 이미지</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-6 leading-relaxed">
                    {currentQ.question}
                </h2>

                {/* 선택지 */}
                <div className="space-y-4">
                    {currentQ.options.map((option) => (
                        <label
                            key={option.value}
                            className={`
      block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
      ${value === option.value
                                    ? 'border-indigo-400 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }
    `}
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name={`question-${currentQ.id}`}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={() => setValue(currentQ.id, option.value)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <span className="ml-3 text-gray-700 text-sm leading-relaxed">
                                    {option.text}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}