<template>
    <div>
        <AppHeader/>
        <div>
            <router-view v-slot="{ Component }">
                <component :is="Component"></component>
            </router-view>
        </div>
        <AppFooter />
        <div class="sticky-bar" :class="{ 'show': showStickyBar }">
            <button class="scroll-to-top" @click="scrollToTop">
                <i class="fas fa-arrow-up"></i>
            </button>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onBeforeUnmount } from "vue";
import AppHeader from "@/components/layouts/Header.vue";
import AppFooter from "@/components/layouts/Footer.vue";

export default defineComponent({
    components: {
        AppHeader,
        AppFooter,
    },

    setup() {
        const showStickyBar = ref(false);
        const handleScroll = () => {
            showStickyBar.value = window.scrollY > window.innerHeight;
        };
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
        onBeforeUnmount(() => {
            window.removeEventListener("scroll", handleScroll);
        });

        return {
            showStickyBar,
            scrollToTop,
        };
    },
});
</script>
  
<style>
.sticky-bar {
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #052649;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    border-radius: 100px;
}

.sticky-bar.show {
    opacity: 1;
    pointer-events: auto;
}

.scroll-to-top {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    color: #052649;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.scroll-to-top i {
    margin-top: 10px;
}

.scroll-to-top:hover {
    background-color: #f2f2f2;
}
</style>