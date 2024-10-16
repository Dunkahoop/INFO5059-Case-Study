package com.info5059casestudy.casestudy.purchaseorder;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

import com.info5059casestudy.casestudy.product.Product;
import com.info5059casestudy.casestudy.product.ProductRepository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PurchaseOrderDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductRepository prodRepo;

    @Transactional
    public PurchaseOrder create(PurchaseOrder orderFromClient) {
        PurchaseOrder realOrder = new PurchaseOrder();
        realOrder.setVendorid(orderFromClient.getVendorid());
        realOrder.setPodate(LocalDateTime.now());
        realOrder.setAmount(orderFromClient.getAmount());
        entityManager.persist(realOrder);
        for (PurchaseOrderLineItem item : orderFromClient.getItems()) {
            PurchaseOrderLineItem realItem =  new PurchaseOrderLineItem();
            realItem.setPoid(realOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setQty(item.getQty());
            realItem.setPrice(item.getPrice());

            Product prod = prodRepo.getReferenceById(item.getProductid());
            prod.setQoo(prod.getQoo() + item.getQty());
            prodRepo.saveAndFlush(prod);    

            realItem.setProductname(item.getProductname());
            entityManager.persist(realItem);
        }

        entityManager.flush();
        entityManager.refresh(realOrder);
        return realOrder;
    }
}
