package com.paintnibo.paint_nibo_backend.controller;

import com.paintnibo.paint_nibo_backend.model.Product;
import com.paintnibo.paint_nibo_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Endpoint to get all products
    @GetMapping
    public List<Product> getAllProducts(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return productRepository.findByCategoryIgnoreCase(category);  // Filter by category
        }
        return productRepository.findAll();  // Return all products if no category is provided
    }

    // Endpoint to search products by name
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam("q") String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    // Endpoint to add new product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}
