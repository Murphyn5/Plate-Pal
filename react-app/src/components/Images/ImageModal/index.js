import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal"
import { useSelector } from "react-redux";
import "./ImageModal.css";
import { getSingleImageThunk } from "../../../store/images";
import ColoredLine from "../../ColoredLine";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as trash from "./trash.png"

function ImageModal({ imageId, index }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const [modalImageId, setModalImageId] = useState(imageId)
    const image = useSelector(state => state.images.singleImage)
    let images = useSelector(state => state.images.images)
    const user = useSelector((state) => state.session.user);
    const [relatedIndex, setRelatedIndex] = useState(index)
    const { closeModal } = useModal();
    useEffect(() => {

        const imageRestore = async () => {
            let storeImage = await dispatch(getSingleImageThunk(modalImageId))
            let copiedStoreImage = { ...storeImage }
            const imagesIds = Object.values(images).map((image) => {
                return image.id
            })
            const mappedIndex = imagesIds.indexOf(copiedStoreImage.id)
            const imageElements = document.getElementsByClassName("image-modal-information-related-image")
            for (let i = imageElements.length - 1; i >= 0; i--) {
                imageElements[i].setAttribute('class', "image-modal-information-related-image image-modal-information-related-image-inactive")
                if (i === mappedIndex) {
                    imageElements[i].setAttribute('class', "image-modal-information-related-image image-modal-information-related-image-active")
                }
            }
        }
        imageRestore()

    }, [dispatch, modalImageId])

    if (!image || !images) {
        return null
    }

    const handleClick = async (id, mappedIndex) => {
        setModalImageId(id)
        setRelatedIndex(mappedIndex + 1)
    }

    images = Object.values(images)
    let date
    let formattedDate
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    options.timeZone = "UTC";
    options.timeZoneName = "short";
    date = new Date(image.created_at)
    formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)

    const captionChecker = () => {
        if (image.caption) {
            return (
                <>
                    <br></br>
                    <br></br>
                    <p>{image.caption || 'caption'}</p>
                    <br></br>
                    <br></br>
                </>
            )
        }

        return (
            <>
                <br></br>
                <br></br>
            </>
        )

    }

    const leftIndexChecker = () => {
        if (relatedIndex === 1) {
            return (
                <div className="image-modal-image-container-arrow-placeholder">
                </div>
            )
        }
        else {
            return (
                <div className="image-modal-image-container-arrow-left"
                    onClick={handleLeftArrowClick}></div>
            )
        }
    }

    const handleRightArrowClick = () => {
        setRelatedIndex(relatedIndex + 1)
        const imagesIds = Object.values(images).map((image) => {
            return image.id
        })
        setModalImageId(imagesIds[relatedIndex])
    }

    const handleLeftArrowClick = () => {
        setRelatedIndex(relatedIndex - 1)
        const imagesIds = Object.values(images).map((image) => {
            return image.id
        })

        setModalImageId(imagesIds[relatedIndex - 2])
    }

    const rightIndexChecker = () => {
        if (relatedIndex === images.length) {
            return (
                <div className="image-modal-image-container-arrow-placeholder">
                </div>
            )
        }
        else {
            return (
                <div className="image-modal-image-container-arrow-right"
                    onClick={handleRightArrowClick}></div>
            )
        }
    }

    const handleClose = () => {
        closeModal()
    }

    const handleRedirect = () => {
        history.push(`/images/${image.id}/delete`)
        closeModal()
    }

    const renderDeleteChecker = () => {
        if (user && image.owner_id === user.id) {
            return (
                <>
                    <br></br>
                    <div className="image-modal-delete-button-container">
                        <img src={trash.default}></img>
                        <div><span className={"image-modal-delete-button"} onClick={handleRedirect}> Delete Photo</span></div>
                    </div>
                    <br></br>
                </>
            )
        }
        else {
            return (
                <>
                    <br></br>
                    <br></br>
                </>
            )
        }
    }

    return (
        <div className="image-modal-container-wrapper">
        <div className="image-modal-container">
            <div className="image-modal-image-wrapper">

                <div className="image-modal-image-container" >

                    {leftIndexChecker()}

                    <img src={`${image.url}`} className="image-modal-singleImage" ></img>

                    {rightIndexChecker()}

                </div>

            </div>
            <div className="image-modal-information-container">
                <div className="image-modal-information-title-container">
                    <h2 className="image-modal-information-title">Photos for <Link to={`/businesses/${image.business_id}`} onClick={handleClose}>{`${image.business_name}`}</Link></h2>
                    <div className="image-modal-close-button-outer-circle" onClick={handleClose}>
                        <div className="image-modal-close-button"></div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <p>{relatedIndex} of {images.length}</p>
                <br></br>
                <br></br>
                <ColoredLine />
                {captionChecker()}
                <p>{`by ${image.user_first_name} ${image.user_last_name[0]}. on ${formattedDate.split(", ")[1]}, ${formattedDate.split(", ")[2].split(" at")[0]}`}</p>
                {renderDeleteChecker()}
                <div className="image-modal-information-related-images-container">
                    <div className="image-modal-information-related-images-grid masked-overflow">
                        {images.map((relatedImage) => {
                            return (
                                <div key={relatedImage.id} className={"image-modal-information-related-image-container"}>
                                    <img className={"image-modal-information-related-image image-modal-information-related-image-inactive"} src={relatedImage.url} onClick={() => { handleClick(relatedImage.id, images.indexOf(relatedImage)) }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
}

export default ImageModal;
