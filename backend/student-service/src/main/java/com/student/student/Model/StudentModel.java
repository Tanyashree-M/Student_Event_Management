package com.student.student.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "students")
public class StudentModel {
    @Id
    private String id;
    private String rollNo;
    private String studName;
    private String email;
    private String password;
}
