<template>
  <div>
    <baidu-map class="map" :center="center" @ready="handler" :style="{height:mapHeight}" :zoom="20">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :enableGeolocation="true"></bm-navigation>
      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label  :content="content" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>
  export default {
    created(){
      this.mapHeight = document.body.scrollHeight + 'px'
    },
    data () {
      return {
        center: {lng: 0, lat: 0},
        mapHeight: '960px',
        content:''
      }
    },
    methods: {
      handler ({BMap, map}) {
        this.center.lng = this.$route.query.lng;
        this.center.lat = this.$route.query.lat;
        this.content = this.$route.query.name;
      }
    }
  }
</script>
<style lang="less" scoped>
  .map {
    width: 100%;
  }
</style>
