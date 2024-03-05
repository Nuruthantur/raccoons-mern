import React from "react";
import PropTypes from "prop-types";

type Props = {
  label: string;
  symbol: string;
  handleClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const Emoji = (props: Props) => (
  <span
    style={{ cursor: "pointer" }}
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
    onClick={props.handleClick}
  >
    {props.symbol}
  </span>
);
export default Emoji;
