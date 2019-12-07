package com.domain.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.domain.project.entities.UserEventPostEntity;

public interface UserEventPostRepository extends JpaRepository<UserEventPostEntity, String> {
	@Query("SELECT u FROM UserEventPostEntity u WHERE postsubjectname = ?1")
	List<UserEventPostEntity> findByTitle(String postsubjectname);
}
