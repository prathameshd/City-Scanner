package com.domain.project;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

	// Retrieve places to visit for given city
	@CrossOrigin
	@PostMapping(value = "/getPlaces")
	public String getPlaces(@RequestBody String cityName) {
		JsonObject coords = new JsonParser().parse(getPosition(cityName)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=tourist_attraction&key=" + APIKEY;
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Retrieve restaurants for given city
	@CrossOrigin
	@PostMapping(value = "/getRestaurants")
	public String getRestaurants(@RequestBody String cityName) {
		JsonObject coords = new JsonParser().parse(getPosition(cityName)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=restaurant&key=" + APIKEY;
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get housing locations for a city
	@CrossOrigin
	@PostMapping(value = "/getHousing")
	public String getHousing(@RequestBody String cityName) {
		JsonObject coords = new JsonParser().parse(getPosition(cityName)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=establishment&keyword=apartment|housing|society&key=" + APIKEY;
		System.out.println(placesAPI);
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get groceries or shopping centers for a city
	@CrossOrigin
	@PostMapping(value = "/getShopping")
	public String getShopping(@RequestBody String shop) {
		JsonObject coords = new JsonParser().parse(getPosition(shop)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=shopping_mall|grocery_or_supermarket|home_goods_store&key=" + APIKEY;
		System.out.println(placesAPI);
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get bus stops for a city
	@CrossOrigin
	@PostMapping(value = "/getBusStop")
	public String getBusStop(@RequestBody String busStop) {
		JsonObject coords = new JsonParser().parse(getPosition(busStop)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=bus_station&key=" + APIKEY;
		System.out.println(placesAPI);
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get atms, banks for a city
	@CrossOrigin
	@PostMapping(value = "/getAtm")
	public String getAtm(@RequestBody String atm) {
		JsonObject coords = new JsonParser().parse(getPosition(atm)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";

		final String placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
				+ lng + "&radius=15000&type=atm|bank&key=" + APIKEY;
		System.out.println(placesAPI);
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get events for a city
	@CrossOrigin
	@PostMapping(value = "/getEvent")
	public String getEvent(@RequestBody String event) {
		JsonObject coords = new JsonParser().parse(getPosition(event)).getAsJsonObject();
		String lat = coords.get("lat").getAsString();
		String lng = coords.get("long").getAsString();
		String APIKEY = "GLxqEVHtALzHBKjax1d9knHafTr5wtmd";
		final String placesAPI = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + APIKEY + "&latlong=" + lat
				+ "," + lng + "&radius=15000";
		System.out.println(placesAPI);
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placesAPI, String.class);

		return placesResult;
	}

	// Get coordinates for a city
	@JsonIgnore
	@CrossOrigin
	@PostMapping(value = "/getPosition")
	public String getPosition(@RequestBody String cityName) {
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";
		final String geoCodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName + "&key="
				+ APIKEY;
		RestTemplate getGeocode = new RestTemplate();
		String responseFromAPI = getGeocode.getForObject(geoCodeAPI, String.class);
		JsonObject geoCodeResponse = new JsonParser().parse(responseFromAPI).getAsJsonObject();
		JsonArray geoCodeResultArray = geoCodeResponse.getAsJsonArray("results");

		String lat = geoCodeResultArray.get(0).getAsJsonObject().get("geometry").getAsJsonObject().get("location")
				.getAsJsonObject().get("lat").toString();
		String lng = geoCodeResultArray.get(0).getAsJsonObject().get("geometry").getAsJsonObject().get("location")
				.getAsJsonObject().get("lng").toString();

		JsonObject coords = new JsonObject();
		coords.addProperty("lat", lat);
		coords.addProperty("long", lng);

		return coords.toString();
	}

	@CrossOrigin
	@JsonIgnore
	@PostMapping(value = "/getPlaceDetails")
	public String getPlacesDetails(@RequestBody String placeID) {
		String plcID = placeID.substring(0, 27);
		String APIKEY = "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI";
		final String placeDetailsAPI = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + plcID
				+ "&key=" + APIKEY;
		RestTemplate getPlaces = new RestTemplate();
		String placesResult = getPlaces.getForObject(placeDetailsAPI, String.class);
		return placesResult;
	}

}
