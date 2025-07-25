import { useTestStore } from "@/hooks/useTestStore"
import { ROUTES } from "@/utils/data/routes"
import { useRouter } from "next/navigation"

export default function RestartButton() {
    const router = useRouter()
    const resetAnswers = useTestStore((state) => state.resetAnswers)

    const handleRestart = () => {
        resetAnswers()
        router.push(ROUTES.TEST)
    }

    return (
        <button onClick={handleRestart} className="cursor-pointer flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            다시 테스트
        </button>
    )
}