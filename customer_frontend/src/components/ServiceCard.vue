<script>
export default {
  props: {
    service: { type: Object, required: true },
    
  },
};
</script>
<template>
  <div class="text-left p-3">
    <div class="p-1">
      <strong>Tên :</strong>
      {{ service.service_name }}
    </div>

    {{ service._id }}

    <router-link
      :to="{
        name: 'services',
        params: { id: service._id },
      }"
    >
      <span class="mt-2 badge badge-warning">
        <i class="fas fa-edit"></i> Xem chi tiet</span
      >
    </router-link>
  </div>
</template>
