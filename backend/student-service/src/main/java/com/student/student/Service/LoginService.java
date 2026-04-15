package com.student.student.Service;

import com.student.student.DTO.EventDTO;
import com.student.student.Model.LoginModel;
import com.student.student.Model.StudentModel;
import com.student.student.Repository.RegisterRepo;
import jdk.jfr.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LoginService {
    private final RegisterRepo regRepo;
    private final RestTemplate restTemplate;

    public LoginService(RegisterRepo regRepo, RestTemplate restTemplate) {
        this.regRepo = regRepo;
        this.restTemplate = restTemplate;
    }

    public EventDTO[] login(LoginModel model) {
        StudentModel s = regRepo.findByEmail(model.getEmail());
        if (s==null)
            return null;
        if (s.getPassword().equals(model.getPassword())){
            String url = "http://localhost:8081/event/" + s.getRollNo();
            ResponseEntity<EventDTO[]> response = restTemplate.getForEntity(url, EventDTO[].class);
            if(response.getStatusCode().is2xxSuccessful())
                return response.getBody();
            return null;
        }
        return null;
    }
}
