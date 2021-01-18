package kskowronski.data.service.egeria;

import kskowronski.data.entity.egeria.CashRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.vaadin.artur.helpers.CrudService;

public class CashRegisterService  extends CrudService<CashRegister, Integer> {

    private CashRegisterRepo repository;

    public CashRegisterService(@Autowired CashRegisterRepo repository) {
        this.repository = repository;
    }

    @Override
    protected CashRegisterRepo getRepository() {
        return repository;
    }
}
