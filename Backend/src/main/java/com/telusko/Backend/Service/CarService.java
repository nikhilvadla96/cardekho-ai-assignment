package com.telusko.Backend.Service;

import java.util.List;

import com.telusko.Backend.Model.CarResponseDTO;

public interface CarService {

	public List<CarResponseDTO> getShortlist(String fuel, int budget, int mileage, int safety);
}
