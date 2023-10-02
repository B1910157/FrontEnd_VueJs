<script>

import orderService from '../../services/order.service';
export default {

    props: {
        orders: { type: Array, default: [] },

    },

    methods: {

        toggleMenu(index) {
            this.orders[index].showMenu = !this.orders[index].showMenu;
        },
        async accept(orderId) {
            try {
                const rs = await orderService.accept(orderId);
                if (rs) {
                    this.$emit('accept', this.orders)

                }
            } catch (error) {
                console.log(error);
            }
        },
        async cancel(orderId) {

            try {
                const rs = await orderService.cancel(orderId);
                if (rs) {
                    this.$emit('cancel', this.orders)
                }
            } catch (error) {
                console.log(error);
            }
        },
        showConfirm(orderId) {
            if (confirm("Bạn có chắc chắn muốn duyệt đơn này?")) {
                this.accept(orderId);
            }
        },
        showConfirmCancel(orderId) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn này?")) {
                this.cancel(orderId);
            }
        },
        showDetails(orderId) {
            console.log("GO TO DETAIL ORDER WITH ID: ", orderId)

        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            return formattedDate;
        }



    }
};

</script>

<template>
    <div class="row">
        <div class="col-md-6 " v-for="(order, index) in orders" :key="order._id">

            <!-- Hiển thị thông tin đơn hàng -->
            <ul class="list-group mb-5">

                <li class="list-group-item">
                    <div class="row text-right">
                        <button class="btn position-absolute mt-2 offset-md-10" @click="showDetails(order._id)"><i
                                class="fa fa-eye" aria-hidden="true"></i></button>
                    </div>
                    <b>Khách hàng: <p v-if="order.user_id">User</p>
                        <p v-else-if="order.user_id == null">Khách vãng lai</p>
                    </b>
                    <b>Họ tên: </b>{{ order.fullname }}<br>
                    <b>Số điện thoại: </b>{{ order.phone }}<br>
                    <b>Email: </b>{{ order.email }}<br>
                    <div class="dropdown">
                        <p class=" dropdown-toggle" type="button" id="menuButton" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false" @click="toggleMenu(index)">
                            <b>Menu</b>
                        </p>
                        <ul class="dropdown-menu p-2" :class="{ 'd-block': order.showMenu }" aria-labelledby="menuButton">
                            <div>
                                Thực đơn
                                <li v-for="menu in order.cart[0].menu">*** {{ menu.food_name }} - giá: {{ menu.price }}
                                </li>
                            </div>
                            <div v-if="order.cart[1].drink.length > 0">
                                Đồ uống
                                <li v-for="menu in order.cart[1].drink">*** {{ menu.drink_name }} - giá: {{ menu.price }} -
                                    Số lượng: {{
                                        menu.quantity }}
                                </li>
                            </div>
                            <div v-if="order.cart[2].other.length > 0">
                                Khác
                                <li v-for="menu in order.cart[2].other">*** {{ menu.other_name }} - giá: {{ menu.price }}

                                </li>
                            </div>
                        </ul>
                    </div>
                    <div class="btn float-right" v-if="order.status == 0">
                        <button class="btn btn-success" @click="showConfirm(order._id)">Duyệt</button>
                        <button class="btn btn-danger  ml-2" @click="showConfirmCancel(order._id)">Hủy</button>
                    </div>
                    <div class="btn float-right" v-if="order.status == 1">
                        Đã duyệt
                    </div>
                    <div class="btn float-right" v-if="order.status == 2">
                        Bạn đã hủy
                    </div>
                </li>

            </ul>

        </div>
    </div>
</template>
<style>
.btn i.fa-eye {
    color: #007BFF;

}

.btn:hover i.fa-eye {
    color: #0056b3;

}
</style>