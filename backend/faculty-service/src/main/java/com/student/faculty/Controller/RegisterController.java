package com.student.faculty.Controller;

import com.student.faculty.Model.FacultyModel;
import com.student.faculty.Service.LoginService;
import com.student.faculty.Service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173/")
@RestController

@RequestMapping("/faculty")
public class RegisterController {
    private final RegisterService regService;

    public RegisterController(RegisterService regService) {
        this.regService = regService;
    }

    @PostMapping("/register")
    public ResponseEntity<FacultyModel> register(@RequestBody FacultyModel model){
        FacultyModel f = regService.register(model);
        if(f == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(f);
    }
}
