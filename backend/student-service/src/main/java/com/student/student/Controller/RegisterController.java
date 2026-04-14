package com.student.student.Controller;

import com.student.student.Model.StudentModel;
import com.student.student.Service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173/")
@RestController

@RequestMapping("/student")
public class RegisterController {
    private final RegisterService regService;

    public RegisterController(RegisterService regService) {
        this.regService = regService;
    }

    @PostMapping("/register")
    public ResponseEntity<StudentModel> register(@RequestBody StudentModel model){
        StudentModel s = regService.register(model);
        if(s == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(s);
    }
}
