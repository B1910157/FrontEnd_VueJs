<template>
    <Form @submit="submitPayment" :validation-schema="PaymentFormSchema">
        <div class="form-group col-12">
            <label class="font-weight-bold"> Phương thức thanh toán </label>
            <div>
                <input type="radio" id="paymentVnPay" name="payment" value="vnpay" />
                <label for="paymentVnPay">Thanh toán qua VN Pay</label>
            </div>
            <div>
                <input type="radio" id="paymentPayLater" name="payment" value="paylater" />
                <label for="paymentPayLater">Thanh toán trực tiếp</label>
            </div>
        </div>
    </Form>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {

        Form,
        Field,
        ErrorMessage,

    },
}
</script>