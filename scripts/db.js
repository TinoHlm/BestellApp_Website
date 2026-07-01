// Menu data.

let menu = {
  deliveryFee: 4.99,
  categories: [
    {
      id: "burger",
      name: "Burger & Sandwiches",
      shortName: "Burger",
      items: [
        {
          id: 1,
          name: "Veggie mushroom black burger",
          description: "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
          price: 16.90,
          image: "./assets/imgs/dishes/veggie-mushroom-black-burger.jpg",
        },
        {
          id: 2,
          name: "All meat burger",
          description: "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souse",
          price: 15.90,
          image: "./assets/imgs/dishes/all-meat-burger.jpg",
        },
        {
          id: 3,
          name: "Beef red burger",
          description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
          price: 14.90,
          image: "./assets/imgs/dishes/beef-red-burger.jpg",
        },
        {
          id: 4,
          name: "Big chicken burger",
          description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
          price: 15.90,
          image: "./assets/imgs/dishes/big-chicken-burger.jpg",
        },
      ],
    },
    {
      id: "pizza",
      name: "Pizza (30cm)",
      shortName: "Pizza (30cm)",
      items: [
        {
          id: 5,
          name: "Pizza Margherita",
          description: "Tomato Sauce, Mozzarella",
          price: 11.90,
          image: "./assets/imgs/dishes/pizza-margherita.jpg",
        },
        {
          id: 6,
          name: "Pizza Chorizo",
          description: "Tomato slices, Mozzarella, Chorizo",
          price: 13.90,
          image: "./assets/imgs/dishes/pizza-chorizo.jpg",
        },
        {
          id: 7,
          name: "Pizza Funghi",
          description: "Red onion, Olives, Button Mushrooms, Mozzarella",
          price: 12.90,
          image: "./assets/imgs/dishes/pizza-funghi.jpg",
        },
        {
          id: 8,
          name: "Quattro Formaggi with Chicken",
          description: "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
          price: 16.90,
          image: "./assets/imgs/dishes/quattro-formaggi-chicken.jpg",
        },
      ],
    },
    {
      id: "salad",
      name: "Salad",
      shortName: "Salad",
      items: [
        {
          id: 9,
          name: "Warm beef arugula salad",
          description: "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",
          price: 16.90,
          image: "./assets/imgs/dishes/warm-beef-arugula-salad.jpg",
        },
        {
          id: 10,
          name: "Mini green Salad",
          description: "Green salad, Cucumber, Carrots, Parsley, Radishes",
          price: 7.90,
          image: "./assets/imgs/dishes/mini-green-salad.jpg",
        },
        {
          id: 11,
          name: "Green Salad with sea food",
          description: "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
          price: 16.90,
          image: "./assets/imgs/dishes/green-salad-sea-food.jpg",
        },
        {
          id: 12,
          name: "Vegan green salad with tofu",
          description: "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
          price: 14.90,
          image: "./assets/imgs/dishes/vegan-green-salad-tofu.jpg",
        },
      ],
    },
  ],
};

let dialogDatabase = {
  orderConfirmation: {
    icon: "./assets/icons/ordered_icon.png",
    iconAlt: "Order confirmed",
    title: "Order confirmed!",
    text: "Your food is on the way!",
    closeFunction: "closeOrderConfirmation()",
  },
  removeConfirmation: {
    title: "Remove item?",
    text: "This is the last one in your basket.",
    cancelButton: "Keep item",
    confirmButton: "Remove",
    closeFunction: "closeRemoveConfirmation()",
    confirmFunction: "confirmRemoveFromCart()",
  },
};