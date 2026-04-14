package com.student.faculty.Service;

import com.student.event.Model.EventModel;
import com.student.faculty.Model.FacultyModel;
import com.student.faculty.Model.LoginModel;
import com.student.faculty.Repository.RegisterRepo;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    private final RegisterRepo regRepo;

    public LoginService(RegisterRepo regRepo) {
        this.regRepo = regRepo;
    }

    public FacultyModel login(LoginModel model) {
        FacultyModel f = regRepo.findByEmail(model.getEmail());
        if (f == null)
            return null;
        if (f.getPassword().equals(model.getPassword()))
            return f;
        return null;
    }
}
