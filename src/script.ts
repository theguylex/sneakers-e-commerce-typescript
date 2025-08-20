// Define interfaces for cart items
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  total: string;
  thumbnail: string;
}

// Main function to run on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle
  const menu: HTMLImageElement | null = document.querySelector(".menuBtn");
  const toplinks: HTMLElement | null = document.querySelector(".topLinks");

  if (menu && toplinks) {
    menu.addEventListener("click", () => {
      toplinks.classList.toggle("open");
    });
  }

  // Select carousel elements
  const enlargedImg: HTMLImageElement | null = document.querySelector(".enlarged-img img");
  const littleImgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(".little-imgs img");
  let currentIndex: number = 0;

  // Add prev/next buttons to main carousel on mobile
  const enlargedImgContainer: HTMLElement | null = document.querySelector(".enlarged-img");
  const addMainCarouselButtons = (): void => {
    if (window.innerWidth <= 480 && enlargedImgContainer) {
      // Remove existing buttons if any
      const existingPrevBtn: HTMLElement | null = document.querySelector(".prev-btn-main");
      const existingNextBtn: HTMLElement | null = document.querySelector(".next-btn-main");
      if (existingPrevBtn) existingPrevBtn.remove();
      if (existingNextBtn) existingNextBtn.remove();

      // Create buttons
      const prevBtnMain: HTMLButtonElement = document.createElement("button");
      prevBtnMain.className = "prev-btn-main";
      prevBtnMain.innerHTML = "&lt;";
      const nextBtnMain: HTMLButtonElement = document.createElement("button");
      nextBtnMain.className = "next-btn-main";
      nextBtnMain.innerHTML = "&gt;";

      // Append buttons
      enlargedImgContainer.appendChild(prevBtnMain);
      enlargedImgContainer.appendChild(nextBtnMain);

      // Add event listeners
      prevBtnMain.addEventListener("click", () => {
        const newIndex: number = (currentIndex - 1 + littleImgs.length) % littleImgs.length;
        updateCarousel(newIndex);
      });

      nextBtnMain.addEventListener("click", () => {
        const newIndex: number = (currentIndex + 1) % littleImgs.length;
        updateCarousel(newIndex);
      });

      console.log("Main carousel buttons added");
    } else {
      // Remove buttons on larger screens
      const existingPrevBtn: HTMLElement | null = document.querySelector(".prev-btn-main");
      const existingNextBtn: HTMLElement | null = document.querySelector(".next-btn-main");
      if (existingPrevBtn) existingPrevBtn.remove();
      if (existingNextBtn) existingNextBtn.remove();
    }
  };

  // Run on load and resize
  addMainCarouselButtons();
  window.addEventListener("resize", addMainCarouselButtons);

  // Update original carousel
  const updateCarousel = (index: number): void => {
    littleImgs.forEach((img: HTMLImageElement) => img.classList.remove("active"));
    littleImgs[index].classList.add("active");
    if (enlargedImg) {
      enlargedImg.style.opacity = "0";
      const fullSrc: string = littleImgs[index].src.replace("-thumbnail", "");
      setTimeout(() => {
        enlargedImg.src = fullSrc;
        enlargedImg.addEventListener(
          "load",
          () => {
            enlargedImg.style.opacity = "1";
          },
          { once: true }
        );
      }, 150);
    }
    currentIndex = index;
  };

  // Thumbnail click handler for original carousel
  littleImgs.forEach((thumbnail: HTMLImageElement, index: number) => {
    thumbnail.addEventListener("click", () => {
      updateCarousel(index);
    });
  });

  // Set first thumbnail as active by default
  if (littleImgs.length > 0) {
    littleImgs[0].classList.add("active");
  }

  // Create and show overlay
  if (enlargedImg) {
    enlargedImg.addEventListener("click", () => {
      // Create overlay container
      const overlay: HTMLDivElement = document.createElement("div");
      overlay.className = "overlay-container";

      // Create enlarged image container
      const overlayEnlarged: HTMLDivElement = document.createElement("div");
      overlayEnlarged.className = "overlay-enlarged-img";
      const overlayImg: HTMLImageElement = document.createElement("img");
      overlayImg.src = enlargedImg.src;
      overlayImg.alt = "sneaker";

      // Create navigation buttons
      const prevBtn: HTMLButtonElement = document.createElement("button");
      prevBtn.className = "prev-btn";
      prevBtn.innerHTML = "&lt;";
      const nextBtn: HTMLButtonElement = document.createElement("button");
      nextBtn.className = "next-btn";
      nextBtn.innerHTML = "&gt;";
      const closeBtn: HTMLButtonElement = document.createElement("button");
      closeBtn.className = "close-btn";
      closeBtn.innerHTML = "X";
      console.log("Close button created");

      overlayEnlarged.appendChild(prevBtn);
      overlayEnlarged.appendChild(overlayImg);
      overlayEnlarged.appendChild(nextBtn);
      overlayEnlarged.appendChild(closeBtn);

      // Create thumbnail container
      const overlayThumbnails: HTMLDivElement = document.createElement("div");
      overlayThumbnails.className = "overlay-little-imgs";
      littleImgs.forEach((thumbnail: HTMLImageElement, index: number) => {
        const thumbImg: HTMLImageElement = document.createElement("img");
        thumbImg.src = thumbnail.src;
        thumbImg.alt = "";
        if (index === currentIndex) {
          thumbImg.classList.add("active");
        }
        thumbImg.addEventListener("click", () => {
          updateOverlayImage(index, overlayImg, overlayThumbnails);
          updateCarousel(index);
        });
        overlayThumbnails.appendChild(thumbImg);
      });

      // Append elements to overlay
      overlay.appendChild(overlayEnlarged);
      overlay.appendChild(overlayThumbnails);
      document.body.appendChild(overlay);

      // Update overlay image and thumbnails
      const updateOverlayImage = (
        index: number,
        imgElement: HTMLImageElement,
        thumbsContainer: HTMLDivElement
      ): void => {
        thumbsContainer
          .querySelectorAll("img")
          .forEach((img: HTMLImageElement) => img.classList.remove("active"));
        thumbsContainer.querySelectorAll("img")[index].classList.add("active");
        imgElement.style.opacity = "0";
        const fullSrc: string = littleImgs[index].src.replace("-thumbnail", "");
        setTimeout(() => {
          imgElement.src = fullSrc;
          imgElement.addEventListener(
            "load",
            () => {
              imgElement.style.opacity = "1";
            },
            { once: true }
          );
        }, 150);
        currentIndex = index;
      };

      // Navigation button handlers
      prevBtn.addEventListener("click", () => {
        const newIndex: number = (currentIndex - 1 + littleImgs.length) % littleImgs.length;
        updateOverlayImage(newIndex, overlayImg, overlayThumbnails);
        updateCarousel(newIndex);
      });

      nextBtn.addEventListener("click", () => {
        const newIndex: number = (currentIndex + 1) % littleImgs.length;
        updateOverlayImage(newIndex, overlayImg, overlayThumbnails);
        updateCarousel(newIndex);
      });

      // Close overlay
      closeBtn.addEventListener("click", () => {
        console.log("Close button clicked");
        overlay.remove();
      });
    });
  }

  // Counter functionality
  const countElement: HTMLElement | null = document.querySelector(".countValue");
  const increaseBtn: HTMLElement | null = document.querySelector(".increaseValue");
  const decreaseBtn: HTMLElement | null = document.querySelector(".decreaseValue");
  let count: number = 0;

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      count += 1;
      if (countElement) countElement.textContent = count.toString();
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      count = Math.max(0, count - 1);
      if (countElement) countElement.textContent = count.toString();
    });
  }

  // Cart functionality
  const addToCartBtn: HTMLElement | null = document.querySelector(".addToCartBtn");
  const navCart: HTMLImageElement | null = document.querySelector(".navCart");
  let cart: CartItem[] = [];

  // Function to update cart badge
  const updateCartBadge = (): void => {
    const totalItems: number = cart.reduce((sum, item) => sum + item.quantity, 0);
    let badge: HTMLSpanElement | null = document.querySelector(".cart-badge");
    if (!badge && totalItems > 0) {
      badge = document.createElement("span");
      badge.className = "cart-badge";
      const cartAvatar: HTMLElement | null = document.querySelector(".cart-avatar");
      if (cartAvatar) {
        cartAvatar.appendChild(badge);
      }
    }
    if (badge) {
      badge.textContent = totalItems.toString();
      badge.style.display = totalItems > 0 ? "block" : "none";
      console.log(`Cart badge updated: ${totalItems} items`);
    }
  };

  // Add to cart
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      if (count > 0) {
        const existingItem = cart.find(item => item.name === "Fall Limited Edition Sneakers");
        if (existingItem) {
          existingItem.quantity += count;
          existingItem.total = (existingItem.quantity * existingItem.price).toFixed(2);
        } else {
          const item: CartItem = {
            name: "Fall Limited Edition Sneakers",
            price: 125.00,
            quantity: count,
            total: (count * 125.00).toFixed(2),
            thumbnail: "images/image-product-1-thumbnail.jpg"
          };
          cart.push(item);
        }
        count = 0;
        if (countElement) countElement.textContent = count.toString();
        updateCartBadge(); // Only update badge, don't show popup
      }
    });
  }

  // Toggle cart display
  if (navCart) {
    navCart.addEventListener("click", () => {
      const existingPopup: HTMLElement | null = document.querySelector(".cart-popup");
      if (existingPopup && existingPopup.classList.contains("show")) {
        existingPopup.classList.remove("show");
      } else {
        updateCartDisplay();
      }
    });
  }

  // Update cart display
  const updateCartDisplay = (): void => {
    let popup: HTMLElement | null = document.querySelector(".cart-popup");
    if (popup) {
      popup.remove();
    }

    popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.innerHTML = `<h4>Cart</h4>`;

    if (cart.length === 0) {
      popup.innerHTML += `<p class="cart-empty">Your cart is empty.</p>`;
    } else {
      cart.forEach((item: CartItem, index: number) => {
        popup!.innerHTML += `
          <div class="cart-item">
            <img src="${item.thumbnail}" alt="${item.name}">
            <div class="cart-item-details">
              <p>${item.name}</p>
              <p>$${item.price.toFixed(2)} x ${item.quantity} <span class="item-total">$${item.total}</span></p>
            </div>
            <img src="images/icon-delete.svg" alt="Delete" class="cart-item-delete" data-index="${index}">
          </div>
        `;
      });
      popup.innerHTML += `<button class="checkout-btn">Checkout</button>`;
    }

    const cartAvatar: HTMLElement | null = document.querySelector(".cart-avatar");
    if (cartAvatar) {
      cartAvatar.appendChild(popup);
      popup.classList.add("show");
    }

    // Add delete event listeners with type assertion
    popup.querySelectorAll<HTMLImageElement>(".cart-item-delete").forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        const index: number = parseInt(deleteBtn.getAttribute("data-index")!);
        cart.splice(index, 1);
        updateCartDisplay();
        updateCartBadge(); // Update badge when item is deleted
      });
    });
  };
});