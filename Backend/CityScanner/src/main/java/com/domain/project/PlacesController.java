package com.domain.project;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@ComponentScan
public class PlacesController {

	// Retrieve restaurants for a city
	@CrossOrigin
	@PostMapping(value = "/getRestaurants")
	public String getRestaurants(@RequestBody String cityName) {
		final String geoCodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName
				+ "&key=AIzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw";

		RestTemplate getGeocode = new RestTemplate();
		String responseFromAPI = getGeocode.getForObject(geoCodeAPI, String.class);
		JsonObject geoCodeResponse = new JsonParser().parse(responseFromAPI).getAsJsonObject();
		JsonArray geoCodeResultArray = geoCodeResponse.getAsJsonArray("results");

		String lat = geoCodeResultArray.get(0).getAsJsonObject().get("geometry").getAsJsonObject().get("location")
				.getAsJsonObject().get("lat").toString();
		String lng = geoCodeResultArray.get(0).getAsJsonObject().get("geometry").getAsJsonObject().get("location")
				.getAsJsonObject().get("lng").toString();

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=restaurant&key=AIzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw";
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}
}
