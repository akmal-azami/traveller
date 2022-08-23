import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					tr_latitude: ne.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
				},
				headers: {
					"X-RapidAPI-Key": "5172b150ffmshed797f846374cdap124b28jsn12e36b6c9e0b",
					"X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
				},
			}
		);

		// console.log(data, "DATA");
		return data;
	} catch (error) {
		console.log(error);
	}
};
