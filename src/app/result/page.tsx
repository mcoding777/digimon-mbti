"use client"

import Spinner from "@/components/etc/Spinner"
import { Suspense, } from "react"
import ResultContent from "./ResultContent"


export default function Result() {
    return (
        <Suspense fallback={<Spinner text="페이지 로딩중입니다." />}>
            <ResultContent />
        </Suspense>
    )
}