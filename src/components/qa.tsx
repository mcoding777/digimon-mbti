import { useMemo } from "react"

export default function QA({ id, value }: {id: number, value: (state: number) => string | null}) {
    const currentValue = useMemo(() => value(id), [id])

    return <div>
        <h1>{id}</h1>
        <h2>질문</h2>
        <h3>{currentValue}</h3>
        </div>
}