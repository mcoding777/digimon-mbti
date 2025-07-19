interface SpinnerProps {
    text: string
}

export default function Spinner({ text = '' }: SpinnerProps) {
    return (
        <div className="w-full min-h-90 mt-8 mb-8 flex flex-col justify-center items-center">
            <div className="relative mx-auto w-16 h-16 mb-6">
                {/* 외부 원 */}
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                {/* 회전하는 원 */}
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                {/* 중앙 점 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* 로딩 메시지 */}
            <h2 className="text-xl text-center font-semibold text-gray-700 mb-2">
                {text}
            </h2>
        </div>
    )
}