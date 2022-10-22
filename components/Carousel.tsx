import React from 'react';
import { useRecoilState } from 'recoil';
import { heroPhotos, modalPark } from '../recoil/atom';

function Carousel() {
  const images = useRecoilState(heroPhotos);
  console.log(images[0])
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide relative"
        data-bs-ride="carousel">
        <div className="carousel-inner -z relative w-full overflow-hidden">
          {images.map((item: any, index: number) => {
                  return (
                    
                      <div key={item.id} className="flex  justify-between  ">
                       

                        <img
                          key={item}
                          className="w-full h-96 md:h-auto object-cover 
                      md:w-60 rounded-lg"
                          src={item}></img>
                      </div>
                    
                  );
                })}
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carousel;
