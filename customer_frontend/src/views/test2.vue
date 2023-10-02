<script setup>
import { reactive, computed, onMounted } from "vue";


import {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from "vue-dataset";

//mang du lieu json nhan ve
import users from "@/data/usersDataset.json";

//thiet lap cac truong
const cols = reactive([
    {
        name: "Name",
        field: "name",
        sort: "",
    },
    {
        name: "Email",
        field: "email",
        sort: "",
    },
    {
        name: "Company",
        field: "company",
        sort: "",
    },
    {
        name: "Birth date",
        field: "birthdate",
        sort: "",
    },
]);

//ham xap sep du lieu cot 
const sortBy = computed(() => {
    return cols.reduce((acc, o) => {
        if (o.sort) {
            o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
        }
        return acc;
    }, []);
});


function onSort(event, i) {
    let toset;
    const sortEl = cols[i];

    if (!event.shiftKey) {
        cols.forEach((o) => {
            if (o.field !== sortEl.field) {
                o.sort = "";
            }
        });
    }

    if (!sortEl.sort) {
        toset = "asc";
    }

    if (sortEl.sort === "desc") {
        toset = event.shiftKey ? "" : "asc";
    }

    if (sortEl.sort === "asc") {
        toset = "desc";
    }

    sortEl.sort = toset;
}


onMounted(() => {

    document.querySelectorAll("#datasetLength label").forEach((el) => {
        el.remove();
    });


    let selectLength = document.querySelector("#datasetLength select");

    selectLength.classList = "";
    selectLength.classList.add("form-select");
    selectLength.style.width = "80px";
});
</script>

<style lang="scss" scoped>
.gg-select {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(1);
    width: 22px;
    height: 22px;
}

.gg-select::after,
.gg-select::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 8px;
    height: 8px;
    left: 7px;
    transform: rotate(-45deg);
}

.gg-select::before {
    border-left: 2px solid;
    border-bottom: 2px solid;
    bottom: 4px;
    opacity: 0.3;
}

.gg-select::after {
    border-right: 2px solid;
    border-top: 2px solid;
    top: 4px;
    opacity: 0.3;
}

th.sort {
    cursor: pointer;
    user-select: none;

    &.asc {
        .gg-select::after {
            opacity: 1;
        }
    }

    &.desc {
        .gg-select::before {
            opacity: 1;
        }
    }
}
</style>

<template>
    <div class="content">
        <!-- bang du lieu -->
        <Dataset v-slot="{ ds }" :ds-data="users" :ds-sortby="sortBy"
            :ds-search-in="['name', 'email', 'company', 'birthdate']">
            <div class="row" :data-page-count="ds.dsPagecount">
                <div id="datasetLength" class="col-md-8 py-2">
                    <!-- hien thi theo so luong -->
                    <DatasetShow />
                </div>
                <div class="col-md-4 py-2">
                    <!-- tim kiem -->
                    <DatasetSearch ds-search-placeholder="Search..." />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th v-for="(th, index) in cols" :key="th.field" :class="['sort', th.sort]"
                                        @click="onSort($event, index)">
                                        {{ th.name }} <i class="gg-select float-end"></i>
                                    </th>
                                </tr>
                            </thead>
                            <DatasetItem tag="tbody" class="fs-sm">
                                <template #default="{ row, rowIndex }">
                                    <tr>
                                        <th scope="row">{{ rowIndex + 1 }}</th>
                                        <td style="min-width: 150px">{{ row.name }}</td>
                                        <td>{{ row.email }}</td>
                                        <td style="min-width: 150px">{{ row.company }}</td>
                                        <td style="min-width: 150px">{{ row.birthdate }}</td>
                                    </tr>
                                </template>
                            </DatasetItem>
                        </table>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">

                <DatasetInfo class="py-3 fs-sm" />
                <!-- phân trang -->
                <DatasetPager class="flex-wrap py-3 fs-sm" />
            </div>
        </Dataset>

    </div>
</template>