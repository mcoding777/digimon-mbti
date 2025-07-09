"use client"

import Image from "next/image";

export default function Slider({ digimons }: { digimons: string[] }) {
  const extendedImages = [...digimons, ...digimons]; // 반복용 배열

  return (
    <>
      {/* 무한 스크롤 디지몬 슬라이더 */}
      <div className="mb-8">
        <div className="relative overflow-hidden py-4">
          {/* 무한 스크롤 컨테이너 */}
          <div className="flex w-max animate-scroll">
            {extendedImages.map((digimon, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-20 h-20 mx-3 flex items-center justify-center border-2 border-gray-200 transform hover:scale-110 transition-all duration-200 cursor-pointer hover:z-10 relative`}
              >
                <Image
                  key={index}
                  src={`/image/result/${digimon}`}
                  alt='디지몬'
                  className="w-full h-full object-cover"
                  loading="eager" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
    </>
  )
}