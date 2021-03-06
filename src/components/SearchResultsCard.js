import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import Image from "react-graceful-image";
import "../styles/SearchResultsCard.css";

const SearchResultsCard = props => {
  //PCO and Consumer data objects are different and their images are in different object properties
  //hireTypeBasedUrl detects the current mode / hireType, then returns an appropriate link
  const stockImage =
    props.info.hasOwnProperty("stock_image") &&
    props.info.stock_image.image_url;

  //used this stock photo as the photos given in PCO mode are pretty ugly compared to Consumer!
  const genericImage =
    "https://direct.leaseplan.co.uk/Themes/LeasePlan/Content/Images/Car-placeholder.png";
  const hireTypeBasedUrl =
    props.hireType === "Consumer" ? stockImage : genericImage;

  return (
    <Card>
      <Card.Content className="card__top--flex">
        {props.info.brand_new && (
          <Card.Meta className="card__top__ribbon">Brand new!</Card.Meta>
        )}

        <Card.Content>
          <h2>£{props.info.reference_owner_price_pence / 100}</h2>{" "}
          <div>
            <small>A Month</small>
          </div>
        </Card.Content>
      </Card.Content>

      <Image
        src={hireTypeBasedUrl}
        alt={hireTypeBasedUrl}
        width="100%"
        height="100%"
        placeholderColor="rgb(245, 245, 245)"
      />
      <Card.Content className="card__bottom--flex">
        <div>
          <small>
            {props.info.year} {props.info.vehicle_make}
          </small>
          <h2>{props.info.vehicle_model}</h2>
        </div>
      </Card.Content>

      {props.hireType === "PCO" && (
        <Card.Content className="card__PCO-icon">
          <hr />
          Located in {props.info.postcode}
          <small>Available from {props.info.available_start_date}</small>
          <img src="transmission.svg" alt="transmission logo" />
          {props.info.transmission}
          <img src="fuel.svg" alt="fuel logo" />
          {props.info.fuel}
          <img src="jurisdiction.svg" alt="jurisdiction logo" />
          {props.info.city_jurisdiction}
        </Card.Content>
      )}
    </Card>
  );
};

SearchResultsCard.propTypes = {
  hireType: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    hireType: state.data.criteria.vehicle_type
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchResultsCard);
