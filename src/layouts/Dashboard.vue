<!-- 
	This is the dashboard layout, used in dashboard, tables, billing and profile pages.
 -->

<template>
  <div>
    <!-- Dashboard Layout -->
    <a-layout
      class="layout-dashboard"
      id="layout-dashboard"
      :class="[!sidebarCollapsed ? 'has-sidebar' : '', layoutClass]"
    >
      <!-- Main Sidebar -->
      <DashboardSidebar
        :sidebarCollapsed="sidebarCollapsed"
        :sidebarColor="sidebarColor"
        :sidebarTheme="sidebarTheme"
        @toggleSidebar="toggleSidebar"
      ></DashboardSidebar>
      <!-- / Main Sidebar -->

      <!-- Layout Content -->
      <a-layout>
        <!-- Layout Header's Conditionally Fixed Wrapper -->
        <DashboardHeader
          :sidebarCollapsed="sidebarCollapsed"
          @toggleSettingsDrawer="toggleSettingsDrawer"
          @toggleSidebar="toggleSidebar"
        ></DashboardHeader>
        <!-- / Layout Header's Conditionally Fixed Wrapper -->

        <!-- Page Content -->
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <!-- / Page Content -->

        <!-- Layout Footer -->
        <DashboardFooter></DashboardFooter>
        <!-- / Layout Footer -->

        <!-- Sidebar Overlay -->
        <div
          class="sidebar-overlay"
          @click="sidebarCollapsed = true"
          v-show="!sidebarCollapsed"
        ></div>
        <!-- / Sidebar Overlay -->
      </a-layout>
      <!-- / Layout Content -->

      <!-- Settings Drawer -->
      <DashboardSettingsDrawer
        :showSettingsDrawer="showSettingsDrawer"
        :sidebarTheme="sidebarTheme"
        @toggleSettingsDrawer="toggleSettingsDrawer"
        @updateSidebarTheme="updateSidebarTheme"
        @updateSidebarColor="updateSidebarColor"
      ></DashboardSettingsDrawer>
      <!-- / Settings Drawer -->
    </a-layout>
    <!-- / Dashboard Layout -->
  </div>
</template>

<script>
import DashboardSidebar from "../components/Sidebars/DashboardSidebar";
import DashboardHeader from "../components/Headers/DashboardHeader";
import DashboardFooter from "../components/Footers/DashboardFooter";
import DashboardSettingsDrawer from "../components/Sidebars/DashboardSettingsDrawer";

export default {
  components: {
    DashboardSidebar,
    DashboardHeader,
    DashboardFooter,
    DashboardSettingsDrawer,
  },
  data() {
    return {
      // Sidebar collapsed status.
      sidebarCollapsed: false,

      // Main sidebar color.
      sidebarColor: "primary",

      // Main sidebar theme : light, white, dark.
      sidebarTheme: "white",

      // Settings drawer visiblility status.
      showSettingsDrawer: false,
    };
  },
  methods: {
    toggleSidebar(value) {
      this.sidebarCollapsed = value;
    },
    toggleSettingsDrawer(value) {
      this.showSettingsDrawer = value;
    },
    updateSidebarTheme(value) {
      this.sidebarTheme = value;
    },
    updateSidebarColor(value) {
      this.sidebarColor = value;
    },
  },
  computed: {
    // Sets layout's element's class based on route's meta data.
    layoutClass() {
      return this.$route.meta.layoutClass;
    },
  },
};
</script>
