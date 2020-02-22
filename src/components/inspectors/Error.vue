<template>
  <b-alert variant="danger" show>
    {{ message }}
  </b-alert>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>
