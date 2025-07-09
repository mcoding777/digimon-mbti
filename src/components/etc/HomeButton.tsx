"use client"

import { ROUTES } from "@/utils/data/routes"
import { useRouter } from "next/navigation"

export default function HomeButton() {
    const router = useRouter()

    return (
        <button onClick={() => router.push(ROUTES.HOME)} className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>홈으로 돌아가기</span>
        </button>
    )
}