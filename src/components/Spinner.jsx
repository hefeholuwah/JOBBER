import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading = false }) => {
  if (!loading) return null; 

  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};


Spinner.propTypes = {
  loading: PropTypes.bool // loading is expected to be a boolean and is required
};

export default Spinner;
