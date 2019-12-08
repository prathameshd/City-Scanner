package com.domain.project;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.domain.project.entities.NotificationEntity;
import com.domain.project.repositories.NotificationRepository;

@RestController
@ComponentScan
public class NotificationController {
	@Autowired
	NotificationRepository notificationRepository;

	@Autowired
	private JavaMailSender javaMailSender;

	// Method to add user for notifications for a specific city and post type
	@CrossOrigin
	@PostMapping("/addUserForNotifications")
	public void addUserForNotifications(@RequestBody NotificationEntity object) {
		// to ensure that user has not already enabled notification for same city and
		// category
		if (notificationRepository.checkForUser(object.getEmail(), object.getNotificationType(), object.getCityName())
				.isEmpty()) {
			notificationRepository.save(object);
		}
	}

	// Method to remove user from notifications
	@CrossOrigin
	@PostMapping("/removeUserFromNotifications")
	public void removeUserFromNotifications(@RequestBody NotificationEntity object) {
		// to ensure that user has not already enabled notification for same city and
		// category
		if (!notificationRepository.checkForUser(object.getEmail(), object.getNotificationType(), object.getCityName())
				.isEmpty()) {
			List<NotificationEntity> result = notificationRepository.checkForUser(object.getEmail(),
					object.getNotificationType(), object.getCityName());

			notificationRepository.deleteById(result.get(0).getNotificationId());
		}
	}

	// Method to get user notifications
	@CrossOrigin
	@PostMapping("/getUserNotifications")
	public List<NotificationEntity> getUserNotifications(@RequestBody NotificationEntity object) {
		List<NotificationEntity> result = notificationRepository.notificationsForUser(object.getEmail(),
				object.getCityName());
		return result;
	}

	// Method to get all users for current city and housing notifications
	@CrossOrigin
	@PostMapping("/getSubscribedUsers")
	public List<NotificationEntity> getSubscribedUsers(@RequestBody NotificationEntity object) {
		// get list of all users that satisfy given city and type
		List<NotificationEntity> usersList = notificationRepository.findUsers(object.getNotificationType(),
				object.getCityName());
		
		sendNotificationEmails(usersList,object.getNotificationType());	
		return usersList;
	}
	
	// Method to send Email notifications for housing
	public void sendNotificationEmails(List<NotificationEntity> usersList,String type) {
		for (NotificationEntity user : usersList) {
			SimpleMailMessage msg = new SimpleMailMessage();
			msg.setTo(user.getEmail());
			msg.setSubject("New Post!");
			msg.setText("There's a new post in the "+type+" section. Check it out!");
			javaMailSender.send(msg);
		}
	}
}
