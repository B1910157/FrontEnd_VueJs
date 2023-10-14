<template>
    <div class="row container  justify-content-start">
        <div class="col-4 my-3">
            <v-card class="mx-auto" max-width="300">
                <v-card-item class="text-primary" title="LƯỢT ĐẶT TIỆC">
                    <template v-slot:subtitle>
                        <v-icon icon="fa fa-bar-chart" size="18" color="primary" class="me-1 pb-1"></v-icon>
                        trong tháng 9
                    </template>
                </v-card-item>
                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2 text-secondary" cols="6">
                            64&deg;F

                        </v-col>

                        <v-col cols="6" class="text-right">
                            <v-icon color="primary" icon="fa fa-book" size="70"></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn @click="expand = !expand">
                        {{ !expand ? 'Full Report' : 'Hide Report' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div class="col-4 my-3">
            <v-card class="mx-auto" max-width="300">
                <v-card-item class="text-primary" title="MÓN ĂN">
                    <template v-slot:subtitle>
                        <v-icon icon="fa fa-bar-chart" size="18" color="primary" class="me-1 pb-1"></v-icon>

                    </template>
                </v-card-item>
                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2 text-secondary" cols="6">
                            64&deg;F

                        </v-col>

                        <v-col cols="6" class="text-right">
                            <v-icon color="primary" icon="fa fa-book" size="70"></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn @click="expand = !expand">
                        {{ !expand ? 'Full Report' : 'Hide Report' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div class="col-4 my-3">
            <v-card class="mx-auto" max-width="300">
                <v-card-item class="text-primary" title="ĐỒ UỐNG">
                    <template v-slot:subtitle>
                        <v-icon icon="fa fa-bar-chart" size="18" color="primary" class="me-1 pb-1"></v-icon>

                    </template>
                </v-card-item>
                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2 text-secondary" cols="6">
                            64&deg;F

                        </v-col>

                        <v-col cols="6" class="text-right">
                            <v-icon color="primary" icon="fa fa-book" size="70"></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn @click="expand = !expand">
                        {{ !expand ? 'Full Report' : 'Hide Report' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div class="col-4 my-3">
            <v-card class="mx-auto" max-width="300">
                <v-card-item class="text-primary" title="KHÁC">
                    <template v-slot:subtitle>
                        <v-icon icon="fa fa-bar-chart" size="18" color="primary" class="me-1 pb-1"></v-icon>

                    </template>
                </v-card-item>
                <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                        <v-col class="text-h2 text-secondary" cols="6">
                            64&deg;F

                        </v-col>

                        <v-col cols="6" class="text-right">
                            <v-icon color="primary" icon="fa fa-book" size="70"></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn @click="expand = !expand">
                        {{ !expand ? 'Full Report' : 'Hide Report' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>
import { VBtn, VCard, VList, VSlider, VListItem, VRow, VCol, VImg, VCardTitle, VCardSubtitle, VCardActions, VCardText, VCardItem, VIcon } from "vuetify/lib/components/index.mjs";

export default {
    components: {
        VBtn,
        VCard,
        VImg,
        VCardSubtitle,
        VCardTitle,
        VCardActions,
        VCardText,
        VCardItem,
        VIcon,
        VRow,
        VCol,
        VListItem,
        VSlider,
        VList,


    },
    data: () => ({
        labels: { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' },
        expand: false,
        time: 0,
        forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
    }),
}
</script>
<style scoped></style>