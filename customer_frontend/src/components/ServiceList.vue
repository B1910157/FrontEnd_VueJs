<script>
export default {
    props: {
        services: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }, 
        // getImage(food) {
        //     return `http://localhost:3000/${food.image}`;
        // },
        // formatCurrency(number) {
        //     const formatter = new Intl.NumberFormat('vi-VN', {
        //         style: 'currency',
        //         currency: 'VND'
        //     });
        //     return formatter.format(number);
        // },
    }
};

</script>
<template>
    <div style="height: 700px; overflow-y: scroll;">
        <ul class="list-group">
        <li class="list-group-item" v-for="(service, index) in services" :key="service._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            <!-- <img :src="getImage(food)" alt="" class="w-25 h-25"> -->
            <b > ***{{ service.service_name }}</b> 
           
          
        </li>
    </ul>

    </div>
   
    
</template>
