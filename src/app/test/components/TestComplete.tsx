import Spinner from "@/components/etc/Spinner";
import { useTestStore } from "@/hooks/useTestStore";
import { ROUTES } from "@/utils/data/routes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function TestComplete() {
    const router = useRouter()

    const answers = useTestStore((state) => state.answers)
    const mbti = useMemo(() => {
        if (answers.size > 0) {
            const count: Record<string, number> = {};

            answers.forEach((value) => {
                count[value] = (count?.[value] || 0) + 1;
            })

            return `${findMbti(count, 'I', 'E')}${findMbti(count, 'N', 'S')}${findMbti(count, 'T', 'F')}${findMbti(count, 'J', 'P')}`
        }

        return null
    }, [answers])

    useEffect(() => {
        if (mbti) {
            router.push(ROUTES.RESULT.DETAIL(mbti))
        }
    }, [mbti])


    return <Spinner text="결과를 분석중입니다." />
}

function findMbti(obj: Record<string, number>, target1: string, target2: string) {
    const num1 = obj?.[target1] || 0, num2 = obj?.[target2] || 0;
    return num1 > num2 ? target1 : target2;

}