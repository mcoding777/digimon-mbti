import { MatchData, DigimonData } from "@/utils/types/result";
import { useState, useEffect } from "react";

export default function useFetchData() {
    const [matchData, setMatchData] = useState<Record<string, MatchData>>()
    const [digimonData, setDigimon] = useState<DigimonData[]>()

    useEffect(() => {
        fetch("/data/mbti.json")
            .then((res) => res.json())
            .then((data) => setMatchData(data));

        fetch("/data/digimon.json")
            .then((res) => res.json())
            .then((data) => setDigimon(data));
    }, [])

    return {
        matchData,
        digimonData
    }
}