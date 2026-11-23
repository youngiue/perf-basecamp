import { useEffect, useRef } from 'react';

import styles from './CustomCursor.module.css';

type CustomCursorProps = {
  text: string;
};

const CustomCursor = ({ text = '' }: CustomCursorProps) => {
  const [...cursorTextChars] = text;
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number | null = null;
    let pageX = 0;
    let pageY = 0;

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
      }
      frameId = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      pageX = event.pageX;
      pageY = event.pageY;

      if (frameId === null) {
        frameId = requestAnimationFrame(updateCursor);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      {cursorTextChars.map((char, index) => (
        <span key={index} className={styles.character}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default CustomCursor;
