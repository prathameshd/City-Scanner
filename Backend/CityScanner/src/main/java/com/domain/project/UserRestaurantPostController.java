package com.domain.project;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserRestaurantPostEntity;
import com.domain.project.repositories.*;

@RestController
@ComponentScan
public class UserRestaurantPostController {
	
	@Autowired
	UserRestaurantPostRepositoy userPostRepository;

	@CrossOrigin
	@PostMapping("/saverestaurantpost")
	public void saveUserPost(@RequestBody UserRestaurantPostEntity userPost) {
		userPostRepository.save(userPost);
	}
	
	@CrossOrigin
	@GetMapping("/getrestaurantposts")
	public List<UserRestaurantPostEntity> getUserPost(@RequestBody UserRestaurantPostEntity userPost) {
		return userPostRepository.findByTitle(userPost.getPostsubjectname());
	}
}
