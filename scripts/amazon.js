const product = [
  {
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt 2 Pack - Teal",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
  },
  {
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4,
      count: 110,
    },
    priceCents: 1299,
  },

  {
    image: "images/products/intermediate-composite-basketball.jpg",
    name: " Intermediate Size Basketball",
    rating: {
      stars: 4.5,
      count: 79,
    },
    priceCents: 799,
  },
  {
    image: "images/products/black-2-slot-toaster.jpg",
    name: " 2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2190,
    },
    priceCents: 899,
  },
  {
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: " 6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37,
    },
    priceCents: 2067,
  },
  {
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking",
    rating: {
      stars: 4.5,
      count: 175,
    },
    priceCents: 34.99,
  },
  {
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 153,
    },
    priceCents: 2400,
  },
];
let card = ``;
product.forEach((value) => {
  card += `
  
 <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${value.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              value.rating.count
            }</div>
          </div>

          <div class="product-price">$${(value.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary">Add to Cart</button>
        </div>
  `;
  console.log(card);
  document.querySelector(".products-grid").innerHTML = card;
});
