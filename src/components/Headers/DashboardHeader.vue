<template>
  <!-- Main Sidebar -->
  <component
    :is="navbarFixed ? 'a-affix' : 'div'"
    :offset-top="top"
    :class="navbarFixed ? 'navbar-fixed' : ''"
  >
    <!-- Layout Header -->
    <a-layout-header>
      <a-row type="flex">
        <!-- Header Breadcrumbs & Title Column -->
        <a-col :span="18">
          <!-- Header Breadcrumbs -->
          <a-breadcrumb>
            <a-breadcrumb-item
              ><router-link to="/"> Pages</router-link></a-breadcrumb-item
            >
            <a-breadcrumb-item>{{ this.$route.name }}</a-breadcrumb-item>
          </a-breadcrumb>
          <!-- / Header Breadcrumbs -->

          <!-- Header Page Title -->
          <div class="ant-page-header-heading">
            <span class="ant-page-header-heading-title">{{
              this.$route.name
            }}</span>
          </div>
          <!-- / Header Page Title -->
        </a-col>
        <!-- / Header Breadcrumbs & general options -->
        <a-col :span="6">
          <a-menu mode="horizontal">
            <!-- Header fixed -->
            <a-menu-item @click="navbarFixed = !navbarFixed">
              <a-popover placement="bottom">
                <template slot="content">
                  <span>{{ $t("header.fix-header") }}</span>
                </template>
                <a-icon type="pushpin" :theme="navbarFixed ? 'filled' : ''" />
              </a-popover>
            </a-menu-item>
            <!-- / Header fixed -->
            <!-- language switch -->
            <a-sub-menu>
              <span slot="title" class="submenu-title-wrapper">
                <a-icon type="taobao"
              /></span>
              <a-menu-item-group :title="$t('header.switch-language')">
                <a-menu-item key="setting:1" @click="$i18n.locale = 'en'">
                  English
                </a-menu-item>
                <a-menu-item key="setting:2" @click="$i18n.locale = 'es'">
                  Español
                </a-menu-item>
              </a-menu-item-group>
            </a-sub-menu>
            <!-- / language switch -->
            <!-- Help button -->
            <a-menu-item @click="navbarFixed = !navbarFixed">
              <a-popover placement="bottom">
                <template slot="content">
                  <span>{{ $t("sidebar.docs") }}</span>
                </template>
                <a-icon type="question" />
              </a-popover>
            </a-menu-item>
            <!-- / Help button -->
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
    <!--  /Layout Header -->
  </component>
  <!-- / Main Sidebar -->
</template>

<script>
export default {
  props: {
    // Sidebar collapsed status.
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Fixed header/sidebar-footer ( Affix component ) top offset.
      top: 0,
      navbarFixed: false,
    };
  },
  methods: {
    resizeEventHandler() {
      this.top = this.top ? 0 : -0.01;
      // To refresh the header if the window size changes.
      // Reason for the negative value is that it doesn't activate the affix unless
      // scroller is anywhere but the top of the page.
    },
  },
  mounted: function () {
    // Set the wrapper to the proper element, layout wrapper.
    this.wrapper = document.getElementById("layout-dashboard");
  },
  created() {
    // Registering window resize event listener to fix affix elements size
    // error while resizing.
    window.addEventListener("resize", this.resizeEventHandler);
  },
  destroyed() {
    // Removing window resize event listener.
    window.removeEventListener("resize", this.resizeEventHandler);
  },
};
</script>
