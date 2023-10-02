<script>
export default {
  props: {
    food: { type: Object, required: true },
  },
  
};
</script>
<template>
  <div class="text-left p-3">
    <h4>DỊCH VỤ {{ food.service_name }}</h4>
    <div class="p-1">
      <strong>Tên món:</strong>
      {{ food.service_name }}
    </div>
    <div class="p-1">
      <strong>Loại món:</strong>
      {{ food.email }}
    </div>
    <div class="p-1">
      <strong>Loại món:</strong>
      {{ food.address }}
    </div>
    <div class="p-1">
      <strong>Loại món:</strong>
      {{ food.support_area }}
    </div>
    <div class="p-1">
      <strong>Loại món:</strong>
      {{ food.support_party_type }}
    </div>
    <div class="p-1">
      <strong>MÓN ĂN CỦA DỊCH VỤ:</strong>
      <ul>
        <li v-for="(food, index) in food.foods" :key="index">
            {{ food.food_name }}
            {{ food.price }}
        </li>
      </ul>
    </div>
    <div class="p-1">
      <strong>CÁC DỊCH VỤ KHÁC:</strong>
      <ul>
        <li v-for="(food, index) in food.others" :key="index">
            {{ food.other_name }}
            {{ food.price }}/{{ food.unit }}
        </li>
      </ul>
    </div>
  </div>
</template>
