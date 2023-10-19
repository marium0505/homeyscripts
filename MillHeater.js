// Control Mill Heater using Mill's local REST API with Athom's Homeyscript.
// See https://github.com/Mill-International-AS/Generation_3_REST_API
// Replace {IP_Adress} with the (local) IP adress of your heater.
// Use the THEN card "Run Code with Argument" and use the new target temperature as argument.

Temperature = args[0];
HeaterURL = "http://{IP_Adress}/";

// This ensures that the heater is controlled individually rather than program. 
postJSON(HeaterURL + "operation-mode", { mode: "Control individually" });
const json = JSON.parse('{"type":"Normal", "value":' + Temperature + "}");
postJSON(HeaterURL + "set-temperature", json);

async function postJSON(URL, data) {
	try {
		const response = await fetch(URL, {
			method: "POST",
			body: JSON.stringify(data),
		});
		const result = await response.json();
		console.log("Success:", result);
	} catch (error) {
		console.error("Error:", error);
	}
}
