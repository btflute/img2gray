<template>
  <div></div>
</template>

<script>
// @ is an alias to /src
import { TemplateV1 } from "@/components/assignment4/v1";

export default {
  name: "assignment4",
  data() {
    return {
    };
  },
  async mounted() {
    const v1 = new TemplateV1().mounted(this.$el);
    const tmpl = `
                  <div class="newslist">
                      <div class="img" v-if="info.showImage">
                          <img src="{{image}}" />
                      </div>
                      <div class="date" v-if="info.showDate">
                          {{info.name}}
                      </div>
                      <div class="img">
                          {{info.name}}
                      </div>
                  </div>
              `;
    v1.render(tmpl, {
      image: "https://images-na.ssl-images-amazon.com/images/I/81BES%2BtsVvL.png",
      info: { showImage: true, showDate: false, name: "aaa" },
    });
  },
  methods: {
  },
};
</script>

<style lang="less">

</style>
