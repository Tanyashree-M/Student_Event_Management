package com.student.student.Repository;

import com.student.student.Model.StudentModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepo extends MongoRepository<StudentModel, String> {
    StudentModel findByEmail(String email);

    StudentModel findByRollNo(String maxRoll);
}
