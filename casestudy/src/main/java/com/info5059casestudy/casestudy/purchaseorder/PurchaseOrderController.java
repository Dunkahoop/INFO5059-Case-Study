package com.info5059casestudy.casestudy.purchaseorder;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import com.info5059casestudy.casestudy.product.ProductRepository;
import com.info5059casestudy.casestudy.product.QRCodeGenerator;
import com.info5059casestudy.casestudy.vendor.VendorRepository;
import com.itextpdf.io.exceptions.IOException;

import jakarta.servlet.http.HttpServletRequest;


@CrossOrigin
@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseOrderDAO;

    @Autowired
    private PurchaseOrderRepository orderRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private QRCodeGenerator qrGenerator;

    @PostMapping("api/purchaseorders")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder order) {
        return new ResponseEntity<PurchaseOrder>(purchaseOrderDAO.create(order), HttpStatus.OK);
    }

    @GetMapping("/api/purchaseorders")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
        return new ResponseEntity<Iterable<PurchaseOrder>>(orderRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/purchaseorders/{id}")
    public ResponseEntity<Iterable<PurchaseOrder>> findByVendor(@PathVariable Long id) {
        return new ResponseEntity<Iterable<PurchaseOrder>>(orderRepository.findByVendorid(id), HttpStatus.OK);
    }
    

    @GetMapping(value = "/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> streamPDF(HttpServletRequest request) throws IOException {
        String id = request.getParameter("id");
        ByteArrayInputStream bis = PurchaseOrderPDFGenerator.generateReport(id, vendorRepository, orderRepository, productRepository, qrGenerator);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=order" + id + ".pdf");
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
