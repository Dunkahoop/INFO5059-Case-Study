package com.info5059casestudy.casestudy.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/api/products")
    public ResponseEntity<Iterable<Product>> findAll() {
        Iterable<Product> products = productRepository.findAll();
        return new ResponseEntity<Iterable<Product>>(products, HttpStatus.OK);
    }

    @PutMapping("/api/products")
    public ResponseEntity<Product> updateOne(@RequestBody Product product) {
        Product updatedProduct = productRepository.save(product);
        return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    }

    @PostMapping("/api/products")
    public ResponseEntity<Product> addOne(@RequestBody Product product) {
        Product newProduct = productRepository.save(product);
        return new ResponseEntity<Product>(newProduct, HttpStatus.OK);
    }
    
    //keep an eye on this, might not work
    @DeleteMapping("/api/products/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        //int rowsDeleted = productRepository.deleteOne(id);//idk if this is better
        return new ResponseEntity<Integer>(productRepository.deleteOne(id), HttpStatus.OK);
    }

    @GetMapping("/api/products/{vendorid}")
    public ResponseEntity<Iterable<Product>> findByVendor(@PathVariable int vendorid) {
        return new ResponseEntity<Iterable<Product>>(productRepository.findByVendorid(vendorid), HttpStatus.OK);
    }
}
