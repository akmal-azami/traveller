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
					"X-RapidAPI-Key": "cebbf8b3e6msh70e606a34fe00a8p16ad41jsneb267848a82d",
					"X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
				},
			}
		);

		console.log(data, "DATA");
		return data;
	} catch (error) {
		console.log(error);
	}
};
