package com.mnursoy.salesmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories
@EnableJpaAuditing
@EnableTransactionManagement
@SpringBootApplication
public class SalesManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalesManagerApplication.class, args);
	}

}
