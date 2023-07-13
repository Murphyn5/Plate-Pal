import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentBusinessesThunk } from "../../../store/businesses";
import BusinessCard from "../BusinessCard";
import ColoredLine from "../../ColoredLine";

import "./ManageBusinessesIndex.css";

const ManageBusinessesIndex = () => {
    const dispatch = useDispatch();
    let businesses = useSelector((state) => state.businesses.businesses);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const businessRestore = async () => {
            await dispatch(getCurrentBusinessesThunk());
        };
        businessRestore();
    }, [dispatch]);

    if (!businesses) return null;

    businesses = Object.values(businesses)

    businesses?.sort(
        (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
    );

    return (
        <>
            <div className="manage-businesses-container">
                <br></br>
                <br></br>
                <h2 className="manage-images-index-title">{`Businesses for ${user.first_name} ${user.last_name[0]}.`}</h2>
                <br></br>
                <ColoredLine />
                <br></br>
                {
                    businesses.length === 0 ?
                        <div style={{ alignSelf: "flex-start" }}>No Businesses to Show</div>
                        :
                        <div className="manage-businesses-grid">{
                            businesses.map((business) => {
                                return (
                                    <BusinessCard
                                        business={business}
                                        key={business.id}
                                    />
                                );
                            })}
                        </div>
                }
            </div>
        </>
    );
};

export default ManageBusinessesIndex;
