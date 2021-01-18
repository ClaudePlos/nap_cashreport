package kskowronski.data.service.egeria;

import kskowronski.data.entity.egeria.CashRegister;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CashRegisterRepo extends JpaRepository<CashRegister, Integer> {
}
