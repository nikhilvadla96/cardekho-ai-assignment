package com.telusko.Backend.Model;

public class CarResponseDTO {

	private String name;
    private int price;
    private int mileage;
    private int safety;
    private String fuel;
    private int score;
    private String reason;

    public CarResponseDTO(String name, int price, int mileage,
                          int safety, String fuel,
                          int score, String reason) {
        this.name = name;
        this.price = price;
        this.mileage = mileage;
        this.safety = safety;
        this.fuel = fuel;
        this.score = score;
        this.reason = reason;
    }

    public String getName() { return name; }
    public int getPrice() { return price; }
    public int getMileage() { return mileage; }
    public int getSafety() { return safety; }
    public String getFuel() { return fuel; }
    public int getScore() { return score; }
    public String getReason() { return reason; }

}
