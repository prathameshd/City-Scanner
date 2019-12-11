package com.domain.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import com.domain.project.entities.UserPlacesPostEntity;

@Repository
@ComponentScan
public interface UserPlacesPostRepository extends JpaRepository<UserPlacesPostEntity, String>{
	@Query("SELECT u FROM UserPlacesPostEntity u WHERE postsubjectname = ?1")
	List<UserPlacesPostEntity> findByTitle(String postsubjectname);
	
	@Query("SELECT u FROM UserPlacesPostEntity u WHERE postid = ?1")
	Optional<UserPlacesPostEntity> findById(String postid);
}
