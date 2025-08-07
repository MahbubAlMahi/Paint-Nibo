package com.paintnibo.paint_nibo_backend.controller;

import com.paintnibo.paint_nibo_backend.model.CartItem;
import com.paintnibo.paint_nibo_backend.model.Product;
import com.paintnibo.paint_nibo_backend.model.User;
import com.paintnibo.paint_nibo_backend.repository.CartItemRepository;
import com.paintnibo.paint_nibo_backend.repository.ProductRepository;
import com.paintnibo.paint_nibo_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartItemRepository cartItemRepo;

    @PostMapping("/add")
    public String addToCart(@RequestBody Map<String, Object> payload) {
        try {
            
            Long productId = Long.valueOf(payload.get("productId").toString());
            int quantity = Integer.parseInt(payload.get("quantity").toString());
            String email = payload.get("email").toString();

            
            System.out.println("Received productId: " + productId);
            System.out.println("Received quantity: " + quantity);
            System.out.println("Received email: " + email);

           
            Product product = productRepo.findById(productId).orElse(null);
            User user = userRepo.findByEmail(email).orElse(null);

            
            if (product == null) {
                System.out.println("❌ Product not found for ID: " + productId);
                return "❌ Product not found!";
            }

            
            if (user == null) {
                System.out.println("❌ User not found for email: " + email);
                return "❌ User not found!";
            }

            
            CartItem item = new CartItem(product, quantity, user);
            cartItemRepo.save(item); 

            System.out.println("✅ Product added to cart successfully for user: " + email);
            return "✅ Product added to cart!";
        } catch (Exception e) {
            
            System.out.println("❌ Error: " + e.getMessage());
            return "❌ Failed to add to cart: " + e.getMessage();
        }
    }
}
