import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getImagesThunk, getImagesAction } from "../../../store/images";
import ColoredLine from "../../ColoredLine";
import { useParams } from "react-router-dom";
import { getSingleBusinessThunk } from "../../../store/businesses";
import { Link } from "react-router-dom";
import ImageCard from "../../Images/ImageCard";
import "./BusinessImagesIndex.css";

const BusinessImagesIndex = () => {
    const { businessId } = useParams()
    const dispatch = useDispatch();
    let images = useSelector((state) => state.images.images);
    const user = useSelector((state) => state.session.user);
    const business = useSelector((state) => state.businesses.singleBusiness)
    const history = useHistory()
    useEffect(() => {
        const imageRestore = async () => {
            const business = await dispatch(getSingleBusinessThunk(businessId))
            if(business){
                let images = {}
                for (let i = 0; i < business.images.length; i++){
                    images[business.images[i].id] = business.images[i]
                }
                await dispatch(getImagesAction({"images": images}));
            }
            else{
                history.push("/404")
            }
        };
        imageRestore();
    }, [dispatch]);

    if (!images || !business) return null;

    images = Object.values(images)

    images?.sort(
        (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at)
    );

    let index = 0


    return (
        <>

            <div className="business-images-index-container">
                <br></br>
                <h2 className="business-images-index-title">Images for <Link to={`/businesses/${businessId}`}>{business.name}</Link></h2>
                <br></br>
                <ColoredLine />
                <br></br>
                <div className="business-images-index-grid">
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

export default BusinessImagesIndex;
