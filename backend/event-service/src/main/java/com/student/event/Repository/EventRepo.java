package com.student.event.Repository;

import com.student.event.Model.EventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepo extends MongoRepository<EventModel, String> {
    EventModel[] findByRollNo(String rollNo);

    EventModel deleteByIdAndFacultyId(String eventId, String facultyId);

    @Query("{ 'facultyId': ?0, 'eventDate': { $gte: ?1, $lte: ?2 } }")
    EventModel[] findEventsByFacultyAndDateRange(
            String facultyId, String start, String end
    );

    List<EventModel> findByFacultyIdAndEventDateBetween(String facultyId, LocalDate start, LocalDate end);
}
