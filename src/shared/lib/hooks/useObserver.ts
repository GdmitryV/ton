import React, {useEffect, useState} from "react";

export const useObserver = (ref: React.RefObject<Element>, options: IntersectionObserverInit) => {
    const [observerEntry, setObserverEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(()=> {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry])=> {
            if (entry.isIntersecting) {
                setObserverEntry(entry);
                observer.unobserve(entry.target);
            }
        }, options);

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return observerEntry;
}