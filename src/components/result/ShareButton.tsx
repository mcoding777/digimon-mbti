export default function ShareButton() {
    const handleShareOrCopy = async () => {
        if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
            // 모바일: 공유 패널
            try {
                await navigator.share({
                    title: '나의 스타터 디지몬은 이 친구야',
                    text: '너의 디지몬은 누구니?',
                    url: window.location.href,
                });
            } catch (err) {
                console.error('공유 실패:', err);
            }
        } else {
            // 데스크탑: 클립보드 복사
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
            } catch (err) {
                alert('복사에 실패했습니다 😢 다시 시도해주세요.');
            }
        }
    };

    return (
        <button onClick={handleShareOrCopy} className="cursor-pointer flex-1 bg-blue-500 text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
            결과 공유하기
        </button>
    )
}