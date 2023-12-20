<template>
    <div class="border ">
        <ServicesList v-if="filteredFoodCount > 0" :foods="filteredFood" v-model:activeIndex="activeIndex" />
        <p class="text-center" v-else>Không có dịch vụ hỗ trợ nào.</p>
    </div>

    <!-- <button class="btn btn-primary" @click="setLocalCart1()">Hell123o</button> -->
    <!-- <div>
        <button @click="showSuccessToast">Hiển thị Toast</button>
    </div> -->
    <!-- <div>
        <button @click="notify">Notify !</button>
    </div> -->
</template>
<script>
import { mapState, mapMutations } from "vuex";
import FoodCard from "@/components/FoodCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ServicesList from "@/components/ServicesList.vue";
import homeService from "@/services/home.service";
import Menu from "@/components/Menu.vue";
import { useToast } from 'vue-toast-notification';

import { toast } from 'vue3-toastify';
// const VueToast = useToast();
export default {
    components: {
        FoodCard,
        InputSearch,
        ServicesList,
        Menu,
    },
    data() {
        return {
            foods: [],
            menu: [],
            activeIndex: -1,
            searchText: "",

        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        ...mapState(["Auth"]),

        foodString() {
            return this.foods.map((food) => {
                const { food_name, food_category, price } = food;
                return [food_name, food_category, price].join("");
            });
        },

        filteredFood() {
            if (!this.searchText) return this.foods;
            return this.foods.filter((_food, index) =>
                this.foodString[index].includes(this.searchText)
            );
        },

        activeFood() {
            if (this.activeIndex < 0) return null;
            return this.filteredFood[this.activeIndex];
        },
        filteredFoodCount() {
            return this.filteredFood.length;
        },

        menuCount() {
            return this.menu.length;
        },
        menuTotalPrice() {
            let total = 0;
            this.menu.forEach((food) => {
                total += food.price;
            });
            return total;
        },
    },
    methods: {
        notify() {
            toast("Wow so easy !", {
                autoClose: 1000,
            }); // ToastOptions
        },
        showSuccessToast() {
            toast.success('Đặt tiệc thành công', { autoClose: 1000 });
        },

        // showSuccessToast() {
        //     const VueToast = useToast();
        //     VueToast.open({
        //         message: 'Đặt tiệc thành công!',
        //         type: 'success', // Loại toast (có thể là 'success', 'error', 'info', hoặc 'warning')
        //         position: 'top-right', // Vị trí hiển thị toast
        //         duration: 2000, // Thời gian hiển thị (milliseconds)

        //     });
        // },

        setLocalCart1() {
            console.log("set lại nè");
            const newLocalCart = {
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
            };
            localStorage.setItem("localCart", JSON.stringify(newLocalCart));
            // console.log("set lại");
            // console.log(newLocalCart)
        },
        ...mapMutations(["setAuth"]),
        handleOrder() {
            if (this.Auth) {
                this.$router.push({ name: 'order' });
            } else {
                alert("Please log in");
                this.$router.push({ name: 'login' });
            }
        },

        async retrieveFoods() {
            try {
                this.foods = await homeService.home();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFoods();
            this.activeIndex = -1;
        },
        updateMenu() {
            this.refreshList();
        },

    },
    mounted() {
        this.refreshList();

    },
};
</script>

