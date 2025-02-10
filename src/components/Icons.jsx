import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export const XMark = ({ className }) => (
  <FontAwesomeIcon icon={faXmark} size="lg" className={className} />
);

export const Search = ({ className }) => (
  <FontAwesomeIcon icon={faMagnifyingGlass} className={className} />
);

export const Bars = ({ className }) => (
  <FontAwesomeIcon icon={faBars} className={className} />
);

export const Compass = ({ className }) => (
  <FontAwesomeIcon icon={faCompass} className={className} />
);
