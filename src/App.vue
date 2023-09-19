<template>
    <MetaView />
    <vue3-confirm-dialog></vue3-confirm-dialog>
    <div class="col-lg-8 mx-auto p-3 py-md-5">
        <HeaderView />
        <router-view />
        <FooterView />
    </div>
</template>

<script>
import HeaderView from "./components/views/common/HeaderView.vue";
import FooterView from "./components/views/common/FooterView.vue";
import MetaView from "./components/views/common/MetaView.vue";

export default {
    name: "App",
    components: {
        HeaderView,
        FooterView,
        MetaView
    },
};
</script>

<!--<style lang="scss">-->
<!--@import 'assets/css/style.scss';-->
<!--@import 'assets/css/tabForActive/tab1.scss';-->
<!--@import 'assets/css/tabForCommu/tabCommu1.scss';-->
<!--@import 'assets/css/tabForShop/tabShop1.scss';-->
<!--@import 'assets/css/tabForShop/tabShopMenu.scss';-->
<!--@import 'assets/css/tabForUser/tabUser.scss';-->
<!--@import 'assets/css/tabForUser/tabUserContents.scss';-->
<!--@import 'assets/css/tabForContent/tabBoardContent.scss';-->
<!--@import 'assets/css/tabForContent/tabShopContent.scss';-->
<!--@import 'assets/css/tabForContent/tabPostWrite.scss';-->
<!--</style>-->