package com.domain.project;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	@PostMapping("/savePlacesPost")
	public void saveUserPost(@RequestBody UserPlacesPostEntity userPost) {
		userPostRepository.save(userPost);
	}
	
	@CrossOrigin
	@PostMapping("/getPlacePosts")
	public List<UserPlacesPostEntity> getUserPost(@RequestBody UserPlacesPostEntity userPost) {
		
		return userPostRepository.findByTitle(userPost.getPostsubjectname());
	}
	
	// Method to update a post
		@CrossOrigin
		@PostMapping("/updatePlacesPost")
		public void updateUserPost(@RequestBody UserPlacesPostEntity userPost) {
			Optional<UserPlacesPostEntity> post = userPostRepository.findById(userPost.getPostId());
			post.get().setPostContent(userPost.getPostContent());
			post.get().setUpvotes(userPost.getUpvotes());
			post.get().setDownvotes(userPost.getDownvotes());
			userPostRepository.save(post.get());
		}

		// Method to delete a post
		@CrossOrigin
		@PostMapping("/deletePlacesPost")
		public void deleteUserPost(@RequestBody UserPlacesPostEntity userPost) {
			userPostRepository.delete(userPost);
			System.out.println("delete successful");
		}

}
