"use client"

import ProgressBar from "@/app/test/components/ProgressBar";
import QA from "@/app/test/components/QA";
import Spinner from "@/components/etc/Spinner";
import { useTestStore } from "@/hooks/useTestStore";
import { Question } from "@/utils/types/test";
import { useEffect, useState } from "react";
import NaviButtons from "@/app/test/components/NaviButtons";
import TestComplete from "./components/TestComplete";

export default function Test() {
    const [complete, setComplete] = useState(false)

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQa, setCurrentQa] = useState(0);
    const currentValue = useTestStore((state) => state.answers.get(currentQa + 1) ?? null)
    const answersLen = useTestStore((state) => state.answers.size)

    const setAnswer = useTestStore((state) => state.setAnswer)

    const onComplete = () => {
        setComplete(true)
    }

    useEffect(() => {
        fetch("/data/question.json")
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    if (!questions.length) {
        return <Spinner text="문제를 준비중입니다." />
    }

    if (complete) {
        return <TestComplete />
    }

    return (
        <>
            {/* 진행률 */}
            <ProgressBar total={questions.length} count={answersLen} />

            {/* 질답 */}
            <QA idx={currentQa} currentQ={questions[currentQa]} value={currentValue} setValue={setAnswer} />

            {/* 네비게이션 버튼 */}
            <NaviButtons currentQa={currentQa} onComplete={onComplete} onSetQa={setCurrentQa} max={questions.length - 1} min={0} />
        </>
    )
}