package com.domain.project;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	@PostMapping("/getrestaurantposts")
	public List<UserRestaurantPostEntity> getUserPost(@RequestBody UserRestaurantPostEntity userPost) {
		return userPostRepository.findByTitle(userPost.getPostsubjectname());
	}
	
	// Method to update a post
	@CrossOrigin
	@PostMapping("/updateRestaurantPost")
	public void updateUserPost(@RequestBody UserRestaurantPostEntity userPost) {
		Optional<UserRestaurantPostEntity> post = userPostRepository.findById(userPost.getPostId());
		post.get().setPostContent(userPost.getPostContent());
		post.get().setUpvotes(userPost.getUpvotes());
		post.get().setDownvotes(userPost.getDownvotes());
		userPostRepository.save(post.get());
	}

	// Method to delete a post
	@CrossOrigin
	@PostMapping("/deleteRestaurantPost")
	public void deleteUserPost(@RequestBody UserRestaurantPostEntity userPost) {
		userPostRepository.delete(userPost);
		System.out.println("delete successful");
	}
}
