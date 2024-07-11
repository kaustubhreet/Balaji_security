import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ start, end, duration }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        let startTime = null;
        let animationFrameId = null;

        const startAnimation = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const increment = Math.ceil((end - start) * (progress / duration));
            if (progress < duration && count + increment <= end) {
                setCount((prevCount) => prevCount + increment);
                animationFrameId = requestAnimationFrame(startAnimation);
            } else {
                setCount(end);
            }
        };

        animationFrameId = requestAnimationFrame(startAnimation);

        return () => cancelAnimationFrame(animationFrameId);
    }, [start, end, duration]);

    return <span>{count}</span>;
};

const CounterAnimation = ({ start, end, duration, label }) => {
    return (
        <>
            <span>
                <AnimatedCounter start={start} end={end} duration={duration} />
            </span>
            <p >{label}</p>
        </>
    );
};

export default CounterAnimation;
