import { useState, useEffect } from 'react';

export const useAnimatedCounter = (endValue: number, duration: number = 1000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const startValue = count;
        const change = endValue - startValue;

        if (change === 0) return;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(startValue + change * easeProgress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        requestAnimationFrame(animate);
    }, [endValue, duration]);

    return count;
};
