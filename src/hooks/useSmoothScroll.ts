import { RefObject, useEffect, useRef } from 'react';

export function useSmoothScrollControl() {
    const container: RefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        let targetScrollTop = 0;
        let frameIdId: number | null = null;
        let startYRef = 0;

        const animateScroll = () => {
            if (!container.current) return

            const current = container.current.scrollTop;
            const delta = (targetScrollTop - current) * 0.2;

            // 최소 이동 임계값 설정
            if (Math.abs(delta) < 0.5) {
                frameIdId = null;
                return;
            }

            container.current.scrollTop = current + delta;
            frameIdId = requestAnimationFrame(animateScroll);
        };

        // 스크롤 가능 범위 제한
        const clampTarget = () => {
            if (!container.current) return

            const maxScroll = container.current.scrollHeight - container.current.clientHeight;
            targetScrollTop = Math.max(0, Math.min(targetScrollTop, maxScroll));
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScrollTop += e.deltaY;
            clampTarget();

            if (frameIdId === null) {
                frameIdId = requestAnimationFrame(animateScroll);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            startYRef = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const deltaY = startYRef - currentY;
            startYRef = currentY;

            targetScrollTop += deltaY;
            clampTarget();

            if (frameIdId === null) {
                frameIdId = requestAnimationFrame(animateScroll);
            }
        };

        // 초기 scrollTop을 반영
        targetScrollTop = container.current !== null ? container.current.scrollTop : 0;

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);

            if (frameIdId !== null) {
                cancelAnimationFrame(frameIdId);
            }
        };
    }, []);

    return { container }
}
