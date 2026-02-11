import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, width = 'fit-content', delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Only animate once
            }
        }, {
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before bottom
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const style = {
        width,
        transition: `opacity 0.6s cubic-bezier(0.5, 0, 0, 1) ${delay}s, transform 0.6s cubic-bezier(0.5, 0, 0, 1) ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    };

    return (
        <div ref={ref} style={style}>
            {children}
        </div>
    );
};

export default Reveal;
