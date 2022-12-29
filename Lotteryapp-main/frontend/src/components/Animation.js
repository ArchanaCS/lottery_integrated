import './Animation.css';

import React from "react";
import { Carousel } from "react-bootstrap";
// import Player from 'video-react';

// import Vid1 from "./videos/vid1.mp4";
// import Vid2 from "./videos/vid2.mp4";
// import Vid3 from "./videos/vid3.mp4";
import Vid1 from "../video/video1.mp4";
import Vid2 from "../video/video2.mp4";
import Vid3 from "../video/video1.mp4";
// import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";

export default function Slider5() {

  const videoProperties = [

    {
      id: 1,
      title: "Video 1",
      loc: Vid1,
      credit: "Sample1",
    },
    {
      id: 2,
      title: "Video 2",
      loc: Vid2,
      credit: "Sample2",
    },
    {
      id: 3,
      title: "Video 3",
      loc: Vid3,
      credit: "Sample3",
    },
    {
      id: 4,
      title: "Video 4",
      loc:Vid2,
      credit: "Sample4",
    },
  ];
  useEffect(() => { }, [])


  return (
    <div className="Animation_outer">
      <Carousel>
        {videoProperties.map((itm, indx) => {
          return (
            <Carousel.Item key={itm.id}>
              {/* <ReactPlayer

                url={itm.src}
                pip={true}
                controls={true}
                playing={true}
                autoPlay={true}
              // config={{
              //   file: {
              //     attributes: {
              //       crossOrigin: "true",
              //     }
              //   }
              // }}

              /> */}
              <video width="100%" height="400" controls  autoplay="autoplay" loop="true" autoPlay muted>
                <source src={itm.loc} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
              <Carousel.Caption>
                <h3>{itm.title}</h3>
                <p>{itm.credit}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};


