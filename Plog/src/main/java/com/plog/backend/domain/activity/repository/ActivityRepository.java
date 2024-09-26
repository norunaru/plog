package com.plog.backend.domain.activity.repository;

import com.plog.backend.domain.activity.entity.Activity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query("SELECT a FROM Activity a WHERE a.member.id = :id")
    List<Activity> findAllByMemberId(@Param("id") Long id);
}
