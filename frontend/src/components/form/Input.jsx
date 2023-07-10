import PropTypes from "prop-types";
const Input = ({ type, className, placeholder, ...rest }) => {
  return (
    <div className="w-full max-w-sm">
      <input
        type={type}
        className={`p-2 w-full rounded-md outline-none focus:border-blue-400 ${className}`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  className: "",
  placeholder: "",
};

export default Input;
