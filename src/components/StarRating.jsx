import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as hollowStar } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ ratingOutOf10 }) => {
  // CONVERTS NUMERICAL RATING FROM API INTO STARS
  const starCount = Math.round((ratingOutOf10 / 2) * 2) / 2;
  const fullStars = Math.floor(starCount);
  const halfStar = starCount % 1 !== 0;

  return (
    <>
      {Array.from({ length: fullStars }, (_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} />
      ))}
      {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}
      {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }, (_, i) => (
        <FontAwesomeIcon key={i + 5} icon={hollowStar} />
      ))}
    </>
  );
};

export default StarRating;
