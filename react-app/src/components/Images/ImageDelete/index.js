// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./ImageDelete.css";
import { deleteImageThunk } from "../../../store/images";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { getSingleImageThunk } from "../../../store/images";
import ColoredLine from "../../ColoredLine";

function ImageDelete() {
    const dispatch = useDispatch();
    const { imageId } = useParams()
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors("")
        const errors = await dispatch(deleteImageThunk(imageId))
        if (!errors) {
            history.goBack()
        } else {
            setErrors(errors.errors[0])
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault()
        history.goBack()
    };




    useEffect(() => {

        const imageRestore = async () => {
            const confirmImage = await dispatch(getSingleImageThunk(imageId))
            if (!confirmImage || confirmImage.owner_id !== user.id) {
                history.goBack()
            }
            else {
                setImage(confirmImage)
            }
        }
        imageRestore()

    }, [dispatch])


    if (!image) {
        return null
    }
    return (
        <>
            <div className="image-delete-form-container">
                <form className={"image-delete-form"} onSubmit={handleSubmit}>
                    <br></br>
                    <br></br>
                    <h2 className="image-delete-form-title">Confirm Removal</h2>
                    <br></br>
                    <ColoredLine></ColoredLine>
                    <br></br>
                    <div>
                        Are you sure you want to remove this photo?
                    </div>
                    <br></br>
                    <img className="image-delete-form-image" src={image.url}></img>
                    <br></br>
                    <br></br>
                    {errors ? (
                        <>
                            <div className="image-delete-form-error">
                                {errors}
                            </div>
                            <br></br>
                        </>
                    )  : (
                    <></>
                    )}
                    <div className="image-delete-form-button-container">
                        <button type="submit" onClick={handleSubmit} className="image-delete-form-delete-button">Remove</button>
                        <div type="submit" onClick={handleCancel} className="image-delete-form-cancel-button">Cancel</div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ImageDelete;
