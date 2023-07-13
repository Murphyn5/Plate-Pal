import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImagesThunk } from "../../../store/images";
import ImageCard from "../ImageCard";
import ColoredLine from "../../ColoredLine";

import "./ManageImagesIndex.css";

const ManageImagesIndex = () => {
    const dispatch = useDispatch();
    let images = useSelector((state) => state.images.images);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const imageRestore = async () => {
            await dispatch(getImagesThunk());
        };
        imageRestore();
    }, [dispatch]);

    if (!images) return null;

    images = Object.values(images)

    images?.sort(
        (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
    );

    let index = 0

    return (
        <>

            <div className="manage-images-index-container">
                <br></br>
                <br></br>
                <h2 className="manage-images-index-title">{`Images for ${user.first_name} ${user.last_name[0]}.`}</h2>
                <br></br>
                <ColoredLine />
                <br></br>
                <div className="manage-images-index-grid">
                {
                        images.length === 0 ?
                            <div>No Images to Show</div>
                            : images.map((image) => {
                                index++
                                return (
                                    <ImageCard
                                        image={image}
                                        key={image.id}
                                        index={index}
                                    />
                                );
                            })}
                </div>
            </div>
        </>
    );
};

export default ManageImagesIndex;
