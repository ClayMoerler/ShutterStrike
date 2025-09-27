package com.example.ShutterStrike;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class ShutterStrikeApplication {

	public static void main(String[] args) {
		log.info("Running Application!");
		SpringApplication.run(ShutterStrikeApplication.class, args);
	}

}
