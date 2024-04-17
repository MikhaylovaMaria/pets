import React from "react";
import { Carousel, Flex, Image } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
};
type Props = {
  images: string[];
};

const CustomCarousel = ({ images }: Props) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Flex justify="center">
      <Carousel afterChange={onChange}>
        {images &&
          images.map((el: string) => (
            <div>
              <Image src={el} style={contentStyle} />
            </div>
          ))}
      </Carousel>
    </Flex>
  );
};

export default CustomCarousel;
