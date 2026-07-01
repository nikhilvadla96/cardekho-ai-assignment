package com.telusko.Backend.Model;

public class Car {

	private String name;
    private int price;
    private int mileage;
    private int safety;
    private String fuel;
    private String type;
    
	public Car(String name, int price, int mileage, int safety, String fuel, String type) {
		super();
		this.name = name;
		this.price = price;
		this.mileage = mileage;
		this.safety = safety;
		this.fuel = fuel;
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getMileage() {
		return mileage;
	}

	public void setMileage(int mileage) {
		this.mileage = mileage;
	}

	public int getSafety() {
		return safety;
	}

	public void setSafety(int safety) {
		this.safety = safety;
	}

	public String getFuel() {
		return fuel;
	}

	public void setFuel(String fuel) {
		this.fuel = fuel;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
    
    
}
