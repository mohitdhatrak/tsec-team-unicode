import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function ViewListingPage() {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);

    // const getData = async () => {
    //     const res = await fetch("/getHotelData", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       credentials: "include"
    //     })
    //     setProductData(await res.json())
    //   }

    return (
        <div>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                }
            </MapContainer>
        </div>
    );
}

export default ViewListingPage;
