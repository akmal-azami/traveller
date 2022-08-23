import React, { useState, useContext } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	Box,
	IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = ({ setCoordinates }) => {
	const classes = useStyles();
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const [autocomplete, setAutocomplete] = useState(null);

	const onLoad = (autoC) => setAutocomplete(autoC);

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat();
		const lng = autocomplete.getPlace().geometry.location.lng();

		setCoordinates({ lat, lng });
	};

	return (
		<AppBar position="static">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
Traveller - search. then go				</Typography>

				{/* <IconButton
					color="inherit"
					sx={{ ml: 1 }}
					onClick={colorMode.toggleColorMode}
				>
					{theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
				</IconButton> */}

				<Box display="flex">
					<Typography variant="h6" className={classes.title}>
						Explore new places
					</Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search..."
								classes={{ root: classes.inputRoot, input: classes.inputInput }}
							/>
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
