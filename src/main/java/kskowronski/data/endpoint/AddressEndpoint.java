package kskowronski.data.endpoint;

import kskowronski.data.CrudEndpoint;
import kskowronski.data.entity.Address;
import kskowronski.data.service.AddressService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
public class AddressEndpoint extends CrudEndpoint<Address, Integer> {

    private AddressService service;

    public AddressEndpoint(@Autowired AddressService service) {
        this.service = service;
    }

    @Override
    protected AddressService getService() {
        return service;
    }

}
