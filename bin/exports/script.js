module.exports = function scriptTag(viewbox) {
return `<script>
export default {
  data() {
    return {
      viewbox: '${viewbox}',
    };
  },
  mounted() {
    this.$emit('onMounted', this.viewbox);
  },
};
</script>`
};