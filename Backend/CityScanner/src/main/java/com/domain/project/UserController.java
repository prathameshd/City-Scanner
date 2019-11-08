package com.domain.project;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

	@Autowired
	private JavaMailSender javaMailSender;

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
			// return user.getEmail().toString();
			return "success";

		} else {
			return "failure";
		}
	}

	@GetMapping("/getAllUsers")
	public List<UserEntity> getUsers() {
		return userRepository.findAll();
	}

	// send welcome email to new user
	@RequestMapping(value = "/welcomeEmail")
	public String sendEmail(@RequestBody String userEmail) throws AddressException, MessagingException, IOException {

		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(userEmail);

		msg.setSubject("Welcome to City Scanner");
		msg.setText("Hello and Welcome to City Scanner!");

		javaMailSender.send(msg);
		return "Email sent successfully";
	}
}
