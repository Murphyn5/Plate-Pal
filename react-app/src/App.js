import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ActivityIndex from "./components/Activity/ActivityIndex";
import BusinessDetail from "./components/Business/BusinessDetails";
import ManageBusinessesIndex from "./components/Business/ManageBusinessesIndex";
import ManageReviewsIndex from "./components/Review/ManageReviewsIndex";
import ManageImagesIndex from "./components/Images/ManageImagesIndex";
import ReviewCreate from "./components/Review/ReviewCreate";
import BusinessCreate from "./components/Business/BusinessCreate";
import ReviewDelete from "./components/Review/ReviewDelete";
import BusinessDelete from "./components/Business/BusinessDelete";
import ImageDelete from "./components/Images/ImageDelete";
import ReviewEdit from "./components/Review/ReviewEdit";
import BusinessEdit from "./components/Business/BusinessEdit";
import BusinessAll from "./components/Business/BusinessAll";
import BusinessSearched from "./components/Business/BusinessSearched";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BusinessImagesIndex from "./components/Business/BusinessImagesIndex";
import ReviewImagesIndex from "./components/Review/ReviewImagesIndex";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/404";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="page-container">
      <Navigation isLoaded={isLoaded} />
      <div className="content-wrap">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <ActivityIndex />
            </Route>
            <Route exact path="/businesses/all">
              <BusinessAll />
            </Route>
            <Route exact path="/businesses/current">
              <ProtectedRoute>
                <ManageBusinessesIndex />
              </ProtectedRoute>
            </Route>
            <Route exact path="/businesses/search/:searchString">
              <BusinessSearched />
            </Route>
            <Route
              exact
              path="/businesses/search/:searchString/:zoom/:lat/:lng"
            >
              <BusinessSearched />
            </Route>
            <Route path="/businesses/new">
              <ProtectedRoute>
                <BusinessCreate />
              </ProtectedRoute>
            </Route>
            <Route exact path="/businesses/:businessId">
              <BusinessDetail />
            </Route>
            <Route exact path="/businesses/:businessId/delete">
              <ProtectedRoute>
                <BusinessDelete />
              </ProtectedRoute>
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/businesses/:businessId/reviews/new">
              <ProtectedRoute>
                <ReviewCreate />
              </ProtectedRoute>
            </Route>
            <Route exact path="/businesses/:businessId/images">
              <BusinessImagesIndex />
            </Route>
            <Route path="/businesses/:businessId/edit">
              <ProtectedRoute>
                <BusinessEdit />
              </ProtectedRoute>
            </Route>
            <Route exact path="/reviews/current">
              <ProtectedRoute>
                <ManageReviewsIndex />
              </ProtectedRoute>
            </Route>
            <Route path="/reviews/:reviewId/edit">
              <ProtectedRoute>
                <ReviewEdit />
              </ProtectedRoute>
            </Route>
            <Route path="/reviews/:reviewId/images">
              <ReviewImagesIndex />
            </Route>
            <Route path="/reviews/:reviewId/delete">
              <ProtectedRoute>
                <ReviewDelete />
              </ProtectedRoute>
            </Route>
            <Route path="/images/current">
              <ProtectedRoute>
                <ManageImagesIndex />
              </ProtectedRoute>
            </Route>
            <Route path="/images/:imageId/delete">
              <ProtectedRoute>
                <ImageDelete />
              </ProtectedRoute>
            </Route>
            <Route path='*' >
              <NotFound />
            </Route>
          </Switch>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
