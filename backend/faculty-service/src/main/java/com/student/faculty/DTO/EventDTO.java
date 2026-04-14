package com.student.faculty.DTO;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
public class EventDTO {
    @Id
    private String id;
    private String studName;
    private String rollNo;
    private String eventName;
    private String eventLocation;
    private LocalDate eventDate;
    private String eventDescription;
    private String facultyId;
}
