package com.domain.project;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserPlacesPostEntity;
import com.domain.project.repositories.*;

@RestController
@ComponentScan
public class UserPlacesPostController {
	
	@Autowired
	UserPlacesPostRepository userPostRepository;

	@CrossOrigin
	@PostMapping("/saveplacespost")
	public void saveUserPost(@RequestBody UserPlacesPostEntity userPost) {
		userPostRepository.save(userPost);
	}
	
	@CrossOrigin
	@GetMapping("/getplacesposts")
	public List<UserPlacesPostEntity> getUserPost(@RequestBody UserPlacesPostEntity userPost) {
		
		return userPostRepository.findByTitle(userPost.getPostsubjectname());
	}

}
