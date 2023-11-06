<script>


import { VDataTable } from "vuetify/labs/VDataTable";
import { VBtn, VIcon, VDialog } from "vuetify/lib/components/index.mjs";
import EditCateForm from "./EditCateForm.vue";
// import ReasonCancelForm from './ReasonCancelForm.vue';
export default {
    components: {
        VDataTable,
        VBtn,
        VIcon,
        VDialog,
        EditCateForm
        // ReasonCancelForm,
    },
    props: {
        categories: { type: Array, default: [] },

    },
    computed: {
        formatCategories() {
            return this.categories.map((cate) => {
                const actions = [];


                return {
                    ...cate,
                    actions,


                };
            });
        },

    },

    data: () => ({
        headers: [

            {
                title: 'Loại món',
                align: 'end',
                sortable: false,
                key: 'food_category',

            },

            {
                title: 'Thao tác',
                align: 'end',
                key: 'actions',

            },



        ],
        itemsPerPage: 5,
        showFormEdit: false,
        category: "",


    }),
    emits: ["delete:cate", "edit:cate"],

    methods: {
        submitEditCate(id, data) {
            this.$emit("edit:cate", id, data);
            this.showFormEdit = false;
        },
        editCategory(category) {
            this.showFormEdit = true;
            this.category = category;
        },
        deleteCategory(category) {
            this.$emit("delete:cate", category);


        }
    }
};

</script>
<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="formatCategories" class="elevation-1"
        item-key="_id">
        <template v-slot:item.actions="{ item }">
            <v-btn class="btn-edit mr-2" @click="editCategory(item)">
                <i class="fa-solid fa-pen-to-square"></i>
            </v-btn>
            <v-btn class="btn-red" @click="deleteCategory(item._id)">
                <i class="fa-solid fa-trash"></i>
            </v-btn>
        </template>

    </v-data-table>

    <v-dialog v-model="this.showFormEdit" max-width="800px">

        <v-btn color="danger" @click="showFormEdit = false" icon="fa fa-close" class="ml-auto mb-3"><i
                class="fa fa-close"></i></v-btn>

        <div class="rounded-lg">
            <EditCateForm :category="this.category" @submit:editCate="submitEditCate" />
        </div>
        <!-- <ListFoodToAdd :foodNotInMenu="this.listFood" @addFoodToMenu="addFoodToMenu" /> -->
    </v-dialog>
</template>
<style>
.btn-edit {
    background-color: #ff9800;
    color: white;

}

.btn-red {
    background-color: #dc3545;

    color: white;

}


.btn i.fa-eye {
    color: #007BFF;
}


.btn:hover i.fa-eye {
    color: #0056b3;
}
</style>