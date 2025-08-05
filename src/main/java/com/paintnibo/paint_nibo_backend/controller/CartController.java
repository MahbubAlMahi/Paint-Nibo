@PostMapping("/add")
public String addToCart(@RequestBody Map<String, Object> payload) {
    try {
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        String email = payload.get("email").toString();

        // Log the received data
        System.out.println("Received productId: " + productId);
        System.out.println("Received quantity: " + quantity);
        System.out.println("Received email: " + email);

        // Fetch the product and user
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

        // Create and save the cart item
        CartItem item = new CartItem(product, quantity, user);
        cartItemRepo.save(item); // Save cart item in the database

        System.out.println("✅ Product added to cart successfully for user: " + email);
        return "✅ Added to cart!";
    } catch (Exception e) {
        System.out.println("❌ Error: " + e.getMessage());
        return "❌ Failed to add to cart: " + e.getMessage();
    }
}
