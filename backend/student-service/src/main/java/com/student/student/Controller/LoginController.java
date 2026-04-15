package com.student.student.Controller;

import com.student.student.DTO.EventDTO;
import com.student.student.Model.LoginModel;
import com.student.student.Service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
@CrossOrigin("*")
@RestController

@RequestMapping("/student")
public class LoginController {
    private final LoginService logService;


    public LoginController(LoginService logService, RestTemplate restTemplate) {
        this.logService = logService;
    }

    @PostMapping("/login")
    public ResponseEntity<EventDTO[]> login(@RequestBody LoginModel model){
        EventDTO[]events = logService.login(model);

        if (events == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status((HttpStatus.OK )).body(events);
    }
}
