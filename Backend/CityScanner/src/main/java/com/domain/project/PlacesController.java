package com.domain.project;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@ComponentScan
public class PlacesController {

	// Retrieve restaurants for given city
	@CrossOrigin
	@PostMapping(value = "/getRestaurants")
	public String getRestaurants(@RequestBody String cityName) {
		JsonObject coords = new JsonParser().parse(getPosition(cityName)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY="AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=restaurant&key=" + APIKEY;
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get coordinates for a city
	@JsonIgnore
	@CrossOrigin
	@PostMapping(value = "/getPosition")
	public String getPosition(@RequestBody String cityName) {
		String APIKEY="AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc";
		
		final String geoCodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName
				+ "&key="+ APIKEY;
		System.out.println(geoCodeAPI);
		RestTemplate getGeocode = new RestTemplate();
		String responseFromAPI = getGeocode.getForObject(geoCodeAPI, String.class);
		JsonObject geoCodeResponse = new JsonParser().parse(responseFromAPI).getAsJsonObject();
		JsonArray geoCodeResultArray = geoCodeResponse.getAsJsonArray("results");
		System.out.println("---------"+ geoCodeResultArray);
		String lat = geoCodeResultArray.get(0).getAsJsonObject().get("geometry").getAsJsonObject().get("location")
				.getAsJsonObject().get("lat").toString();
		String lng = geoCodeResultArray.get(0).getAsJsonObject().get("geometry").getAsJsonObject().get("location")
				.getAsJsonObject().get("lng").toString();

		JsonObject coords = new JsonObject();
		coords.addProperty("lat", lat);
		coords.addProperty("long", lng);

		return coords.toString();
	}

}