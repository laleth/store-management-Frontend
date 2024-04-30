import Carousel from 'react-bootstrap/Carousel';
import "../style/carousel.css"
// import bg1 from "../Assets/Wardobe.jpg"
// import bg2 from "../Assets/girl autmn.jpg"
// import bg3 from "../Assets/fashion1.jpg"


function Carouselreact() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item className='carousel-parent'>
        <img
          className="d-block w-100"
          src="https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/643188-gettyimages-153946385-ca1ccfaad9be44325afc434b305adc0d.jpg"
          alt="First slide"
          height={600}
        />
        <Carousel.Caption>
            <div className='Carousel-content'>
          <p>Don't just choose Colors , Choose to Blend with Nature.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-parent'>
        <img
          className="d-block w-100"
          src="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2018/12/vegetables.jpg"
          alt="Second slide"
          height={600}
        />
        <Carousel.Caption>
        <div className='Carousel-content'>
          <p>Choose Ingredient to Savor in Harvest.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-parent'>
        <img
          className="d-block w-100"
          src="https://www.verival.co.uk/blog/wp-content/uploads/2020/04/Obst-und-Gem%C3%BCse-1024x683.jpg"
          alt="Third slide"
          height={600}
        />
        <Carousel.Caption>
        <div className='Carousel-content'>
          <p>
          Match the Flavor to Sizzle on the Grill.
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouselreact;