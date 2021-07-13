<template>
  <div :style="`height: ${mapHeight}`">
    <l-map 
      :zoom.sync="zoom"
      :options="mapOptions"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="mapCenter">
      <l-control-layers
        :position="layersPosition"
        :collapsed="true"
        :sort-layers="true"
      />
      <l-tile-layer :url="url"></l-tile-layer>
      <!-- <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :token="token"
        layer-type="base"
      /> -->
      <l-control-zoom :position="zoomPosition" />
      <l-control-attribution
        :position="attributionPosition"
        :prefix="attributionPrefix"
      />
      
      <l-marker :lat-lng="[nroData.lat,nroData.lon]">
        <l-icon
          :icon-size="[31, 46]"
          :icon-anchor="[15.5, 42]"
          icon-url="https://api.geoapify.com/v1/icon/?type=material&color=red&size=xx-large&icon=rss_feed&iconSize=large&apiKey=9d7a9a795561417885e92f53d7ee06c1"
        />
      </l-marker>

      <l-marker draggable :lat-lng="[sroData.lat,sroData.lon]">
        <l-icon
          :icon-size="[51, 66]"
          :icon-anchor="[25, 55]"
          icon-url="https://api.geoapify.com/v1/icon/?type=material&color=green&size=xx-large&icon=shuffle&iconSize=large&apiKey=9d7a9a795561417885e92f53d7ee06c1"
        />
      </l-marker>
      
      <l-layer-group 
        layer-type="overlay"
        name="Maisons">

        <l-marker v-for="home in planning.homesData" :key="home.id" :lat-lng="[home.lat, home.lon]">
          <l-icon
            :icon-size="[31, 46]"
            :icon-anchor="[15.5, 42]"
            icon-url="https://api.geoapify.com/v1/icon/?type=material&color=%233e9cfe&size=xx-large&icon=home&iconSize=large&apiKey=9d7a9a795561417885e92f53d7ee06c1"
          />
          <l-tooltip :options="{ permanent: false, interactive: true }">
            <div @click="innerClick">
              <span>lat: {{home.lat}}, lon: {{home.lon}}</span>
              <p >{{home.distance}} m</p>
            </div>
          </l-tooltip>
        </l-marker>
        
      </l-layer-group>

      <l-layer-group 
        layer-type="overlay"
        name="branchement">

        <l-polyline v-for="(homePolyline, h) in planning.homesData" :key="h"  :lat-lngs="[homePolyline.route.route]" :color="'green'"></l-polyline>
        
      </l-layer-group>
      
      <div v-if="planning.pboData">
        <l-layer-group 
          layer-type="overlay"
          name="pbo">

          <l-marker v-for="(pbo, p) in planning.pboData" :key="p" :lat-lng="[pbo.lat, pbo.lon]">
            <l-icon
            :icon-size="[31, 46]"
            :icon-anchor="[15.5, 42]"
            icon-url="https://api.geoapify.com/v1/icon/?type=material&color=%23000000&size=xx-large&icon=repeat_one&iconSize=large&apiKey=9d7a9a795561417885e92f53d7ee06c1"
            />
          </l-marker>
        
        </l-layer-group>

        <l-layer-group 
          layer-type="overlay"
          name="dist">

          <l-polyline v-for="(pboPolyline, poly) in planning.pboData" :key="poly"  :lat-lngs="[pboPolyline.route.route]" :color="'black'"></l-polyline>
        
        </l-layer-group>
      </div>
      
      
      <l-polyline @click="changeTransColor" :lat-lngs="[planning.nroData.route.route]" :color="transpColor"></l-polyline>


      <!-- <l-control-zoom position="bottomright"  ></l-control-zoom> -->
    </l-map>
    <div>
      {{ planning.homesData[0]}}
    </div>
  </div>
</template>

<script>

export default {
    props: {
      mapHeight: {
        type: String,
        default: '100vh'
      },
      planning: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    data() {
        return {
            url: /* 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',// */'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
            zoom: 18,
            minZoom: 1,
            maxZoom: 20,
            mapOptions: {
              zoomControl: false,
              attributionControl: false,
              zoomSnap: true,
            },
            layersPosition: 'topright',
            attributionPosition: 'bottomright',
            attributionPrefix: 'Vue2Leaflet',
            zoomPosition: 'topleft',
            tileProviders :[
              {
                name: 'OpenStreetMap',
                visible: true,
                attribution:
                  '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              },
              {
                name: 'OpenTopoMap',
                visible: false,
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution:
                  'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
              },
            ],
            transpColor: 'red'
            /* center: [47.313220, -1.319482],
            polyline: {
              latlngs: [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
              color: 'red'
            } 
            
            osmMap = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM By Abdel</a>',
                    minZoom: 13,
                    maxZoom: 20
                }),
        landMap   = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'données © <a href="http://www.esri.com/">Esri</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM By Abdel</a>',
                    minZoom: 13,
                    maxZoom: 18});
                    */
        }
    },
    computed: {
      mapCenter(){
        return [this.sroData.lat, this.sroData.lon]
      },
      nroData(){
        return this.planning.nroData
      },
      sroData(){
        return this.planning.sroData
      },
      pboData(){
        return this.planning.pboData
      }
    },
    methods: {
      changeTransColor(){
        this.transpColor = 'green'
      }
    },
}
</script>

<style scoped>

</style>