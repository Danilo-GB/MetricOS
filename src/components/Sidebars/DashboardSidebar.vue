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
    <div class="brand">
      <img src="images/logo-ct-black.png" alt="" /> <span>Metric OS</span>
    </div>
    <hr />

    <!-- Sidebar Navigation Menu -->
    <a-menu theme="light" mode="inline">
      <a-menu-item class="menu-item-header"> Functions </a-menu-item>
      <a-menu-item>
        <router-link to="/dashboard">
          <span class="icon">
            <a-icon type="appstore" theme="filled" />
          </span>
          <span class="label">Projects</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/tables">
          <span class="icon">
            <a-icon type="fund" theme="filled" />
          </span>
          <span class="label">Analytics</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/billing">
          <span class="icon">
            <a-icon type="sliders" theme="filled" />
          </span>
          <span class="label">Ai predictions</span>
        </router-link>
      </a-menu-item>

      <a-menu-item class="menu-item-header"> Administration </a-menu-item>
      <a-menu-item>
        <router-link to="/profile">
          <span class="icon">
            <a-icon type="database" theme="filled" />
          </span>
          <span class="label">Database</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/sign-in">
          <span class="icon">
            <a-icon type="control" theme="filled" />
          </span>
          <span class="label">App</span>
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/sign-up">
          <span class="icon">
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>duplicate</title>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Tables"
                  transform="translate(-58.000000, -507.000000)"
                  fill="#BFBFBF"
                  fill-rule="nonzero"
                >
                  <g id="sidebar" transform="translate(33.000000, 43.000000)">
                    <g
                      id="sign-up"
                      transform="translate(16.000000, 455.000000)"
                    >
                      <g
                        id="duplicate"
                        transform="translate(9.000000, 9.000000)"
                      >
                        <path
                          d="M4,6 C4,4.89543 4.89543,4 6,4 L12,4 C13.1046,4 14,4.89543 14,6 L14,12 C14,13.1046 13.1046,14 12,14 L6,14 C4.89543,14 4,13.1046 4,12 L4,6 Z"
                          id="Path"
                        ></path>
                        <path
                          d="M2,0 C0.89543,0 0,0.89543 0,2 L0,8 C0,9.1046 0.89543,10 2,10 L2,4 C2,2.8954305 2.8954305,2 4,2 L10,2 L10,2 C10,0.89543 9.1046,0 8,0 L2,0 Z"
                          id="Path"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span class="label">Docs</span>
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
      // sidebarCollapsedModel: this.sidebarCollapsed,
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
