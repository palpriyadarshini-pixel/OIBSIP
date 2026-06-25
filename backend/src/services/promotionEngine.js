class PromotionEngine {

  static applyPromotion({
    deal,
    cartItems,
    selectedPizza,
    selectedAddons,
    selectedCrust,
    basePrice,
  }) {

    if (!deal) {
      return {
        finalPrice: basePrice,
        discount: 0,
        freeItems: [],
        message: "",
      };
    }

    switch (deal.dealType) {

      case "PERCENTAGE":
        return this.applyPercentage(
          deal,
          basePrice
        );

      case "FLAT":
        return this.applyFlat(
          deal,
          basePrice
        );

      case "FREE_CRUST":
        return this.applyFreeCrust(
          selectedCrust,
          basePrice
        );

      case "FREE_DIP":
        return this.applyFreeDip(
          selectedAddons,
          basePrice
        );

      case "COMBO":
        return this.applyCombo(
          deal,
          basePrice
        );

      case "BOGO":
        return this.applyBOGO(
          deal
        );

      case "BUY2GET1":
        return this.applyBuy2Get1(
          deal
        );

      case "FREE_DELIVERY":
        return this.applyFreeDelivery(
          basePrice
        );

      default:
        return {
          finalPrice: basePrice,
          discount: 0,
          freeItems: [],
          message: "",
        };
    }
  }

  static applyPercentage(
    deal,
    price
  ) {

    const discount =
      (price * deal.discountValue) / 100;

    return {
      finalPrice: price - discount,
      discount,
      freeItems: [],
      message: `${deal.discountValue}% OFF`,
    };
  }

  static applyFlat(
    deal,
    price
  ) {

    return {
      finalPrice: Math.max(
        0,
        price - deal.discountValue
      ),
      discount: deal.discountValue,
      freeItems: [],
      message: `₹${deal.discountValue} OFF`,
    };
  }

  static applyFreeCrust(
    crust,
    price
  ) {

    if (!crust)
      return {
        finalPrice: price,
        discount: 0,
        freeItems: [],
      };

    return {
      finalPrice: price - crust.price,
      discount: crust.price,
      freeItems: [],
      message: "Free Crust",
    };
  }

  static applyFreeDip(
    addons,
    price
  ) {

    const dip = addons.find(
      (a) => a.category === "Dip"
    );

    if (!dip)
      return {
        finalPrice: price,
        discount: 0,
        freeItems: [],
      };

    return {
      finalPrice: price - dip.price,
      discount: dip.price,
      freeItems: [],
      message: "Free Dip",
    };
  }

  static applyCombo(
    deal,
    price
  ) {

    return {
      finalPrice: deal.offerPrice,
      discount:
        price - deal.offerPrice,
      freeItems: [],
      message: "Combo Offer",
    };
  }

  static applyBOGO() {

    return {
      finalPrice: null,
      discount: 0,
      freeItems: [],
      message:
        "Choose your FREE Pizza",
    };
  }

  static applyBuy2Get1() {

    return {
      finalPrice: null,
      discount: 0,
      freeItems: [],
      message:
        "Choose your FREE Pizza after adding two pizzas.",
    };
  }

  static applyFreeDelivery(
    price
  ) {

    return {
      finalPrice: price,
      discount: 50,
      freeItems: [],
      message:
        "Free Delivery Applied",
    };
  }

}

export default PromotionEngine;