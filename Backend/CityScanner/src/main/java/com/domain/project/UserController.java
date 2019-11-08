package com.domain.project;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserEntity;
import com.domain.project.repositories.UserRepository;

@RestController
@ComponentScan
public class UserController {
	@Autowired
	UserRepository userRepository;

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/home")
	public String index() {
		return "Greetings from Spring Boot!";

	}

	@GetMapping("/login")
	public String login(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		String userPassword = user.getPassword();
		PasswordEncoderConfig passwordEncoderConfig = new PasswordEncoderConfig();

		Optional<UserEntity> userLoginObject = userRepository.findById(userEmail);

		// username doesnt exist
		if (userLoginObject.equals(Optional.empty())) {
			return "Incorrect Username";
		}

		// password matches
		if (passwordEncoderConfig.passwordEncoder().matches(userPassword, userLoginObject.get().getPassword())) {
			return "Login Success";

		} else {
			return "Incorrect Password";
		}
	}

	@GetMapping("/signUp")
	public String saveUser(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		PasswordEncoderConfig passwordEncoderConfig = new PasswordEncoderConfig();
		if (userRepository.findById(userEmail).equals(Optional.empty())) {
			user.setPassword(passwordEncoderConfig.passwordEncoder().encode(user.getPassword()));
			userRepository.save(user);
			return "success";

		} else {
			return "failure";
		}
	}

	@GetMapping("/getAllUsers")
	public List<UserEntity> getUsers() {
		return userRepository.findAll();
	}

}
