<template>
  <!-- Main Sidebar -->
  <a-layout-sider
    collapsible
    class="sider-primary"
    breakpoint="lg"
    collapsed-width="0"
    width="250px"
    :collapsed="sidebarCollapsed"
    @collapse="$emit('toggleSidebar', !sidebarCollapsed)"
    :trigger="null"
    :class="[
      'ant-layout-sider-' + sidebarColor,
      'ant-layout-sider-' + sidebarTheme,
    ]"
    theme="light"
    :style="{ backgroundColor: 'transparent' }"
  >
    <a-row type="flex" align="middle" justify="center">
      <a-col>
        <img src="images/logos/brandLogo-gray.svg" alt="" width="60" />
      </a-col>
    </a-row>
    <a-row type="flex" align="middle" justify="center">
      <a-col>
        <span class="text-item-header">Metric OS</span>
      </a-col>
    </a-row>
    <hr />

    <!-- Sidebar Navigation Menu -->
    <a-menu theme="light" mode="inline">
      <a-menu-item class="menu-item-header">
        {{ $t("sidebar.functions") }}
      </a-menu-item>
      <a-menu-item>
        <router-link to="/layout">
          <span class="icon">
            <a-icon type="appstore" theme="filled" />
          </span>
          <span class="label">{{ $t("sidebar.projects") }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/analytics">
          <span class="icon">
            <a-icon type="fund" theme="filled" />
          </span>
          <span class="label">{{ $t("sidebar.analytics") }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/ai-predictions">
          <span class="icon">
            <a-icon type="sliders" theme="filled" />
          </span>
          <span class="label">{{ $t("sidebar.ai-predictions") }}</span>
        </router-link>
      </a-menu-item>

      <a-menu-item class="menu-item-header">
        {{ $t("sidebar.administration") }}
      </a-menu-item>
      <a-menu-item>
        <router-link to="/database">
          <span class="icon">
            <a-icon type="database" theme="filled" />
          </span>
          <span class="label">{{ $t("sidebar.database") }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/app">
          <span class="icon">
            <a-icon type="control" theme="filled" />
          </span>
          <span class="label">{{ $t("sidebar.app") }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/docs">
          <span class="icon"><a-icon type="copy" theme="filled" /> </span>
          <span class="label">{{ $t("sidebar.docs") }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
    <!-- / Sidebar Navigation Menu -->
  </a-layout-sider>
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

    // Main sidebar color.
    sidebarColor: {
      type: String,
      default: "primary",
    },

    // Main sidebar theme : light, white, dark.
    sidebarTheme: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {
      //sidebarCollapsedModel: this.sidebarCollapsed,
    };
  },
};
</script>

<style scoped>
.anticon {
  margin: 0 auto;
  font-size: 20px;
}
</style>
