package com.student.faculty.Service;

import com.student.faculty.Model.FacultyModel;
import com.student.faculty.Repository.RegisterRepo;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final RegisterRepo regRepo;

    public RegisterService(RegisterRepo regRepo) {
        this.regRepo = regRepo;
    }

    public FacultyModel register(FacultyModel model) {
        FacultyModel f = regRepo.findByEmail(model.getEmail());
        if (f==null)
            return regRepo.save(model);
        else
            return null;
    }
}
