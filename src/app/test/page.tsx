"use client"

import QA from "@/components/qa";
import { useTestStore } from "@/hooks/useTestStore";
import { useState } from "react";

export default function Test() {
    const [currentId, setCurrentId] = useState(1)

    const answers = useTestStore((state) => state.answers)
    const setAnswer = useTestStore((state) => state.setAnswer)
    const getAnswer = useTestStore((state) => state.getAnswer)
    const getResult = useTestStore((state) => state.getResult)

    const handleSelect = (id: number, value: string) => {
        setAnswer(id, value)
    }

    const result = getResult()


    return (
        <div>
        <QA id={currentId} value={getAnswer}></QA>
    </div>
    )
}