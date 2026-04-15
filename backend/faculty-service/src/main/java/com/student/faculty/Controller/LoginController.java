package com.student.faculty.Controller;

import com.student.faculty.Model.FacultyModel;
import com.student.faculty.Model.LoginModel;
import com.student.faculty.Service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
@CrossOrigin("*")
@RestController

@RequestMapping("/faculty")
public class LoginController {
    private final LoginService logService;

    public LoginController(LoginService logService, RestTemplate restTemplate) {
        this.logService = logService;
    }

    @PostMapping("/login")
    public ResponseEntity<FacultyModel> login(@RequestBody LoginModel model){
        FacultyModel f = logService.login(model);

        if (f == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status((HttpStatus.OK )).body(f);
    }
}
