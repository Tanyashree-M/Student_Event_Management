package com.student.event.Controller;

import com.student.event.Model.EventModel;
import com.student.event.Service.EventService;
import org.springframework.cglib.core.internal.LoadingCache;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
@CrossOrigin("http://localhost:5173/")
@RestController

@RequestMapping("/event")
public class EventController {
    private final EventService evService;

    public EventController(EventService evService) {
        this.evService = evService;
    }

    @GetMapping("/{rollNo}")
    public ResponseEntity<EventModel[]> getEventsByRollNo(@PathVariable String rollNo){
        EventModel[] events = evService.getEventsByRollNo(rollNo);
        return ResponseEntity.status((HttpStatus.OK)).body(events);
    }

    @PostMapping("/add")
    public ResponseEntity<EventModel> addEvent(@RequestBody EventModel ev){
        EventModel e = evService.addEvent(ev);
        return ResponseEntity.status(HttpStatus.CREATED).body(e);
    }

    @PutMapping("/update/{eventId}/{facultyId}")
    public EventModel updateEvent(@PathVariable String eventId, @PathVariable String facultyId, @RequestBody EventModel ev){
        return evService.updateEvent(eventId, facultyId, ev);
    }

    @DeleteMapping("/delete/{eventId}/{facultyId}")
    public EventModel deleteEvent(@PathVariable String eventId, @PathVariable String facultyId){
        return evService.deleteEvent(eventId, facultyId);
    }

    @GetMapping("/{start}/{end}/{facultyId}")
    public EventModel[] viewEventsByMonth(@PathVariable LocalDate start, @PathVariable LocalDate end, @PathVariable String facultyId){
        return evService.viewEventsByMonth(start, end, facultyId);
    }


}
