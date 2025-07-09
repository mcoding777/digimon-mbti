import HomeButton from "@/components/etc/HomeButton"

export default function NotFound() {


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

            <HomeButton />
        </div>
    )
}