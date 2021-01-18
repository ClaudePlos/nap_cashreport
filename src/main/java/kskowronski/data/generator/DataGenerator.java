package kskowronski.data.generator;

import com.vaadin.flow.spring.annotation.SpringComponent;

import kskowronski.data.service.AddressRepository;
import kskowronski.data.entity.Address;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;

@SpringComponent
public class DataGenerator {

    @Bean
    public CommandLineRunner loadData(AddressRepository addressRepository) {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (addressRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");

            logger.info("... generating 100 Address entities...");
            ExampleDataGenerator<Address> addressRepositoryGenerator = new ExampleDataGenerator<>(Address.class,
                    LocalDateTime.of(2021, 1, 18, 0, 0, 0));
            addressRepositoryGenerator.setData(Address::setId, DataType.ID);
            addressRepositoryGenerator.setData(Address::setStreet, DataType.ADDRESS);
            addressRepositoryGenerator.setData(Address::setPostalCode, DataType.ZIP_CODE);
            addressRepositoryGenerator.setData(Address::setCity, DataType.CITY);
            addressRepositoryGenerator.setData(Address::setState, DataType.STATE);
            addressRepositoryGenerator.setData(Address::setCountry, DataType.COUNTRY);
            addressRepository.saveAll(addressRepositoryGenerator.create(100, seed));

            logger.info("Generated demo data");
        };
    }

}