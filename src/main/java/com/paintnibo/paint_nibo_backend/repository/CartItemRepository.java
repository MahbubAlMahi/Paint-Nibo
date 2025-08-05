package com.paintnibo.paint_nibo_backend.repository;

import com.paintnibo.paint_nibo_backend.model.CartItem;
import com.paintnibo.paint_nibo_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
}
