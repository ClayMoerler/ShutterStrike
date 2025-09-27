package com.example.ShutterStrike;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class ShutterStrikeApplication {

	private static final Logger logger = LoggerFactory.getLogger(ShutterStrikeApplication.class);

	public static void main(String[] args) {
		logger.info("Hello world");
		SpringApplication.run(ShutterStrikeApplication.class, args);
	}

}
