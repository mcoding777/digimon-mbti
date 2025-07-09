"use client"

import ChevronLeft from "@/components/test/ChevronLeft";
import ChevronRight from "@/components/test/ChevronRight";
import ProgressBar from "@/components/test/ProgressBar";
import QA from "@/components/test/QA";
import Spinner from "@/components/etc/Spinner";
import { useTestStore } from "@/hooks/useTestStore";
import { Question } from "@/utils/types/test";
import { useEffect, useState } from "react";
import NaviButtons from "@/components/test/NaviButtons";

export default function Test() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQa, setCurrentQa] = useState(0);
    const currentValue = useTestStore((state) => state.answers.get(currentQa + 1) ?? null)
    const answersLen = useTestStore((state) => state.answers.size)

    const setAnswer = useTestStore((state) => state.setAnswer)

    useEffect(() => {
        fetch("/data/question.json")
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    if (!questions.length) {
        return <Spinner />
    }

    return (
        <>
            {/* 진행률 */}
            <ProgressBar total={questions.length} count={answersLen} />

            {/* 질답 */}
            <QA idx={currentQa} currentQ={questions[currentQa]} value={currentValue} setValue={setAnswer} />

            {/* 네비게이션 버튼 */}
            <NaviButtons currentQa={currentQa} setCurrentQa={setCurrentQa} max={questions.length - 1} min={0} />
        </>
    )
}