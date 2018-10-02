import PropTypes from "prop-types";
import React, { SFC } from "react";

interface IProps {
  submitFn: any;
  className?: string;
}

const Form: SFC<IProps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    onSubmit={event => {
      event.preventDefault();
      submitFn();
    }}
  >
    {children}
  </form>
);

Form.propTypes = {
  className: PropTypes.string.isRequired,
  submitFn: PropTypes.func.isRequired
};

export default Form;
