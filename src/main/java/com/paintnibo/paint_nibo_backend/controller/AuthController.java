package com.paintnibo.paint_nibo_backend.controller;

import com.paintnibo.paint_nibo_backend.model.User;
import com.paintnibo.paint_nibo_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String username = body.get("username");  // Get the username from the body

        if (userRepo.findByEmail(email).isPresent()) {
            return "❌ Email already exists!";
        }

        userRepo.save(new User(email, password, username));  // Save username along with email and password
        return "✅ Registration successful!";
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "✅ Welcome " + user.get().getUsername() + "!";  // Show the username in the welcome message
        }

        return "❌ Invalid credentials!";
    }
}
