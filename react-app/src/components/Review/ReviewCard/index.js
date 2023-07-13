import { Link } from "react-router-dom";
import OpenModalImage from "../../OpenModalImage";
import ImageModal from "../../Images/ImageModal";
import { useDispatch } from "react-redux";
import { getImagesAction } from "../../../store/images";
import StarCalculator from "../../Business/BusinessSearched/StarCalculator"
import * as camera from "./camera.png"
import './ReviewCard.css'
import * as trash from "../../Images/ImageModal/trash.png"
import * as imageIcon from "./image.png"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenImageModalButton from "../../OpenImageModalButton";
import CreateImageFormModal from "../../CreateImageFormModal";

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const handleImageClick = async (e) => {
    const images = {}
    review.images.forEach(review => {
      images[review.id] = review;
    });
    await dispatch(getImagesAction({ "images": images }))
  }



  function formattedDate(d) {
    d = new Date(d)
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    return `${month}/${day}/${year}`;
  }

  const date = formattedDate(review.created_at)
  if (!review) {
    return null
  }

  const handleDeleteRedirect = () => {
    history.push(`/reviews/${review.id}/delete`)
  }

  const handleEditRedirect = () => {
    history.push(`/reviews/${review.id}/edit`)
  }

  const handleAddImageRedirect = () => {
    history.push(`/reviews/${review.id}/images/new`)
  }


  const deleteRender = () => {
    if (user) {
      if (user.id === review.owner_id) {
        return (
          <div className="review-card-delete-button-container">
            <i className="fa-solid fa-trash"></i>
            &nbsp;<div><span className={"review-card-delete-button"} onClick={handleDeleteRedirect}> Delete Review</span></div>
          </div>
        )
      }
    }
  }

  const editRender = () => {
    if (user) {
      if (user.id === review.owner_id) {
        return (
          <div className="review-card-edit-button-container">
            <i className="fa-solid fa-pen-to-square"></i>
            &nbsp; <div><span className={"review-card-edit-button"} onClick={handleEditRedirect}> Edit Review</span></div>
          </div>
        )
      }
    }
  }



  const addPhotoRender = () => {
    if (user) {
      if (user.id === review.owner_id) {
        return (
          <OpenImageModalButton
            buttonText={"image"}
            modalComponent={<CreateImageFormModal review_id={review.id} />}
          ></OpenImageModalButton>
        )
      }
    }
  }


  const imagesLinkRender = () => {
    if (review.images_length > 1) {
      return (
        <div className="review-card-images-link-container">
          <img src={camera.default}></img>
          <div className="review-card-images-link-text">{review.images_length} images</div>
        </div>
      )
    }

    else if (review.images_length === 1) {
      return (
        <Link to={`/reviews/${review.id}/images`}>
          <div className="review-card-images-link-container">
            <img src={camera.default}></img>
            <div className="review-card-images-link-text">{review.images_length} image</div>
          </div>
        </Link>
      )
    }
  }
  let gridColumns
  let imageHeight
  if (review.images[0]) {
    gridColumns = "1fr 1fr"
    imageHeight = "400px"
  }
  if (review.images[1]) {
    gridColumns = "1fr 1fr"
    imageHeight = "400px"
  }
  if (review.images[2]) {
    gridColumns = "1fr 1fr 1fr 1fr"
    imageHeight = "200px"
  }

  if (review.images[3]) {
    gridColumns = "1fr 1fr 1fr 1fr"
    imageHeight = "200px"
  }

  const imageOneRender = () => {
    if (review.images[0]) {
      return (
        <Link to={`/reviews/${review.id}/images`}>
          <div style={{ "height": `${imageHeight}`, "backgroundImage": `url("${review.images[0].url}")` }}></div>
        </Link>
      )
    }
    return (
      <div></div>
    )
  }


  const imageTwoRender = () => {
    if (review.images[1]) {
      return (
        <Link to={`/reviews/${review.id}/images`}>
          <div style={{ "height": `${imageHeight}`, "background-image": `url("${review.images[1].url}")` }}></div>
        </Link>
      )
    }
    return (
      <div></div>
    )
  }

  const imageThreeRender = () => {
    if (review.images[2]) {
      return (
        <Link to={`/reviews/${review.id}/images`}>
          <div style={{ "height": `${imageHeight}`, "background-image": `url("${review.images[2].url}")` }}></div>
        </Link>
      )
    }
    return (
      <div></div>
    )
  }

  const imageFourRender = () => {
    if (review.images[3]) {
      return (
        <Link to={`/reviews/${review.id}/images`}>
          <div style={{ "height": `${imageHeight}`, "background-image": `url("${review.images[3].url}")` }}></div>
        </Link>
      )
    }
    return (
      <div></div>
    )
  }


  const imagesRender = () => {
    if (review.images.length > 0) {
      return (
        <>
          <div className="review-card-images-container" style={{ "gridTemplateColumns": `${gridColumns}` }} >
            {imageOneRender()}
            {imageTwoRender()}
            {imageThreeRender()}
            {imageFourRender()}
            <br></br>
          </div>
        </>
      )
    }
  }



  return (
    <div className="review-card">

      <div className="review-card-owner-container">
        <div className="review-card-owner-image">
          <i className="fas fa-user-circle" />
        </div>
        <div className="review-card-owner-information">
          <div className="review-card-owner-name">{`${review.owner_first_name} ${review.owner_last_name[0]}.`}</div>
          <div className="review-card-owner-image-count">
            <img src={imageIcon.default}></img>
            &nbsp;<div>{review.owner_images_count}</div>
          </div>
          <div className="review-card-manage-buttons-container">
            {deleteRender()}
            {editRender()}
          </div>

        </div>
      </div>

      <br></br>

      <div className="review-card-rating-and-date-container">
        <div className="review-card-rating">{StarCalculator(review.stars)}</div>
        <div className="review-card-date">{date}</div>
      </div>

      <br></br>

      <div className="review-card-photos-buttons-container">
        {imagesLinkRender()}
        {addPhotoRender()}
      </div>

      <br></br>
      <div className="review-card-images-review">{review.review}</div>
      <br></br>
      {imagesRender()}
    </div>
  );
};

export default ReviewCard;
