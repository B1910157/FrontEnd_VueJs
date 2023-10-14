import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";
import CartService from "./services/cart.service";
import MenuService from "./services/menu.service";
import homeService from "@/services/home.service";
import DrinkService from "@/services/drink.service";

function calculateTotal(localCart) {
  let totalMenu = 0;
  for (const item of localCart.items[0].menu) {
    totalMenu += item.price;
  }
  return totalMenu;
}
function calculateOtherTotal(localCart) {
  let totalOther = 0;
  for (const item of localCart.items[2].other) {
    totalOther += item.price;
  }
  return totalOther;
}

function calculateDrinkTotal(localCart) {
  let totalDrink = 0;
  for (const item of localCart.items[1].drink) {
    totalDrink += item.price * item.quantity;
  }
  return totalDrink;
}
const store = createStore({
  state() {
    return {
      Auth: false,
      cartData: {
        service_id: null,
        items: [
          {
            menu: [],
            totalMenu: 0,
          },
          {
            drink: [],
            totalDrink: 0,
          },
          {
            other: [],
            totalOther: 0,
          },
        ],
      },
      cartFood: [],
      cartDrink: {
        items: [],
        totalDrink: 0,
      },
      cartOther: [],

      localCart: {
        service_id: null,
        items: [
          {
            menu: [],
            totalMenu: 0,
          },
          {
            drink: [],
            totalDrink: 0,
          },
          {
            other: [],
            totalOther: 0,
          },
        ],
      },
    };
  },
  mutations: {
    setAuth(state, Auth) {
      state.Auth = Auth;
    },
    setCartFood(state, cartFood) {
      state.cartFood = cartFood;
    },
    setCartDrink(state, cartDrink) {
      state.cartDrink = cartDrink;
    },
    setCartOther(state, cartOther) {
      state.cartOther = cartOther;
    },

    setLocalCart(state, localCart) {
      state.localCart = localCart;
    },
    setCartData(state, cartData) {
      state.cartData = cartData;
    },
  },
  actions: {
    async addFoodToLocalCart(commit, { service_id, foodObject }) {
      try {
        const localCartData = localStorage.getItem("localCart");
        if (localCartData) {
          this.state.localCart = JSON.parse(localCartData);
        }
        if (!this.state.localCart.items[0].menu) {
          this.state.localCart = {
            service_id: service_id,
            items: [
              {
                menu: [],
                totalMenu: 0,
              },
              {
                drink: [],
                totalDrink: 0,
              },
              {
                other: [],
                totalOther: 0,
              },
            ],
          };
        }
        const existingFood = this.state.localCart.items[0].menu.find(
          (food) => food._id === foodObject._id
        );
        if (existingFood) {
          // alert(`Món ăn ${existingFood.food_name} đã có trong menu`);
        } else {
          this.state.localCart.items[0].menu.push(foodObject);
          // alert(`Món ăn đã được thêm vào menu của bạn!!!`);
        }
        this.state.localCart.items[0].totalMenu = calculateTotal(
          this.state.localCart
        );

        localStorage.setItem("localCart", JSON.stringify(this.state.localCart));
        await this.dispatch("getLocalCart");
      } catch (error) {
        console.log(error);
      }
    },
    async getCartData({ commit }) {
      try {
        if (this.state.cartFood) {
          this.state.cartData.service_id = this.state.cartFood.service_id;
          this.state.cartData.items[0].menu = this.state.cartFood.menu;
          this.state.cartData.items[0].totalMenu =
            this.state.cartFood.totalMenu;
        }
        if (this.state.cartDrink) {
          this.state.cartData.items[1].drink = this.state.cartDrink.items;
          this.state.cartData.items[1].totalDrink =
            this.state.cartDrink.totalDrink;
        }
        if (this.state.cartOther) {
          this.state.cartData.items[2].other = this.state.cartOther.otherList;
          this.state.cartData.items[2].totalOther =
            this.state.cartOther.totalOther;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addMenuToLocalCart(commit, { service_id, menuObject }) {
      try {
        const localCartData = localStorage.getItem("localCart");
        if (localCartData) {
          this.state.localCart = JSON.parse(localCartData);
        }

        if (!this.state.localCart.items[0].menu) {
          this.state.localCart = {
            service_id: service_id,
            items: [
              {
                menu: [],
                totalMenu: 0,
              },
              {
                drink: [],
                totalDrink: 0,
              },
              {
                other: [],
                totalOther: 0,
              },
            ],
          };
        }

        menuObject.forEach((menuItem) => {
          const existingMenuItem = this.state.localCart.items[0].menu.find(
            (food) => food._id === menuItem._id
          );

          if (!existingMenuItem) {
            this.state.localCart.items[0].menu.push(menuItem);
          }
        });

        this.state.localCart.items[0].totalMenu = calculateTotal(
          this.state.localCart
        );
        localStorage.setItem("localCart", JSON.stringify(this.state.localCart));
      } catch (error) {
        console.log(error);
      }
    },
    async addDrinkToLocalCart(commit, { service_id, drinkObject, quantity }) {
      try {
        const localCartData = localStorage.getItem("localCart");
        if (localCartData) {
          this.state.localCart = JSON.parse(localCartData);
        }
        if (!this.state.localCart.items[1].drink) {
          this.state.localCart = {
            service_id: service_id,
            items: [
              {
                menu: [],
                totalMenu: 0,
              },
              {
                drink: [],
                totalDrink: 0,
              },
              {
                other: [],
                totalOther: 0,
              },
            ],
          };
        }
        const existingDrink = this.state.localCart.items[1].drink.find(
          (drink) => drink._id === drinkObject._id
        );

        if (existingDrink) {
          existingDrink.quantity = quantity;
        } else {
          drinkObject.quantity = quantity;
          this.state.localCart.items[1].drink.push(drinkObject);
        }
        this.state.localCart.items[1].totalDrink = calculateDrinkTotal(
          this.state.localCart
        );

        localStorage.setItem("localCart", JSON.stringify(this.state.localCart));
      } catch (error) {
        console.log(error);
      }
    },

    async addOtherToLocalCart(commit, { service_id, otherObject }) {
      try {
        const localCartData = localStorage.getItem("localCart");
        if (localCartData) {
          this.state.localCart = JSON.parse(localCartData);
        }
        if (!this.state.localCart.items[2].other) {
          this.state.localCart = {
            service_id: service_id,
            items: [
              {
                menu: [],
                totalMenu: 0,
              },
              {
                drink: [],
                totalDrink: 0,
              },
              {
                other: [],
                totalOther: 0,
              },
            ],
          };
        }
        const existingOther = this.state.localCart.items[2].other.find(
          (other) => other._id === otherObject._id
        );
        if (existingOther) {
          // alert(`Dịch vụ ${existingOther.other_name} đã có trong note`);
        } else {
          this.state.localCart.items[2].other.push(otherObject);
          // alert(`Dịch vụ đã được thêm!!!`);
        }
        this.state.localCart.items[2].totalOther = calculateOtherTotal(
          this.state.localCart
        );

        localStorage.setItem("localCart", JSON.stringify(this.state.localCart));
        this.dispatch("getLocalCart");
      } catch (error) {
        console.log(error);
      }
    },

    getLocalCart({ commit }) {
      try {
        const cartLocal = localStorage.getItem("localCart");
        if (cartLocal) {
          const cartLocalParse = JSON.parse(cartLocal);

          commit("setLocalCart", cartLocalParse);
          return cartLocalParse;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Moi comment
    // async unChooseService() {
    //   try {
    //     await homeService.unChooseServiceReal();
    //     this.dispatch("getCart");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async getCart({ commit }) {
      if (this.state.Auth) {
        try {
          const cartFood = await CartService.getFoodInCartOfUser();
          commit("setCartFood", cartFood);
          return cartFood;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getDrinkInCart() {
      if (this.state.Auth) {
        try {
          const cartDrink = await CartService.getDrinkInCartOfUser();
          return cartDrink;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getItemsInDrinkCart() {
      if (this.state.Auth) {
        const cartDrink = await this.dispatch("getDrinkInCart");

        this.state.cartDrink.items = [];
        this.state.cartDrink.totalDrink = cartDrink.totalDrink;
        for (const item of cartDrink.drink) {
          const foundItem = await DrinkService.get(item.drinkId);

          foundItem.quantity = item.quantity;
          this.state.cartDrink.items.push(foundItem);
        }
      }
      this.dispatch("getCartData");
    },

    async addFoodToMenuCart(commit, { service_id, foodId }) {
      try {
        await MenuService.addFoodToMenu(service_id, foodId);

        this.dispatch("getCart");
        await this.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },
    async addMenuToCart(commit, { service_id, menuId }) {
      try {
        await MenuService.addFoodFromMenu(service_id, menuId);
        this.dispatch("getCart");
        await this.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },
    async removeFoodInCart(commit, { service_id, foodId }) {
      try {
        await MenuService.removeFoodInCart(service_id, foodId);
        await this.dispatch("getCart");
        await this.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },
    async addDrinkToCartReal(commit, { service_id, drinkId, quantity }) {
      try {
        const data = {
          drinkId,
          quantity,
        };

        await MenuService.addDrink(service_id, data);

        await this.dispatch("getItemsInDrinkCart");
        await this.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },

    //Other
    async getOtherInCart({ commit }) {
      if (this.state.Auth) {
        try {
          const cartOther = await CartService.getOtherInCartOfUser();
          commit("setCartOther", cartOther);

          return cartOther;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async addOtherToMenuCart(commit, { service_id, otherId }) {
      try {
        await MenuService.addOtherToMenu(service_id, otherId);

        await this.dispatch("getOtherInCart");
        await this.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },
    async removeOtherInCart(commit, { service_id, otherId }) {
      try {
        await MenuService.removeOtherInCart(service_id, otherId);
        await this.dispatch("getOtherInCart");
        await this.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },
  },

  plugins: [createPersistedState({})],
});

export default store;
