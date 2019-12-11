package com.domain.project;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.domain.project.entities.EventEntity;
import com.domain.project.repositories.EventRepository;

@RestController
@ComponentScan
public class EventController {

	@Autowired
	EventRepository eventRepository;

	@Autowired
	FileService fileService;

	// Method to save new event to database
	@CrossOrigin
	@PostMapping("/addEvent")
	public void addEvent(@RequestBody EventEntity object) {
		eventRepository.save(object);
	}

	// Method to upload image for event
	@CrossOrigin
	@PostMapping("/uploadFile")
	public String uploadFile(@RequestParam("file") MultipartFile file) {
		fileService.uploadFile(file);
		return file.getOriginalFilename();
		// redirectAttributes.addFlashAttribute("message",
		// "You successfully uploaded " + file.getOriginalFilename() + "!");
	}

	// Method to get all events for a city
	@CrossOrigin
	@PostMapping("/getEventsForCity")
	public List<EventEntity> getEventsForCity(@RequestBody EventEntity cityName) {
		return eventRepository.findByCityName(cityName.getEventCity());
	}
	
	@CrossOrigin
	@PostMapping("/updateEvent")
	public void updateUserEvent(@RequestBody EventEntity userEvent) {
		Optional<EventEntity> event = eventRepository.findById(userEvent.getEventId());
		event.get().setEventAddress(userEvent.getEventAddress());
		event.get().setEventContact(userEvent.getEventContact());
		event.get().setEventDate(userEvent.getEventDate());
		event.get().setEventDescription(userEvent.getEventDescription());
		event.get().setEventEndTime(userEvent.getEventEndTime());
		event.get().setEventStartTime(userEvent.getEventStartTime());
		event.get().setEventTitle(userEvent.getEventTitle());
		eventRepository.save(event.get());
	}
	
		@CrossOrigin
		@PostMapping("/deleteEvent")
		public void deleteUserEvent(@RequestBody EventEntity userEvent) {
			eventRepository.delete(userEvent);
			System.out.println("delete successful");
		}

}
