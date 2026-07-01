package com.telusko.Backend.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.telusko.Backend.Model.CarRequestDTO;
import com.telusko.Backend.Model.CarResponseDTO;
import com.telusko.Backend.Service.CarService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    @GetMapping("/shortlist")
    public List<CarResponseDTO> getShortlist( CarRequestDTO request) {

        return service.getShortlist(
                request.getFuel(),
                request.getBudget(),
                request.getMileage(),
                request.getSafety()
        );
    }
}
