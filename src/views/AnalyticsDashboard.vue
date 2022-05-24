<template>
  <div class="mb-24">
    <!-- Floating Action Button For Toggling -->
    <a-button class="fab" shape="circle" @click="stcomponentsStore.toggleModal">
      <a-icon type="plus" />
    </a-button>
    <AnalyticsComponentCreator></AnalyticsComponentCreator>
    <!-- / Floating Action Button For Toggling -->
    <div class="border-gray-6">
      <grid-layout
        :layout="stcomponentsStore.layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :margin="[10, 10]"
      >
        <grid-item
          v-for="item in stcomponentsStore.layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @moved="moveComponent"
          @resized="resizeComponent"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".no-drag"
          style="touch-action: none"
          class="grid-chart-item"
        >
          <div>
            <div class="vue-draggable-handle"></div>

            <a-card
              v-if="item.type == 'text'"
              :bordered="false"
              class="card-profile-head mt-10"
            >
              <template #title>
                <a-row type="flex" align="middle">
                  <a-col :span="24" :md="12" class="col-info">
                    <a-avatar
                      :size="74"
                      shape="square"
                      src="https://img.freepik.com/vector-gratis/analisis-rendimiento-empresarial-graficos_53876-66260.jpg?t=st=1653351012~exp=1653351612~hmac=50c64c2edafbeb5a249f9ab6f61aee1ede0ae777ed19f6cbe7a75316f37c72db&w=740"
                    />
                    <div class="avatar-info">
                      <h4 class="font-semibold m-0">
                        {{ $t("demostration") }}
                      </h4>
                    </div>
                  </a-col>
                </a-row>
              </template>
            </a-card>
            <a-card :bordered="false" class="widget-1" v-else>
              <a-statistic
                :title="item.title"
                :value="item.metric"
                :prefix="item.prefix"
                :suffix="item.sufix"
              >
              </a-statistic>
              <a-icon type="pie-chart" class="icon" />
            </a-card>
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import VueGridLayout from "vue-grid-layout";
import { useStcomponentsStore } from "../store/useStComponentsStore";
import AnalyticsComponentCreator from "../components/Modals/AnalyticsComponentCreator.vue";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    AnalyticsComponentCreator,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useStcomponentsStore),
  },
  methods: {
    moveComponent(i, newX, newY) {
      var formdata = new FormData();
      formdata.append("parentId", this.$route.params.id);
      formdata.append("i", i);
      formdata.append("newX", newX);
      formdata.append("newY", newY);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/move-st-component",
        requestOptions
      ).catch((error) => console.log("error", error));
    },
    resizeComponent(i, newH, newW) {
      var formdata = new FormData();
      formdata.append("parentId", this.$route.params.id);
      formdata.append("i", i);
      formdata.append("newH", newH);
      formdata.append("newW", newW);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "http://localhost/metric_os_services/public/metric-os-api/resize-st-component",
        requestOptions
      ).catch((error) => console.log("error", error));
    },
  },
  mounted() {
    this.stcomponentsStore.readComponents(this.$route.params.id);
  },
};
</script>

<style>
.grid-chart-item {
  touch-action: none;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  padding: 0 8px 8px 0;
  background-origin: content-box;
  background-color: rgb(0, 195, 255);
  box-sizing: border-box;
  border-radius: 0 0 20px;
  cursor: pointer;
}
.vue-grid-item.vue-grid-placeholder {
  background: none;
}
</style>
