package kskowronski.data.service.egeria;

import kskowronski.data.entity.egeria.CashRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.artur.helpers.CrudService;

import java.math.BigDecimal;

@Service
public class CashRegisterService  extends CrudService<CashRegister, BigDecimal> {

    private CashRegisterRepo repository;

    public CashRegisterService(@Autowired CashRegisterRepo repository) {
        this.repository = repository;
    }

    @Override
    protected CashRegisterRepo getRepository() {
        return repository;
    }
}
