<template>
    <div v-if="this.check == 1" class="congratulation-area text-center mt-5">
        <div class="container">
            <div class="congratulation-wrapper">
                <div class="congratulation-contents center-text">
                    <div class="congratulation-contents-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h4 class="congratulation-contents-title"> HỦY ĐƠN THÀNH CÔNG </h4>
                    <p class="congratulation-contents-para"> Mọi thắc mắc vui lòng liên hệ: <a
                            href="mailto:tinb1910157@student.ctu.edu.vn">tin@contact.com</a></p>

                    <div class="btn-wrapper mt-4">

                        <router-link to="/" class="cmn-btn btn-bg-1">Đến Website</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="this.check == 0" class="congratulation-area text-center mt-5">
        <div class="container">
            <div class="congratulation-wrapper">
                <div class="congratulation-contents center-text">
                    <div class="congratulation-contents-icon">
                        <i class="fas fa-close"></i>
                    </div>
                    <h4 class="congratulation-contents-title"> HỦY ĐƠN KHÔNG THÀNH CÔNG </h4>
                    <p class="congratulation-contents-para"> Mọi thắc mắc vui lòng liên hệ: <a
                            href="mailto:tinb1910157@student.ctu.edu.vn">tin@contact.com</a></p>

                    <div class="btn-wrapper mt-4">

                        <router-link to="/" class="cmn-btn btn-bg-1">Đến Website</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="this.check == 2" class="congratulation-area text-center mt-5">
        <div class="container">
            <div class="congratulation-wrapper">
                <div class="congratulation-contents center-text">
                    <div class="congratulation-contents-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h4 class="congratulation-contents-title"> BẠN ĐÃ HỦY ĐƠN NÀY </h4>
                    <p class="congratulation-contents-para"> Mọi thắc mắc vui lòng liên hệ: <a
                            href="mailto:tinb1910157@student.ctu.edu.vn">tin@contact.com</a></p>

                    <div class="btn-wrapper mt-4">

                        <router-link to="/" class="cmn-btn btn-bg-1">Đến Website</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import orderService from "@/services/order.service";
export default {

    data() {
        return {
            orderId: this.$route.params.orderId,
            order: {},
            check: 0,
        };
    },
    methods: {
        async getOrder() {
            this.order = await orderService.findOneOrder(this.orderId);
            console.log("tới đây", this.order)

        },
        async checkCancelOrder() {
            await this.getOrder()
            const currentDate = new Date();
            const updatedAtDate = new Date(this.order.updateAt);

            // Tính khoảng thời gian giữa ngày cập nhật và ngày hiện tại
            const timeDifference = currentDate - updatedAtDate;
            // Số mili giây trong 1 ngày
            const oneDayInMillis = 24 * 60 * 60 * 1000;

            if ((this.order.status == 1) && (timeDifference <= oneDayInMillis)) {
                
                await orderService.cancelOrder(this.orderId);
                this.check = 1;
            } else if (this.order.status == 3) {
                this.check = 2;
            } else {
                this.check = 0;
            }

        }

    },
    created() {

        this.checkCancelOrder();
    }

}
</script>
  
<style scoped>
.congratulation-wrapper {
    max-width: 550px;
    margin-inline: auto;
    -webkit-box-shadow: 0 0 20px #f3f3f3;
    box-shadow: 0 0 20px #f3f3f3;
    padding: 30px 20px;
    background-color: #fff;
    border-radius: 10px;
}

.congratulation-contents.center-text .congratulation-contents-icon {
    margin-inline: auto;
}

.congratulation-contents-icon {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 100px;
    width: 100px;
    background-color: #65c18c;
    color: #fff;
    font-size: 50px;
    border-radius: 50%;
    margin-bottom: 30px;
}

.congratulation-contents-title {
    font-size: 32px;
    line-height: 36px;
    margin: -6px 0 0;
}

.congratulation-contents-para {
    font-size: 16px;
    line-height: 24px;
    margin-top: 15px;
}

.btn-wrapper {
    display: block;
}

.cmn-btn.btn-bg-1 {
    background: #6176f6;
    color: #fff;
    border: 2px solid transparent;
    border-radius: 3px;
    text-decoration: none;
    padding: 5px;
}
</style>