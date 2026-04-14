package com.student.faculty.Controller;

import com.student.faculty.DTO.EventDTO;
import com.student.faculty.Service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("http://localhost:5173/")
@RestController

@RequestMapping("/faculty")
public class EventController {
    private final EventService evService;

    public EventController(EventService evService) {
        this.evService = evService;
    }

    @PostMapping("/add")
    public ResponseEntity<EventDTO> addEvent(@RequestBody EventDTO model){
        EventDTO ev = evService.addEvent(model);
        return ResponseEntity.status(HttpStatus.CREATED).body(ev);
    }

    @PutMapping("/update/{eventId}/{facultyId}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable String eventId, @PathVariable String facultyId, @RequestBody EventDTO model){
        EventDTO ev = evService.updateEvent(eventId, facultyId, model);
        if (ev==null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(ev);
    }

    @DeleteMapping("/delete/{eventId}/{facultyId}")
    public ResponseEntity<EventDTO> deleteEvent(@PathVariable String eventId, @PathVariable String facultyId){
        EventDTO ev = evService.deleteEvent(eventId, facultyId);
        if (ev == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(ev);
    }

    @GetMapping("/{month}/{facultyId}")
    public ResponseEntity<EventDTO[]> viewEventsByMonth(@PathVariable Integer month, @PathVariable String facultyId){
        EventDTO[] events = evService.viewEventsByMonth(month, facultyId);
        if (events == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(events);
    }

}
