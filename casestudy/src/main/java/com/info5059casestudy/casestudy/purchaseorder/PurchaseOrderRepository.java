package com.info5059casestudy.casestudy.purchaseorder;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(collectionResourceRel = "purchaseorders", path = "purchaseorders")
public interface PurchaseOrderRepository extends CrudRepository<PurchaseOrder, Long>{
    @Modifying
    @Transactional
    @Query("delete from PurchaseOrder where id = ?1")
    int deleteOne(Long purchaseOrderId);

    List<PurchaseOrder> findByVendorid(Long vendorid);
}