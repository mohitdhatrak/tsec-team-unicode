import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import axios from "axios";
import "./ViewListing.css";
import { Box, Container } from "@mui/system";

export function ViewListing() {
    const navigate = useNavigate();
    const [productArr, setProductArr] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/product/`,
                    { withCredentials: true }
                );

                setProductArr(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    {/* <MapContainer
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
            </MapContainer> */}
                    {productArr.map((product, num) => (
                        <div
                            className="card card-vertical card-only-icons"
                            style={{ marginBottom: " 2rem" }}
                        >
                            <div className="card-body">
                                <div className="card-image-header-container">
                                    <img
                                        style={{
                                            backgroundImage: `url(../../../../server/images/${product.image})`,
                                        }}
                                        alt=""
                                        className="card-image"
                                    />
                                    <header className="card-header-container">
                                        <h1 className="card-heading">
                                            Name: {product.prodName}
                                        </h1>
                                        <p className="card-subheading">
                                            by user {num + 1}
                                        </p>
                                    </header>
                                </div>
                                <p className="card-text">
                                    Description: {product.description}
                                </p>
                                <p className="card-text">
                                    Product age: {product.yearsUsed}
                                </p>
                                <p className="card-text">
                                    User's price{product.userPrice}
                                </p>
                            </div>
                            <div className="card-footer">
                                <div className="card-primary-buttons-container"></div>
                                <div className="card-secondary-buttons-container">
                                    <button className="card-button">
                                        <i className="material-icons card-svg-icons">
                                            favorite_border
                                        </i>
                                    </button>
                                    <button className="card-button">
                                        <i className="material-icons card-svg-icons">
                                            share
                                        </i>
                                    </button>
                                    <button className="card-button">
                                        <i className="material-icons card-svg-icons">
                                            more_vert
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Box>
            </Container>
        </div>
    );
}
