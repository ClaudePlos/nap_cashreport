package kskowronski.data.endpoint.egeria;

import com.vaadin.flow.server.connect.Endpoint;
import kskowronski.data.CrudEndpoint;
import kskowronski.data.entity.egeria.CashRegister;
import kskowronski.data.service.egeria.CashRegisterService;
import kskowronski.data.service.global.ConsolidationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;

@Endpoint
public class CashRegisterEndpoint extends CrudEndpoint<CashRegister, BigDecimal> {

    private CashRegisterService service;

    public CashRegisterEndpoint(@Autowired CashRegisterService service) {
        this.service = service;
    }

    @Override
    protected CashRegisterService getService() {
        return service;
    }



    public List<CashRegister> getAllCashRegister(){
        return this.service.getAllCashRegister();
    }

}
