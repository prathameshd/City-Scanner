package com.domain.project.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import com.domain.project.entities.UserHousingPostEntity;

@Repository
@ComponentScan
public interface UserHousingPostRepository extends JpaRepository<UserHousingPostEntity, String>{

	@Query("SELECT u FROM UserHousingPostEntity u WHERE postsubjectname = ?1")
	List<UserHousingPostEntity> findByTitle(String postsubjectname);
	
	@Query("SELECT u FROM UserHousingPostEntity u WHERE postid = ?1")
	Optional<UserHousingPostEntity> findById(String postid);
	
}
