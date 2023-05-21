import Link from "next/link";
import React from "react";
import ParallaxComp from "../components/ParallaxComp";

const Index = () => {
  const elementsList = [
    [
      { imageUrl: "/images/image-1.jpg", velocity: 0.9, size: 200 },
      { imageUrl: "/images/image-2.jpg", velocity: 2.5, size: 400 },
      { imageUrl: "/images/image-3.jpg", velocity: 3.5, size: 200 },
      { imageUrl: "/images/image-4.jpg", velocity: 4.5, size: 200 },
      { imageUrl: "/images/image-5.jpg", velocity: 2.5, size: 150 },
      { imageUrl: "/images/image-6.jpg", velocity: 2.8, size: 400 },
      { imageUrl: "/images/image-7.jpg", velocity: 0.5, size: 450 },
    ],
    [
      { imageUrl: "/images/image-8.jpg", velocity: 0.9, size: 200 },
      { imageUrl: "/images/image-9.jpg", velocity: 2.5, size: 400 },
      { imageUrl: "/images/image-10.jpg", velocity: 3.5, size: 200 },
      { imageUrl: "/images/image-11.jpg", velocity: 4.5, size: 200 },
      { imageUrl: "/images/image-12.jpg", velocity: 2.5, size: 150 },
      { imageUrl: "/images/image-13.jpg", velocity: 2.8, size: 400 },
      { imageUrl: "/images/image-14.jpg", velocity: 0.5, size: 450 },
    ],
    [
      { imageUrl: "/images/image-15.jpg", velocity: 0.9, size: 200 },
      { imageUrl: "/images/image-16.jpg", velocity: 2.5, size: 400 },
      { imageUrl: "/images/image-17.jpg", velocity: 3.5, size: 200 },
      { imageUrl: "/images/image-18.jpg", velocity: 4.5, size: 200 },
      { imageUrl: "/images/image-19.jpg", velocity: 2.5, size: 150 },
      { imageUrl: "/images/image-20.jpg", velocity: 2.8, size: 400 },
      { imageUrl: "/images/image-21.jpg", velocity: 0.5, size: 450 },
    ],
  ];

  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold  text-center ">
        Scroll Parallax Effect
      </h1>
      <div className="flex justify-center">
        <Link
          className="mt-20 text-2xl font-bold border border-gray-500 rounded-md px-4 py-2 text-gray-500 bg-gray-200 hover:bg-red-500 hover:text-white"
          href="/fetched"
        >
          Image Fetched Page
        </Link>
      </div>
      {elementsList.map((elements, index) => (
        <div key={index}>
          <div style={{ height: "150px" }}></div>{" "}
          <ParallaxComp elements={elements} />
        </div>
      ))}
    </div>
  );
};

export default Index;
