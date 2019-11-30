package com.domain.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.domain.project.entities.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, String> {
	@Query("SELECT DISTINCT u FROM NotificationEntity u WHERE notificationtype= ?1 AND cityname=?2")
	List<NotificationEntity> findUsers(String notificationType, String cityName);
}
