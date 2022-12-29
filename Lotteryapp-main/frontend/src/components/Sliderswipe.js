import "./Sliderswipe.css";

import { Carousel } from "react-carousel-minimal";
import lottery_icons from "../images/lottery_img1.jpg";
import lottery1_icons from "../images/lottery2.jpg";
import lottery2_icons from "../images/lottery3.jpg";
import lottery3_icons from "../images/lottery4.jpg";

export default function Sliderswipe() {
  const data = [
    {
      image: lottery_icons,
    },
    {
      image: lottery1_icons,
    },
    {
      image: lottery2_icons,
    },
    {
      image: lottery3_icons,
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <div className="slider_outer">
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <Carousel
            data={data}
            time={2000}
            width="200%"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
