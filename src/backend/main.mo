import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  // Product Type
  type ProductId = Nat;

  type Product = {
    id : ProductId;
    name : Text;
    priceCents : Nat;
    category : Category;
    description : Text;
    isNew : Bool;
    isFeatured : Bool;
  };

  type Category = {
    #hoodie;
    #tee;
    #jogger;
    #accessory;
  };

  type CartItem = {
    productId : ProductId;
    quantity : Nat;
  };

  let products = Map.fromIter<Nat, Product>([
    (
      0,
      {
        id = 0;
        name = "Classic Hoodie";
        priceCents = 5900;
        category = #hoodie;
        description = "Soft cotton hoodie with minimalist design.";
        isNew = true;
        isFeatured = true;
      },
    ),
    (
      1,
      {
        id = 1;
        name = "Staple Tee";
        priceCents = 3200;
        category = #tee;
        description = "Everyday essential t-shirt.";
        isNew = false;
        isFeatured = true;
      },
    ),
    (
      2,
      {
        id = 2;
        name = "Performance Joggers";
        priceCents = 6500;
        category = #jogger;
        description = "Comfortable joggers for active lifestyle.";
        isNew = true;
        isFeatured = false;
      },
    ),
    (
      3,
      {
        id = 3;
        name = "Cuffed Beanie";
        priceCents = 2200;
        category = #accessory;
        description = "Keep warm with this stylish beanie.";
        isNew = false;
        isFeatured = true;
      },
    ),
    (
      4,
      {
        id = 4;
        name = "Waffle Knit Hoodie";
        priceCents = 6100;
        category = #hoodie;
        description = "Textured hoodie with extra warmth.";
        isNew = true;
        isFeatured = false;
      },
    ),
    (
      5,
      {
        id = 5;
        name = "Longline Tee";
        priceCents = 3700;
        category = #tee;
        description = "Slim fit t-shirt with extended length.";
        isNew = true;
        isFeatured = false;
      },
    ),
    (
      6,
      {
        id = 6;
        name = "Jogger Shorts";
        priceCents = 5400;
        category = #jogger;
        description = "Shorts with jogger comfort.";
        isNew = false;
        isFeatured = false;
      },
    ),
    (
      7,
      {
        id = 7;
        name = "Canvas Tote";
        priceCents = 1500;
        category = #accessory;
        description = "Reusable tote bag with brand logo.";
        isNew = false;
        isFeatured = false;
      },
    ),
  ].values());

  let carts = Map.empty<Principal, [CartItem]>();

  // Product Functions
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isFeatured });
  };

  public query ({ caller }) func getNewArrivals() : async [Product] {
    products.values().toArray().filter(func(p) { p.isNew });
  };

  // Cart Functions
  public shared ({ caller }) func addItemToCart(productId : ProductId, quantity : Nat) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (?items) { items };
      case (null) { [] };
    };

    let updatedCart = currentCart.concat([{ productId; quantity }]);
    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func removeItemFromCart(productId : ProductId) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (?cart) { cart };
      case (null) { [] };
    };

    let filteredCart = currentCart.filter(func(item) { item.productId != productId });
    carts.add(caller, filteredCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.add(caller, []);
  };

  public shared ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (?cart) { cart };
      case (null) { [] };
    };
  };
};
