
<template>
    <Form @submit="submitJob" class="text-left" :validation-schema="jobFormSchema" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="font-weight-bold" for="title">Tiêu đề </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;">
                        {{ jobLocal.title }}
                    </div>
                    <Field :style="{ display: isEditing ? 'block' : 'none' }" name="title" type="text" class="form-control"
                        v-model="jobLocal.title" />
                    <ErrorMessage name="title" class="error-feedback" />
                </div>
                <div class="form-group ">
                    <label class="font-weight-bold" for="type_job">Loại hình</label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;">
                        <div v-if="jobLocal.type_job == '1'">Part-time</div>
                        <div v-if="jobLocal.type_job == '2'">Full-time</div>
                    </div>
                    <Field :style="{ display: isEditing ? 'block' : 'none' }" v-slot="{ value }" name="type_job" as="select"
                        class="form-select  custom-select " v-model="jobLocal.type_job">
                        <option value="" disabled>--Chọn--</option>
                        <option v-for="type_job1 in type_jobs" :key="type_job1" :value="type_job1._id"
                            :selected="value && value.includes(type_job1)">{{ type_job1.name }}</option>
                    </Field>
                    <ErrorMessage name="type_job" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="wage">Lương </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;">
                        {{ jobLocal.wage }}
                    </div>
                    <Field :style="{ display: isEditing ? 'block' : 'none' }" name="wage" type="text" class="form-control"
                        v-model="jobLocal.wage" />
                    <ErrorMessage name="wage" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label class="font-weight-bold" for="slot">Số lượng </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;">
                        {{ jobLocal.slot }}
                    </div>
                    <Field :style="{ display: isEditing ? 'block' : 'none' }" name="slot" type="number" class="form-control"
                        v-model="jobLocal.slot" />
                    <ErrorMessage name="slot" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="deadline">Hạn nộp </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;">
                        {{ jobLocal.deadline }}
                    </div>
                    <Field :style="{ display: isEditing ? 'block' : 'none' }" name="deadline" type="date"
                        class="form-control" v-model="jobLocal.deadline" />
                    <ErrorMessage name="deadline" class="error-feedback" />
                </div>

            </div>
            <div class="col-md-6">

                <div class="form-group">
                    <label class="font-weight-bold" for="area">Khu vực </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;">
                        {{ jobLocal.area }}
                    </div>
                    <Field :style="{ display: isEditing ? 'block' : 'none' }" name="area" type="text" class="form-control"
                        v-model="jobLocal.area" />
                    <ErrorMessage name="area" class="error-feedback" />
                </div>
                <div class="form-group ">
                    <label class="font-weight-bold" for="description">Mô tả </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;"
                        v-html="jobLocal.description">
                    </div>
                    <div :style="{ display: isEditing ? 'block' : 'none' }">
                        <ckeditor :editor="editor" v-model="jobLocal.description" />
                        <ErrorMessage name="description" class="error-feedback" />
                    </div>
                </div>

                <div class="form-group">
                    <label class="font-weight-bold" for="requirement">Yêu cầu </label>
                    <div class="border p-2" :style="{ display: !isEditing ? 'block' : 'none' }" style="width: 100%;"
                        v-html="jobLocal.requirement">

                    </div>
                    <div :style="{ display: isEditing ? 'block' : 'none' }">
                        <ckeditor :style="{ display: isEditing ? 'block' : 'none' }" :editor="editor"
                            v-model="jobLocal.requirement" />
                        <ErrorMessage name="requirement" class="error-feedback" />
                    </div>

                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-12 ">
                <button :style="{ display: isEditing ? 'block' : 'none' }" type="submit" class=" btn btn-primary"><i
                        class="fas fa-save"></i> Lưu</button>
            </div>

        </div>
    </Form>
    <div class="row">
        <div class="offset-md-11">
            <span v-if="this.isEditing == false" @click="editPost()" class="mt-2 btn btn-warning">
                <i class="fas fa-edit"></i> </span>
            <!-- <div v-else-if="this.isEditing == true">
                <span @click="savePost()" class="mt-2 btn btn-danger">
                    <i class="fas fa-close"></i> </span>
            </div> -->
        </div>
    </div>
    <br> <br>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        ckeditor: CKEditor.component,
    },
    emits: ["submit:job"],
    props: {
        job: { type: Object, required: true },
        value: String,
    },
    data() {
        const jobFormSchema = yup.object().shape({

            title: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 100 ký tự."),
            wage: yup
                .string()
                .required("Lương không được rỗng"),
            type_job: yup.string()
                .required("Vui lòng chọn loại hình việc làm"),
            slot: yup.string()
                .required("Vui lòng nhập số lượng"),

            area: yup
                .string()
                .required("Vui lòng chọn khu vực"),
            deadline: yup.date()
                .required("Chọn hạn nộp")
                .min(new Date(), "Hạn nộp phải lớn hơn ngày hiện tại"),

        });

        return {

            jobLocal: this.job,
            jobFormSchema,
            type_jobs: [{
                _id: "1",
                name: "Part-time"
            },
            {
                _id: "2",
                name: "Full-time"
            }],
            editor: ClassicEditor,
            editorData: this.value,
            isEditing: false

        };
    },
    methods: {

        submitJob() {

            const formData = new FormData();
            formData.append("title", this.jobLocal.title);
            formData.append("wage", this.jobLocal.wage);
            formData.append("description", this.jobLocal.description);
            formData.append("requirement", this.jobLocal.requirement);
            formData.append("deadline", this.jobLocal.deadline);
            formData.append("slot", this.jobLocal.slot);
            formData.append("area", this.jobLocal.area);
            this.$emit("submit:job", formData);



        },
        editPost() {
            this.isEditing = !this.isEditing;
        },
        savePost() {
            // Lưu các thay đổi và chuyển về chế độ xem
            this.isEditing = false;
        }


    },
    watch: {
        editorData(newData) {
            this.$emit("input", newData);
        },
        value(newValue) {
            this.editorData = newValue;
        },
    },

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>