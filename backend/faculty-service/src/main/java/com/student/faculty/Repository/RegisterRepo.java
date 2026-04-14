package com.student.faculty.Repository;

import com.student.faculty.Model.FacultyModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepo extends MongoRepository<FacultyModel, String> {
    FacultyModel findByEmail(String email);
}
