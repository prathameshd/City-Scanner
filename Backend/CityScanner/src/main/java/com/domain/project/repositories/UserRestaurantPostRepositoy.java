package com.domain.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import com.domain.project.entities.UserHousingPostEntity;
import com.domain.project.entities.UserRestaurantPostEntity;

@Repository
@ComponentScan
public interface UserRestaurantPostRepositoy extends JpaRepository<UserRestaurantPostEntity, String> {
	
	@Query("SELECT u FROM UserRestaurantPostEntity u WHERE postsubjectname = ?1")
	List<UserRestaurantPostEntity> findByTitle(String postsubjectname);
	
	@Query("SELECT u FROM UserRestaurantPostEntity u WHERE postid = ?1")
	Optional<UserRestaurantPostEntity> findById(String postid);
	
}
