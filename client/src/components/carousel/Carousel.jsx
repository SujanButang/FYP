import { useState } from "react";
import "./carousel.scss";

// this array holds the data for the carousel
const photos = [
  {
    id: "p1",
    url: "images/carousal/carousal1.png",
  },
  {
    id: "p2",
    url: "images/carousal/carousal2.png",
  },
  {
    id: "p3",
    url: "images/carousal/carousal3.png",
  },
  {
    id: "p4",
    url: "images/carousal/carousal4.png",
  },
  {
    id: "p5",
    url: "images/carousal/carousal5.png",
  },
];

function Carousel() {
  // show the photo with this index
  const [currentIndex, setCurrentIndex] = useState(0);
  makeTimer();

  function makeTimer() {
    setInterval(() => {
      setCurrentIndex((currentIndex + 1) % photos.length);
    }, 3000);
  }

  return (
    <>
      {/* Render the carousel */}
      <div className="slider-container">
        {photos.map((photo) => (
          <div
            key={photo.id}
            // if the photo is the current photo, show it
            className={
              photos[currentIndex].id === photo.id ? "fade" : "slide fade"
            }
          >
            <img src={photo.url} alt={photo.title} className="photo" />
            <div className="caption">{photo.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Carousel;
