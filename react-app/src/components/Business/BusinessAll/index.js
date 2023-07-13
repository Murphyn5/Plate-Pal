import { useSelector } from "react-redux";
import BusinessDetail from "../BusinessDetails";



const BusinessAll = () => {
  const businesses = useSelector((state) => state.businesses.businesses);

  return (
    <div>
        {businesses}
    </div>
  );
};

export default BusinessAll;
