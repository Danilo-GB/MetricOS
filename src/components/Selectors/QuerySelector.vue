<template>
  <div>
    <a-row type="flex" align="start">
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.2.about`)
        }}</span></a-col
      >
      <a-col :span="8">
        <a-input
          :addon-before="$t('query.select')"
          :placeholder="$t('query.data')"
        />
      </a-col>
      <a-col :span="8">
        <a-input
          :addon-before="$t('query.from')"
          :placeholder="$t('query.table')"
        />
      </a-col>
      <a-col :span="8">
        <a-input
          :addon-before="$t('query.where')"
          :placeholder="$t('query.condition')"
        />
      </a-col>
      <a-col :span="8">
        <a-input
          :addon-before="$t('query.having')"
          :placeholder="$t('query.condition')"
        />
      </a-col>
      <a-col :span="8">
        <a-input
          :addon-before="$t('query.group-by')"
          :placeholder="$t('query.condition')"
        />
      </a-col>
      <a-col :span="8">
        <a-input
          :addon-before="$t('query.order-by')"
          :placeholder="$t('query.condition')"
        />
      </a-col>
      <a-col :span="24" class="mt-10">
        <a-button>{{ $t("button.test") }}</a-button>
      </a-col>
      <a-col :span="24" class="my-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.2.data-preview`)
        }}</span></a-col
      >
      <a-col :span="24" class="mb-20"
        ><span class="text-item-header">{{
          $t(`modal.steps.2.waiting-query`)
        }}</span></a-col
      >
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    stepId: {
      type: Number,
      default: "",
    },
  },
};
</script>

<style></style>
