package com.domain.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.project.entities.EventEntity;

public interface EventRepository  extends JpaRepository<EventEntity, String>{

}
