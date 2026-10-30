package com.example.jobportalsystem.repository;

import com.example.jobportalsystem.entity.ContactQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactQueryRepository extends JpaRepository<ContactQuery, Integer> {
}
