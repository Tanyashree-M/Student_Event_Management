package com.student.student.Service;

import com.student.student.Model.StudentModel;
import com.student.student.Repository.RegisterRepo;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final RegisterRepo regRepo;

    public RegisterService(RegisterRepo regRepo) {
        this.regRepo = regRepo;
    }

    public StudentModel register(StudentModel model) {
        StudentModel s = regRepo.findByEmail(model.getEmail());
        if (s==null)
            return regRepo.save(model);
        else
            return null;
    }
}
