interface ProgressBarProps {
    total: number
    count: number
}

export default function ProgressBar({ total, count }: ProgressBarProps) {
    const progress = ((count) / total) * 100;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                    {count} / {total}
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
    )
}