package com.telusko.Backend.ServiceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.telusko.Backend.Model.Car;
import com.telusko.Backend.Model.CarResponseDTO;
import com.telusko.Backend.Service.CarService;

@Service
public class CarServiceImpl implements CarService {
	private final List<Car> cars = List.of(

	        // 🔥 Hatchbacks
	        new Car("Maruti Swift", 800000, 22, 3, "Petrol", "Hatchback"),
	        new Car("Hyundai i20", 950000, 20, 4, "Petrol", "Hatchback"),
	        new Car("Tata Tiago", 700000, 23, 4, "Petrol", "Hatchback"),
	        new Car("Tata Tiago EV", 1100000, 25, 5, "Electric", "Hatchback"),

	        // 🚗 SUVs
	        new Car("Tata Nexon", 1200000, 18, 5, "Petrol", "SUV"),
	        new Car("Hyundai Creta", 1600000, 17, 4, "Petrol", "SUV"),
	        new Car("Kia Seltos", 1500000, 17, 4, "Petrol", "SUV"),
	        new Car("Mahindra XUV700", 2500000, 15, 5, "Diesel", "SUV"),
	        new Car("Mahindra Scorpio N", 2100000, 14, 5, "Diesel", "SUV"),

	        // 🚙 Sedans
	        new Car("Honda City", 1500000, 18, 4, "Petrol", "Sedan"),
	        new Car("Hyundai Verna", 1600000, 19, 5, "Petrol", "Sedan"),

	        // ⚡ Electric
	        new Car("Tata Nexon EV", 1400000, 30, 5, "Electric", "SUV"),
	        new Car("MG ZS EV", 2200000, 28, 5, "Electric", "SUV")
	    );

	    public List<CarResponseDTO> getShortlist(String fuel, int budget, int mileage, int safety) {

	        List<CarResponseDTO> result = new ArrayList<>();

	        for (Car c : cars) {

	            if (c.getFuel().equalsIgnoreCase(fuel)
	                    && c.getPrice() <= budget
	                    && c.getMileage() >= mileage
	                    && c.getSafety() >= safety) {

	                int score =
	                        (c.getSafety() * 40)
	                      + (c.getMileage() * 30)
	                      - (c.getPrice() / 100000);

	                String reason = generateReason(c);

	                result.add(new CarResponseDTO(
	                        c.getName(),
	                        c.getPrice(),
	                        c.getMileage(),
	                        c.getSafety(),
	                        c.getFuel(),
	                        score,
	                        reason
	                ));
	            }
	        }

	        result.sort((a, b) -> b.getScore() - a.getScore());

	        return result;
	    }

	    private String generateReason(Car c) {
	        if (c.getSafety() >= 5) return "Excellent safety rating and strong build quality";
	        if (c.getMileage() >= 22) return "High mileage makes it very economical";
	        if (c.getPrice() < 1000000) return "Budget-friendly option with balanced features";
	        return "Well-balanced car for your preferences";
	    }
}
