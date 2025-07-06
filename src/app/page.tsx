import Slider from "@/components/home/Slider";
import StartButton from "@/components/home/StartButton";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";

const nanumPenScript = Nanum_Myeongjo({
  variable: "--font-nanum",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const digimons = [
    "agumon.webp", "gabumon.jpg", "piyomon.webp", "palmon.png", "patamon.jpg", "gomamon.jpg", "tentomon.jpg", "gatomon.webp", "vmon.jpeg", "wormmon.png", "armadillomon.jpg", "hawkmon.jpeg"
  ];

  return (
    <>
      {/* 메인 헤더 문구 */}
      <div className="mb-8">
        <h1 className={`${nanumPenScript.className} text-md md:text-lg font-bold text-gray-400 mb-3 leading-relaxed`}>
          그 시절 우린 모두<br />
          선택받은 아이들이었다
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 font-medium">
          나의 스타터 디지몬은?
        </p>
      </div>

      <Slider digimons={digimons} />

      {/* 시작 버튼 */}
      <StartButton />

      {/* 작은 설명 텍스트 */}
      <p className="text-sm text-gray-500 mt-6">
        20개의 질문으로 알아보는 나의 디지몬 파트너
      </p>
    </>
  );
}
