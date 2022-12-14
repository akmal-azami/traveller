import React, { useEffect, useState, useRef } from "react";

import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";
import useAlan from "./Alan";

const App = () => {
	const alanBtnContainer = useRef();
	useAlan();
	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [places, setPlaces] = useState([]);

	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const filtered = places.filter((place) => Number(place.rating) > rating);

		setFilteredPlaces(filtered);
	}, [rating]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			setIsLoading(true);

			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
				setIsLoading(false);
				setFilteredPlaces([]);
				// console.log(data, "Places");
			});
		}
	}, [type, bounds]);

	return (
		<>
			<CssBaseline />
			<Header setCoordinates={setCoordinates} />
			<Grid container spacing={3} style={{ width: "100%" }}>
				<Grid item xs={12} md={4}>
					<List
						places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}
						isLoading={isLoading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
			<div ref={alanBtnContainer} />
		</>
	);
};

export default App;
