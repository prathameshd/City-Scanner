package com.domain.project.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@Entity
@ComponentScan
@EntityScan
@Table(name = "events")
public class EventEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eventid")
	private String eventId;

	@Column(name = "useremail")
	private String userEmail;

	@Column(name = "title")
	private String eventTitle;

	@Column(name = "description")
	private String eventDescription;

	@Column(name = "date")
	private String eventDate;

	@Column(name = "address")
	private String eventAddress;

	@Column(name = "city")
	private String eventCity;

	@Column(name = "contact")
	private String eventContact;

	@Column(name = "starttime")
	private String eventStartTime;

	@Column(name = "endtime")
	private String eventEndTime;

	@Column(name = "image")
	private String eventImage;

	public String getEventId() {
		return eventId;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public String getEventCity() {
		return eventCity;
	}

	public void setEventCity(String eventCity) {
		this.eventCity = eventCity;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getEventTitle() {
		return eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public String getEventDescription() {
		return eventDescription;
	}

	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}

	public String getEventDate() {
		return eventDate;
	}

	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}

	public String getEventAddress() {
		return eventAddress;
	}

	public void setEventAddress(String eventAddress) {
		this.eventAddress = eventAddress;
	}

	public String getEventContact() {
		return eventContact;
	}

	public void setEventContact(String eventContact) {
		this.eventContact = eventContact;
	}

	public String getEventStartTime() {
		return eventStartTime;
	}

	public void setEventStartTime(String eventStartTime) {
		this.eventStartTime = eventStartTime;
	}

	public String getEventEndTime() {
		return eventEndTime;
	}

	public void setEventEndTime(String eventEndTime) {
		this.eventEndTime = eventEndTime;
	}

	public String getEventImage() {
		return eventImage;
	}

	public void setEventImage(String eventImage) {
		this.eventImage = eventImage;
	}

}
