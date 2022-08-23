import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect } from "react";

const useAlan = () => {
	useEffect(() => {
		alanBtn({
			key: "f3edf2b28a0cf6abfa3067c17a95eb732e956eca572e1d8b807a3e2338fdd0dc/stage",
			onCommand: (commandData) => {
				if (commandData.command === "go:back") {
					// Call the client code that will react to the received command
				}
			},
		});
	}, []);
};

export default useAlan;
