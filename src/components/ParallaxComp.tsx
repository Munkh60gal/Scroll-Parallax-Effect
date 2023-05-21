import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface Element {
  imageUrl: string;
  velocity: number;
  size: number;
}

interface ParallaxCompProps {
  elements: Element[];
}

interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
}

const ParallaxComp: React.FC<ParallaxCompProps> = ({ elements }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const positionsRef = useRef<Position[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && typeof window !== "undefined") {
        const scrollY = window.scrollY;

        elements.forEach((element, index) => {
          const img = containerRef.current?.querySelector<HTMLDivElement>(
            `#element-${index}`
          );

          if (img) {
            const velocity = element.velocity;
            const translateY = scrollY * velocity;
            const rotation = -scrollY * velocity;
            img.style.transform = `translateY(-${translateY}px) rotate(${rotation}deg)`;
          }
        });
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (typeof window !== "undefined") {
              window.addEventListener("scroll", handleScroll);
            }
          } else {
            if (typeof window !== "undefined") {
              window.removeEventListener("scroll", handleScroll);
            }
          }
        });
      },
      { rootMargin: "0px 0px 0px 0px" }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observerRef.current?.unobserve(containerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elements]);

  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const updatedPositions: Position[] = [];

      elements.forEach((element, index) => {
        const size = element.size;
        const img = containerRef.current?.querySelector<HTMLDivElement>(
          `#element-${index}`
        );

        if (img) {
          const position = getRandomPosition(
            size,
            containerRect,
            updatedPositions
          );
          updatedPositions.push(position);
          img.style.left = `${position.left}px`;
          img.style.top = `${position.top}px`;
        }
      });

      positionsRef.current = updatedPositions;
    }
  }, [elements]);

  const getRandomPosition = (
    size: number,
    containerRect: DOMRect,
    positions: Position[]
  ): Position => {
    const maxAttempts = 10;
    let attempt = 0;
    let position: Position;

    do {
      const left = getRandomNumber(
        containerRect.left,
        containerRect.right - size
      );
      const top = getRandomNumber(
        containerRect.top,
        containerRect.bottom - size
      );
      position = { left, top, width: size, height: size };
      attempt++;
    } while (isOverlapping(position, positions) && attempt < maxAttempts);

    return position;
  };

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const isOverlapping = (
    position: Position,
    positions: Position[]
  ): boolean => {
    for (const existingPosition of positions) {
      if (
        position.left < existingPosition.left + existingPosition.width &&
        position.left + position.width > existingPosition.left &&
        position.top < existingPosition.top + existingPosition.height &&
        position.top + position.height > existingPosition.top
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="relative w-full h-screen sm:h-auto" ref={containerRef}>
      {elements.map((element, index) => (
        <div
          key={index}
          id={`element-${index}`}
          className="absolute transition-transform duration-200 ease-out"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            transform:
              typeof window !== "undefined"
                ? `translateY(-${window.scrollY * element.velocity}px) rotate(${
                    -window.scrollY * element.velocity
                  }deg)`
                : "",
            left: `calc(50% - ${element.size / 2}px)`,
          }}
        >
          <div className="w-full h-full">
            <Image
              src={element.imageUrl}
              alt={`Element ${index + 1}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParallaxComp;
