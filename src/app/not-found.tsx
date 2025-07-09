"use client"

import { ROUTES } from "@/utils/data/routes"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    return (
        <div>
            <div className="mb-6">
                <svg className="w-16 h-16 text-red-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="7" x2="12" y2="12" />
                    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
                </svg>
                <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
                <h2 className="text-xl font-semibold text-gray-600 mb-3">페이지를 찾을 수 없습니다</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                    요청하신 페이지가 존재하지 않거나<br />
                    이동되었을 수 있습니다.
                </p>
            </div>

            <button onClick={() => router.push(ROUTES.HOME)} className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>홈으로 돌아가기</span>
            </button>
        </div>
    )
}