import Spinner from "@/components/etc/Spinner"
import { Suspense, } from "react"
import ResultContent from "./ResultContent"


export default function Result() {
    return (
        <Suspense fallback={<Spinner text="결과를 분석중입니다." />}>
            <ResultContent />
        </Suspense>
    )
}