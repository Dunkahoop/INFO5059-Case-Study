package com.info5059casestudy.casestudy.purchaseorder;

import java.util.List;
import java.util.ArrayList;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.Id;

@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long vendorid; // FK
    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal total;
    @JsonFormat(pattern = "yyyy-MM-dd@HH:mm:ss")
    private LocalDateTime podate;
    @OneToMany(targetEntity = PurchaseOrderItem.class, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "poid", referencedColumnName = "id")
    private List<PurchaseOrderItem> items = new ArrayList<PurchaseOrderItem>();
}
