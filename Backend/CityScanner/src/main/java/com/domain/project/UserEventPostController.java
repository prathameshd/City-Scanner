package com.domain.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserEventPostEntity;
import com.domain.project.repositories.UserEventPostRepository;

@RestController
@ComponentScan
public class UserEventPostController {
	@Autowired
	UserEventPostRepository userEventPostRepository;

	// Method to save a new post
	@CrossOrigin
	@PostMapping("/saveEventPost")
	public void saveEventPost(@RequestBody UserEventPostEntity entity) {
		userEventPostRepository.save(entity);
	}

	// Method to retrieve all posts for a specific event
	@CrossOrigin
	@PostMapping("/getEventPosts")
	public List<UserEventPostEntity> getEventPosts(@RequestBody UserEventPostEntity userPost) {
		return userEventPostRepository.findByTitle(userPost.getPostsubjectname());
	}
}
