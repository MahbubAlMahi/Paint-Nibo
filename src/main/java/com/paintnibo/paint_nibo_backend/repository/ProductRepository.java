package com.paintnibo.paint_nibo_backend.repository;

import com.paintnibo.paint_nibo_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryIgnoreCase(String category);  // Add this method for filtering by category
}
