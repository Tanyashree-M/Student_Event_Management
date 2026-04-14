package com.student.event.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "events")
public class EventModel {
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
