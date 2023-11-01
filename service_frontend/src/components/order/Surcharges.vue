<template>
    <Form @submit="submitAddSurcharges" :validation-schema="surchargesFormSchema">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group ml-3">
                    <label class="font-weight-bold">Phụ thu</label>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nội dung</th>
                                <th>Giá tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(surcharges, index) in surcharges" :key="index">
                                <td>
                                    <input type="text" class="form-control text-left" required v-model="surcharges.key" />
                                    <div v-if="!isValid(surcharges.key)" class="error-feedback">Chưa nhập nội dung.</div>
                                </td>
                                <td>
                                    <input type="text" class="form-control text-left" required v-model="surcharges.value" />
                                    <div v-if="!isValid(surcharges.value)" class="error-feedback">Chưa nhập giá.</div>
                                </td>
                                <td>
                                    <button class="btn btn-danger" @click="confirmRemoveSurcharges(index)"><i
                                            class="fa-solid fa-x"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" @click="addSurcharges" class="btn btn-outline-primary m-1">Thêm phụ thu</button>
                </div>
                <div class="form-group pt-4 text-right">
                    <button @click="this.shouldCallSubmit = true" type="submit" class="btn btn-primary"> <i
                            class="fa fa-save"></i> Lưu </button>
                </div>

            </div>

            <div class="col-md-6">
            </div>
        </div>

    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import getProvincesOpenAPI from "../../services/getProvincesOpenAPI";
import { VBtn, VSelect } from "vuetify/lib/components/index.mjs";
import { toast } from 'vue3-toastify';

import moment from 'moment';
import 'moment/locale/vi';
export default {
    components: {
        VBtn,
        VSelect,
        Form,
        Field,
        ErrorMessage,

    },
    emits: ["submit:surcharges"],
    props: {
        order: {}
    },
    data() {
        const surchargesFormSchema = yup.object().shape({


        });
        const defaultSurcharge = {
            key: '',
            value: ''
        };
        return {
            orderLocal: this.order,
            surcharges: (this.order && this.order.surcharges) ? this.order.surcharges : [defaultSurcharge],
            surchargesFormSchema,
            shouldCallSubmit: false,

        };
    },
    watch: {
        surcharges: {
            deep: true,
            handler() {
                this.hasEmptySurcharges;
                // this.errorSub = this.hasEmptySubDescriptions;
                // console.log(this.errorSub)
            },
        },
    },
    computed: {
        hasEmptySurcharges() {
            if (Array.isArray(this.surcharges) && this.surcharges.length > 0) {
                const check = this.surcharges.some((sub) => sub.key === '' || sub.value === '');
                console.log(check);
                return check;
            }
            return false;
        }
    },

    methods: {
        confirmRemoveSurcharges(index) {
            const result = window.confirm("Bạn có chắc chắn muốn xóa phụ thu này?");
            if (result) {
                this.removeSurcharges(index);
            }
        },
        addSurcharges() {
            this.surcharges.push({
                key: '',
                value: ''
            })
        },
        removeSurcharges(index) {
            this.surcharges.splice(index, 1)
        },
        isValid(value) {
            console.log("aloo tyep key", typeof value);
            if (typeof value === 'string') {
                return value.trim() !== '';
            } else {
                return false;
            }
        },
        // isValidNum(value) {
        //     console.log("aloo tyep value", typeof value);
        //     if (typeof value === 'number') {
        //         return value;
        //     } else {
        //         return false;
        //     }
        // },

        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },

        submitAddSurcharges() {
            if (this.shouldCallSubmit) {
                if (!this.order.surcharges) {
                    this.order.surcharges = this.surcharges;
                }
                console.log("orderlocal", this.orderLocal);
                this.$emit("submit:surcharges", this.orderLocal);
            }
            // console.log("23234", this.surcharges);
            // if (!this.order.surcharges) {
            //     this.order.surcharges = this.surcharges;
            //     console.log("hellooo", this.orderLocal);
            // }
            // this.$emit("submit:surcharges", this.orderLocal);
        }


    },

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
