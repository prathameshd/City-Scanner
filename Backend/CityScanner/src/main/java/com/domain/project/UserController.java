package com.domain.project;

import java.io.IOException;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.UserEntity;
import com.domain.project.entities.UserHousingPostEntity;
import com.domain.project.repositories.UserRepository;

@RestController
@ComponentScan
public class UserController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	private JavaMailSender javaMailSender;

	@CrossOrigin
	@RequestMapping("/home")
	public String index() {
		return "Greetings from Spring Boot!";

	}

	// Login Endpoint
	@CrossOrigin
	@PostMapping("/login")
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

	// Signup Endpoint
	@CrossOrigin
	@PostMapping("/signUp")
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

	// Get list of all users
	@CrossOrigin
	@GetMapping("/getAllUsers")
	public List<UserEntity> getUsers() {
		return userRepository.findAll();
	}
	
	// extract user profile info
	@CrossOrigin
	@PostMapping("/getUser")
	public Object userDetails(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		return userRepository.findById(userEmail);
	}
	
	// Method to update user info
	@CrossOrigin
	@PostMapping("/updateUserProfile")
	public void updateDetails(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		PasswordEncoderConfig passwordEncoderConfig = new PasswordEncoderConfig();
		Optional<UserEntity> userUpdateObject = userRepository.findById(userEmail);
		userUpdateObject.get().setPassword(passwordEncoderConfig.passwordEncoder().encode(user.getPassword()));
		userUpdateObject.get().setFirstName(user.getFirstName());
		userUpdateObject.get().setLastName(user.getLastName());
		userUpdateObject.get().setContactNumber(user.getContactNumber());
		userRepository.save(userUpdateObject.get());
	}

	// send welcome email to new user
	@CrossOrigin
	@PostMapping(value = "/welcomeEmail")
	public String sendEmail(@RequestBody UserEntity user) throws AddressException, MessagingException, IOException {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(user.getEmail());

		msg.setSubject("Welcome to City Scanner");
		msg.setText("Hello and Welcome to City Scanner!");

		javaMailSender.send(msg);
		return "Email sent successfully";
	}
	
}
