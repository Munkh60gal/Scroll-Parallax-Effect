import Link from "next/link";
import React, { useEffect, useState } from "react";
import BalancedPositionComponent from "../components/ParallaxComp";
interface Element {
  imageUrl: string;
  velocity: number;
  size: number;
}

const Index = () => {
  const [elementsList, setElementsList] = useState<Element[][]>([]);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const response = await fetch(
        "https://api.unsplash.com/photos/random?count=10&client_id=fjOQTb-ilYRwnb-PdFfKd1Vk3wyoCrbKMvEWlkpMllY"
      );
      const data = await response.json();
      const elementsList: Element[][] = data.map((image: any) =>
        Array.from({ length: 3 }, () => ({
          imageUrl: image.urls.regular,
          velocity: Math.random() * 1,
          size: Math.floor(Math.random() * 200) + 200,
        }))
      );
      setElementsList(elementsList);
    };

    fetchRandomImages();
  }, []);

  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold  text-center ">
        Scroll Parallax Effect by Fetched Images
      </h1>
      <div className="flex justify-center">
        <Link
          className="mt-20 text-2xl font-bold border border-gray-500 rounded-md px-4 py-2 text-gray-500 bg-gray-200 hover:bg-red-500 hover:text-white"
          href="/"
        >
          Back
        </Link>
      </div>

      {elementsList.map((elements, index) => (
        <div key={index}>
          <div style={{ height: "150px" }}></div>
          <BalancedPositionComponent elements={elements} />
        </div>
      ))}
    </div>
  );
};

export default Index;
