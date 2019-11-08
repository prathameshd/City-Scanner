package com.domain.project.repositories;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.domain.project.entities.UserEntity;

@Repository
@ComponentScan
public interface UserRepository extends JpaRepository<UserEntity, String> {

}
