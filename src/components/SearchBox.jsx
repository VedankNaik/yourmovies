// import 'bootstrap/dist/js/bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";

const SearchBox = (props) => {
  return (
    <div className="d-flex justify-content-end">
      <div class="form-outline">
        <input
          type="number"
          id="year"
          min="1990"
          max="2022"
          class="form-control"
          placeholder="Year"
          onChange={(event) => props.setYearValue(event.target.value)}
        />
      </div>
      <select
        class="form-select w-auto mx-3"
        aria-label="Select search type"
        onChange={(event) => props.setTypeValue(event.target.value)}
      >
        <option value="">Type</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <div className="col col-sm-2">
        <input
          className="form-control"
          value={props.value}
          onChange={(event) => props.setSearchValue(event.target.value)}
          placeholder="Type to search..."
        ></input>
      </div>
      <button
        onClick={() => props.getMovieRequest()}
        type="button"
        class="btn btn-secondary mx-3"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
