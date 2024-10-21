package com.info5059casestudy.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseOrderDAO;

    @Autowired
    private PurchaseOrderRepository orderRepository;

    @PostMapping("api/purchaseorders")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder order) {
        return new ResponseEntity<PurchaseOrder>(purchaseOrderDAO.create(order), HttpStatus.OK);
    }

    @GetMapping("/api/purchaseorders")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
        return new ResponseEntity<Iterable<PurchaseOrder>>(orderRepository.findAll(), HttpStatus.OK);
    }
    
    
}
