// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllBusinessesThunk, getSingleBusinessThunk } from "../../../store/businesses";
// import { Link } from "react-router-dom";
// import "./slideshow.css";

// const Slideshow = () => {
//   const dispatch = useDispatch();
//   const businessesObject = useSelector((state) => state.businesses.businesses);
//   const allBusinesses = businessesObject ? Object.values(businessesObject) : [];
//   const [categoryImages, setCategoryImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchAllBusinesses = async () => {
//       await dispatch(getAllBusinessesThunk());
//     };
//     fetchAllBusinesses();
//   }, [dispatch]);


//   useEffect(() => {
//     const fetchCategoryImages = async () => {
//       const uniqueCategories = new Set();
//       const fetchedCategoryImages = [];

//       for (const business of allBusinesses) {
//         const category = business.category;
//         if (!uniqueCategories.has(category)) {
//           uniqueCategories.add(category);
//           const singleBusiness = await dispatch(getSingleBusinessThunk(business.id));
//           if (singleBusiness.images && singleBusiness.images.length > 0) {
//             fetchedCategoryImages.push({
//               url: singleBusiness.images[0].url,
//               category: category,
//               businessId: business.id,
//             });
//           }
//         }
//       }
//       setCategoryImages(fetchedCategoryImages);
//     };

//     if (allBusinesses.length > 0) {
//       fetchCategoryImages();
//     }
//   }, [dispatch, allBusinesses]);

//   const goToPreviousImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + categoryImages.length) % categoryImages.length);
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % categoryImages.length);
//   };

//   return (
//     <>
//       {categoryImages.length > 0 && (
//         <div className="slideshow">
//           <Link to={`/businesses/${categoryImages[currentImageIndex].businessId}`}>
//             <img src={categoryImages[currentImageIndex].url} alt={categoryImages[currentImageIndex].category} />
//           </Link>
//           <button onClick={goToPreviousImage}>Previous</button>
//           <button onClick={goToNextImage}>Next</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Slideshow;
