import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Pagination, Segment } from "semantic-ui-react";
import { editCriteria } from "../actions";
import SearchResultsCard from "./SearchResultsCard";
import "../styles/SearchResults.css";

class SearchResults extends Component {
  state = { activePage: 1 };

  //set state then edit criteria object with the activePage value to request
  //a new set of data linked to that activePage value
  handlePaginationChange = (e, { activePage }) =>
    this.setState({ activePage }, () =>
      this.props.editCriteria("page", activePage)
    );

  calculateTotalPages = () => {
    const carsPerPage =
      this.props.metadata.total_count / this.props.metadata.per_page;
    const totalPagesToShow = Math.ceil(carsPerPage);
    return totalPagesToShow;
  };

  componentDidUpdate(prevProps, prevState) {
    //smoothly navigate to the top of the window each time user clicks on next page
    const options = { top: 0, left: 0, behavior: "smooth" };
    window.scrollTo(options);
    //if user changed criteria object, then default to activePage: 1 as we do not want to send current
    //activePage to backend if a new dropdown value is selected as we may not know how many cars there are
    //that can now fit the new criteri. eg: if activePage is 10 but number of cars fetched is 2,
    //app will show an empty results page
    if (
      prevProps !== this.props &&
      Object.keys(this.props.criteria).length &&
      this.props.cars.length === 0
    ) {
      this.setState({ activePage: 1 }, () =>
        this.props.editCriteria("page", 1)
      );
    }
  }

  render() {
    const { activePage } = this.state;

    return (
      <section className="search-results">
        <Card.Group itemsPerRow={3}>
          {this.props.cars.map(car => (
            <SearchResultsCard info={car} key={car.id} />
          ))}
        </Card.Group>
        <br />
        {this.props.cars.length ? (
          <div className="search-results__pagination--flex">
            <Pagination
              activePage={activePage}
              boundaryRange={0}
              onPageChange={(e, data) => this.handlePaginationChange(e, data)}
              totalPages={this.calculateTotalPages()}
            />
          </div>
        ) : (
          <span />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.data.response.data,
    criteria: state.data.criteria,
    metadata: state.data.response.metadata,
    isVehiclesLoading: state.data.isVehiclesLoading
  };
};

export default connect(
  mapStateToProps,
  { editCriteria }
)(SearchResults);
