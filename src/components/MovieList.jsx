import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const chip = {
  float: "right",
  padding: "5px 10px",
  borderRadius: "25px",
  backgroundColor: "grey",
  marginRight: "5px",
};

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      <div>
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={5000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
          transitionDuration={2000}
        >
          {props.movies.map((movie, index) => (
            <div>
              <div
                className="card bg-dark mx-auto"
                style={{ height: "38rem", width: "20rem" }}
              >
                <img
                  className="card-img-top"
                  src={movie.Poster}
                  alt="Card cap"
                ></img>
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <div className="">
                    <div
                      style={{ cursor: "pointer", float: "left" }}
                      onClick={() => props.handleFavouritesClick(movie)}
                    >
                      <FavouriteComponent />
                    </div>
                    <div style={chip}>{movie.Year}</div>
                    <div style={chip}>{movie.Type}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default MovieList;
