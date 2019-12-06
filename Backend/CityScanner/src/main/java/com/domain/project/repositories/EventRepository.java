package com.domain.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.domain.project.entities.EventEntity;

public interface EventRepository extends JpaRepository<EventEntity, String> {

	@Query("SELECT u FROM EventEntity u WHERE city = ?1")
	List<EventEntity> findByCityName(String eventCity);

}
