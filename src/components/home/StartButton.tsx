"use client"

import { useRouter } from "next/navigation"

export default function StartButton() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/test')
    }

    return (
        <button onClick={handleClick} className="hover:cursor-pointer w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            테스트 시작하기
        </button>
    )
}