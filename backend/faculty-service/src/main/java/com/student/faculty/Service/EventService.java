package com.student.faculty.Service;

import com.student.faculty.DTO.EventDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;

@Service
public class EventService {
    private final RestTemplate restTemplate;
    @Value("${EVENT_SERVICE_URL}")
    private String baseUrl;
    public EventService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public EventDTO addEvent(EventDTO model) {
        String url = baseUrl + "/add";
        ResponseEntity<EventDTO> response = restTemplate.postForEntity(url, model, EventDTO.class);
        if (response.getStatusCode().is2xxSuccessful())
            return response.getBody();
        return null;
    }

    public EventDTO updateEvent(String eventId, String facultyId, EventDTO model) {
        String url = baseUrl + "/update/" + eventId + "/" + facultyId;
        HttpEntity<EventDTO> request = new HttpEntity<>(model);
        ResponseEntity<EventDTO> response = restTemplate.exchange(url, HttpMethod.PUT, request, EventDTO.class);
        if (response.getStatusCode().is2xxSuccessful())
            return response.getBody();
        return null;
    }

    public EventDTO deleteEvent(String eventId, String facultyId) {
        String url = baseUrl + "/delete/" + eventId + "/" + facultyId;
        ResponseEntity<EventDTO> response = restTemplate.exchange(url, HttpMethod.DELETE, null, EventDTO.class);
        if (response.getStatusCode().is2xxSuccessful())
            return response.getBody();
        return null;
    }

    public EventDTO[] viewEventsByMonth(Integer month, String facultyId) {
        LocalDate start = LocalDate.of(LocalDate.now().getYear(), month, 1);
        LocalDate end = start.plusMonths(1).minusDays(1);
        String url = baseUrl + "/" + start + "/" + end + "/" + facultyId;
        ResponseEntity<EventDTO[]> response = restTemplate.getForEntity(url, EventDTO[].class);

        if (response.getStatusCode().is2xxSuccessful())
            return response.getBody();
        return null;
    }
}
