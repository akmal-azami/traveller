import React, { useState, useEffect, createRef } from "react";
import {
	CircularProgress,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	BottomNavigationAction,
	BottomNavigation,
} from "@material-ui/core";
import useStyles from "./styles.js";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { Restaurant } from "@mui/icons-material/";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
const List = ({
	places,
	childClicked,
	isLoading,
	type,
	setType,
	rating,
	setRating,
}) => {
	const classes = useStyles();

	const [elRefs, setElRefs] = useState([]);

	useEffect(() => {
		//We want to use an Array constructor and inside of that constructor we want to construct as many elements in our list as there are in places (usually it shows 33)
		// we only need index that's why we put _ in 1st param of the map
		// then we gonna use is in Grid
		const refs = Array(places?.length)
			.fill()
			.map((_, i) => elRefs[i] || createRef());
		setElRefs(refs);
	}, [places]);

	const [value, setValue] = React.useState("restaurants");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// console.log({ childClicked });
	// we usecreateRef, so that when we click on a child then it is going to take us to that poster on the list through the scrollbar
	return (
		<div className={classes.formControl}>
			<Typography variant="h4">
				Restaurants, Hotels & Attractions around you
			</Typography>
			{isLoading ? (
				<div className={classes.loading}>
					<CircularProgress size="5rem" />{" "}
				</div>
			) : (
				<>
					<FormControl className={classes.formControl}>
						<InputLabel id="type">Type</InputLabel>

						<Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
							<MenuItem value="restaurants">Restaurants</MenuItem>
							<MenuItem value="hotels">Hotels</MenuItem>
							<MenuItem value="attractions">Attractions</MenuItem>
						</Select>

						{/* Will be implemented later */}
						{/* <BottomNavigation
						showLabels
						value={type}
							onChange={(e) => setType(e.target.value)}
							id="type"
					>
						<BottomNavigationAction label="restaurants" icon={<Restaurant />} />
						<BottomNavigationAction label="hotels" icon={<HotelIcon />} />
						<BottomNavigationAction label="attractions" icon={<AttractionsIcon />} />
					</BottomNavigation> */}
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="rating">Rating</InputLabel>
						<Select
							id="rating"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={3}>Above 3.0</MenuItem>
							<MenuItem value={4}>Above 4.0</MenuItem>
							<MenuItem value={4.5}>Above 4.5</MenuItem>
						</Select>
					</FormControl>

					<Grid container spacing={3} className={classes.list}>
						{places?.map((place, i) => (
							<Grid item ref={elRefs[i]} key={i} xs={12}>
								<PlaceDetails
									place={place}
									selected={Number(childClicked) === i}
									refProp={elRefs[i]}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default List;
