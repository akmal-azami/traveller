import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked }) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery("(min-width:600px)");

	const coord = { lat: 0, lng: 0 };
	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={""}
				onChange={(e) => {
					// console.log(e, "Google Maps Coordinates");
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}} // to know when coordinates and bounds change
				onChildClick={(child) => setChildClicked(child)}
			>
				{places?.map((place, i) => (
					<div
						className={classes.markerContainer}
						lat={Number(place.latitude)}
						lng={Number(place.longitude)}
						key={i}
					>
						{!isDesktop ? (
							<LocationOnOutlinedIcon color="primary" fontSize="large" />
						) : (
							<Paper elevation={3} className={classes.paper}>
								<Typography
									className={classes.typography}
									variant="subtitle2"
									gutterBottom
								>
									{place.name}
								</Typography>
								<img
									className={classes.pointer}
									src={
										place.photo
											? place.photo.images.large.url
											: "https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg"
									}
									alt="place.name"
								/>
								<Rating size="small" value={Number(place.rating)} readOnly />
							</Paper>
						)}
					</div>
				))}
			</GoogleMapReact>
			{/* {console.log(coordinates, "Initial coords")}{" "} */}
		</div>
	);
};

export default Map;
