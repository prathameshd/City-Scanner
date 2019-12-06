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
@Table(name = "usershousingpost")
public class UserHousingPostEntity {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "postid")
	private String postid;
	
	@Column(name = "username")
	private String username;

	@Column(name = "title")
	private String title;

	@Column(name = "postcontent")
	private String postcontent;

	@Column(name = "ratings")
	private int ratings;
	
	@Column(name = "datetime")
	private String datetime;
	
	@Column(name = "category")
	private String category;
	
	@Column(name = "postsubjectname")
	private String postsubjectname;
	
	@Column(name = "upvotes")
	private int upvotes;
	
	@Column(name = "downvotes")
	private int downvotes;
	
	public int getUpvotes() {
		return upvotes;
	}

	public void setUpvotes(int upvotes) {
		this.upvotes = upvotes;
	}

	public int getDownvotes() {
		return downvotes;
	}

	public void setDownvotes(int downvotes) {
		this.downvotes = downvotes;
	}
	
	public String getPostsubjectname() {
		return postsubjectname;
	}

	public void setPostsubjectname(String postsubjectname) {
		this.postsubjectname = postsubjectname;
	}
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPostId() {
		return postid;
	}

	public void setPostId(String postId) {
		this.postid = postId;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPostContent() {
		return postcontent;
	}

	public void setPostContent(String postContent) {
		this.postcontent = postContent;
	}

	public int getRatings() {
		return ratings;
	}

	public void setRatings(int ratings) {
		this.ratings = ratings;
	}

	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}

}
