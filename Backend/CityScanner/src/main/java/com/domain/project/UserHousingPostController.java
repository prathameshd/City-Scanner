package com.domain.project;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserHousingPostEntity;
import com.domain.project.repositories.*;

@RestController
@ComponentScan
public class UserHousingPostController {

	@Autowired
	UserHousingPostRepository userPostRepository;

	// Method to save a new post
	@CrossOrigin
	@PostMapping("/savehousepost")
	public void saveUserPost(@RequestBody UserHousingPostEntity userPost) {
		userPostRepository.save(userPost);
	}

	// MEthod to retrieve all posts for a specific place
	@CrossOrigin
	@PostMapping("/gethouseposts")
	public List<UserHousingPostEntity> getUserPost(@RequestBody UserHousingPostEntity userPost) {

		return userPostRepository.findByTitle(userPost.getPostsubjectname());
	}

	// Method to update a post
	@CrossOrigin
	@PostMapping("/updateHousePost")
	public void updateUserPost(@RequestBody UserHousingPostEntity userPost) {
		Optional<UserHousingPostEntity> post = userPostRepository.findById(userPost.getPostId());
		post.get().setPostContent(userPost.getPostContent());
		post.get().setUpvotes(userPost.getUpvotes());
		post.get().setDownvotes(userPost.getDownvotes());
		userPostRepository.save(post.get());
	}

	// Method to delete a post
	@CrossOrigin
	@PostMapping("/deleteHousePost")
	public void deleteUserPost(@RequestBody UserHousingPostEntity userPost) {
		userPostRepository.delete(userPost);
		System.out.println("delete successful");
	}

}
