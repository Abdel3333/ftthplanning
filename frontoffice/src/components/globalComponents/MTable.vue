<template>
  <div class="v-table" v-if="columns.length > 0">
    <table :class="['table table-fixed w-full p-4', vTableClass.tableClass]">
      <thead>
        <tr>
          <template v-for="(column, index) of tableHeaderColumns">
            <template v-if="column.visible">
              <template v-if="isSpecialColumn(column.name)">
                <th
                  v-if="specialColumnIs(column.name, '__slot')"
                  :key="index"
                  :class="[
                    'v-table-th-' + extractName(column.name),
                    columnALignement(column),
                    column.titleClass
                  ]"
                  :style="{ width: column.width }"
                  v-html="titleRender(column)"
                ></th>
              </template>
              <th
                v-else
                :key="index"
                :class="[column.titleClass, columnALignement(column)]"
                :style="{ width: column.width }"
                v-html="titleRender(column)"
              ></th>
            </template>
          </template>
        </tr>
      </thead>

      <tbody>
        <template v-if="!loading">
          <template v-for="(rowData, l) of tableBodyRowsData">
            <tr :class="setRowClass(rowData, l)" :key="l">
              <template v-for="(column, c) of tableHeaderColumns">
                <template v-if="column.visible">
                  <template v-if="isSpecialColumn(column.name)">
                    <td
                      v-if="specialColumnIs(column.name, '__slot')"
                      :key="c"
                      :class="[columnALignement(column), column.dataClass]"
                    >
                      <slot
                        :name="extractName(column.name)"
                        :data="rowData"
                        :rowData="rowData"
                        :rowIndex="l"
                      >
                        <div
                          v-html="
                            column.transform
                              ? column.transform(rowData, column)
                              : getObjectValue(rowData, extractName(column.name))
                          "
                        ></div>
                      </slot>
                    </td>
                  </template>
                  <td
                    v-else
                    :key="c"
                    :class="[columnALignement(column), column.dataClass]"
                    v-html="
                      column.transform
                        ? column.transform(rowData, column)
                        : getObjectValue(rowData, column.name)
                    "
                  ></td>
                </template>
              </template>
            </tr>
            <template v-if="useRowDetail">
              <transition name="rowDetailTransition" :key="l">
                <tr
                  v-if="isVisibleRowDetail(l)"
                  :class="vTableClass.rowDetailClass"
                  @click="onRowDetailClick(rowData, $event)"
                >
                  <td :colspan="visibleColumnLenght">
                    <component
                      :is="detailRowComponent"
                      :fields="tableHeaderColumns"
                      :rowData="rowData"
                      :rowIndex="l"
                    ></component>
                  </td>
                </tr>
              </transition>
            </template>
          </template>
        </template>
        <transition name="fade" mode="out-in">
          <!-- Loading area -->
          <template v-if="displayLoading">
            <tr>
              <td :colspan="visibleColumnLenght">
                <slot name="loading">
                  <div class="flex justify-center py-6 text-lg">
                    <div class="dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </slot>
              </td>
            </tr>
          </template>

           <!-- No data Available -->
          <template v-else-if="!displayLoading && tableData.length === 0">
            <tr>
              <td :colspan="visibleColumnLenght">
                <slot name="no-data">
                  <div class="flex flex-col justify-center items-center py-4 text-lg">
                    <img style="height: 300px; width:300px" src="@/assets/svg/norecentactivity.svg" />

                    <div class="my-6" v-html="noData"></div>
                  </div>
                </slot>
              </td>
            </tr>
          </template>
        </transition>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import Axios from "axios";
// import VTableLine from "./VTableLine.vue";
export default {
  // components: { VTableLine },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },

    data: {
      type: [Array, Object],
      default() {
        return [];
      }
    },

    transform: {
      type: Function,
      default(data) {
        return data;
      }
    },

    transformResponseData: {
      type: Function,
      default(data, response) {
        return data;
      }
    },

    loadOnApiMode: {
      type: Function,
      default(parameters) {
        const { url, method, options, request, data } = parameters;
        let makeRequest;
        if (method.toLowerCase() === "post") {
          makeRequest = request[method](url, data, options);
        } else if (method.toLowerCase() === "get") {
          makeRequest = request[method](url, options);
        }
        return makeRequest;
      }
    },

    apiMode: {
      type: Boolean,
      default: false
    },

    showLoader: {
      type: Boolean,
      default: true
    },

    dataPath: {
      type: String,
      default: "data"
    },

    paginationPath: {
      type: String,
      default: ""
    },

    perPage: {
        type: Number,
        default: 10
    },
    initialPage: {
      type: Number,
      default: 1
    },

    apiUrl: {
      type: String,
      default: ""
    },

    httpMethod: {
      type: String,
      default: "get"
    },

    httpRequest: {
      type: [Object, Function],
      default() {
        return Axios;
      }
    },

    httpOptions: {
      type: Object,
      default(){
        return {}
      }
    },

    httpData: {},

    queryParams:{
      type: [Object, Function],
      default(){
        return {
          // sort: 'sort',
          page: 'page',
          perPage: 'perPage'
        }
      }
    },

    appendParams:{
      type: Object,
      default(){
        return {}
      }
    },


    rowKey: {
      type: String,
      default: "id"
    },

    rowClass: {
      type: [String, Function],
      default() {
        return "hover:bg-blueLighter-simple";
      }
    },

    detailRowComponent: {
      type: [String, Object, Function],
      default: undefined
    },

    css: {
      type: Object,
      default() {
        return {
          tableClass: 'bg-white'
        };
      }
    },

    emptyDataMessage: {
      type: String,
      default: "Aucune donnée actuellement disponible"
    }
  },

  data() {
    return {
      tableData: [],
      tablePaginationData: null,
      visibleRowDetails:[],
      loading: false,
      noData: this.emptyDataMessage,
      currentPage: this.initialPage,
    };
  },

  methods: {
    parseColumnFromString(column) {
      const col = {
        ...this.defaultHeaderOptions,
        name: column,
        title: this.titleRender({ name: column })
      };

      return col;
    },

    parseColumnFromObject(column) {
      const col = {
        ...this.defaultHeaderOptions,
        ...column
      };

      return col;
    },

    titleRender(column) {
      return this.getTitle(column);
    },

    getTitle(column) {
      if (typeof column.title === "function") {
        return column.title();
      }

      if (typeof column.title === "undefined") {
        const name = this.isSpecialColumn(column.name)
          ? this.extractName(column.name)
          : column.name;
        return name.indexOf(".") === -1
          ? name.charAt(0).toUpperCase() + name.substr(1)
          : name.replace(".", " ");
      }
      // console.log("column ", column);

      return column.title;
    },

    isSpecialColumn(name) {
      const isSpecialColumn = name.substr(0, 2) === "__";
      // console.log("isSpecialColumn " + name, isSpecialColumn);

      return isSpecialColumn;
    },

    specialColumnIs(specialColumn, field) {
      return this.extractArg(specialColumn) === field;
    },

    extractArg(specialColumn) {
      if (this.isSpecialColumn(specialColumn)) {
        return specialColumn.split(":")[0];
      }
      return specialColumn;
    },

    extractName(specialColumn) {
      if (this.isSpecialColumn(specialColumn)) {
        return specialColumn.split(":")[1];
      }
      return specialColumn;
    },

    isVisibleRowDetail(rowKey) {
      return this.visibleRowDetails.indexOf(rowKey) >= 0;
    },

    toggleRowDetail(rowKey) {
      if (this.isVisibleRowDetail(rowKey)) {
        this.hideRowDetail(rowKey);
      } else {
        this.showRowDetail(rowKey);
      }
    },

    showRowDetail(rowKey) {
      if (!this.isVisibleRowDetail(rowKey)) {
        this.visibleRowDetails.push(rowKey);
      }
    },

    hideRowDetail(rowKey) {
      if (this.isVisibleRowDetail(rowKey)) {
        const index = this.visibleRowDetails.indexOf(rowKey);
        this.visibleRowDetails.splice(index, 1);
      }
    },

    onRowDetailClick(row, event) {
      this.fireEvent("row-detail-click", row, event);
    },

    fireEvent(name, ...args) {
      console.log("name ", name);
      console.log("args ", args);

      this.$emit(name, args);
    },

    setRowClass(row, index) {
      return typeof this.rowClass === "function"
        ? this.rowClass(row, index)
        : this.rowClass;
    },

    getObjectValue(object, path, throwError= false) {
      path = path.trim();
      let value;
      if (!path) {
        return;
      }

      if (path.indexOf(".") === -1) {
        if (
          typeof object === "object" &&
          object[path] !== undefined &&
          object[path] !== null
        ) {
          value = object[path];
        } else {
          // console.log(` typeof object !== "object" ${typeof object !==
          //   "object"} \n
          // object[path] !== undefined ${object[path] !== undefined} \n
          // object[path] !== null ${object[path] !== null} \n
          // `);

          // console.warn(
          //   `VTable: object is not object or has no property ${path} for object \n`,
          //   object
          // );
          if (throwError) {
           console.error(`VTable: object is not object or has no property ${path} for object \n`,object)
          }
          return;
        }
      } else {
        const keys = path.split(".");
        value = object;
        keys.forEach((key, i) => {
          if (
            value !== null &&
            value !== undefined &&
            typeof value[key] !== undefined &&
            value[key] !== null
          ) {
            value = value[key];
          } else {
            const currentPath = keys.slice(0, i + 1).toString();
            if (throwError) {
              console.warn(
                `VTable: object is not defiened or has no property ${currentPath} for object \n`,
                object
              );
            }
            return;
          }
        });
      }
      // console.log("VTable column value____ ", value);

      return value;
    },

    columnALignement(column) {
      let align = "";
      switch (column.align) {
        case "center":
          align = "text-center";
          break;
        case "left":
          align = "text-left";
          break;
        case "right":
          align = "text-right";
          break;
      }
      return align;
    },

    refresh() {
      console.log("refresh table ");

      this.visibleRowDetails = [];
      this.tableData = [];
      this.loadData();
    },

    loadData () {
      //
      if (!this.isApiMode) {
        this.loadOnDataMode(this.data);
      } else {
        if (!this.apiUrl) {
          console.warn("VTable: apiUrl not defined on apiMode ");
        }
        this.httpOptions['params'] = this.getParams(this.getDefaultQueryParams())
        const options = {
          url: this.apiUrl,
          method: this.httpMethod,
          data: this.httpData,
          options: this.httpOptions,
          request: this.httpRequest
        };

        this.loading = true;
        this.$emit("loading");
        this.loadOnApiMode(options)
          .then((response) => {
            this.$emit("load-success", response.data);
            // console.log("VTable: response : ", response);

              const responseData = this.transformResponseData(response.data, response)
              if (Array.isArray(responseData)) {
                this.tableData = this.transform(responseData);
                this.$emit('loaded')
              } else {
                const data = this.transform(responseData);
                this.tableData = this.getObjectValue(data, this.dataPath, true); //Throw warning in this cas
                if (this.paginationPath) {
                  this.tablePaginationData = this.makePagination(this.getObjectValue(data, this.paginationPath)); //Throw warning in this cas
                  console.log('loadOnApiMode --> tablePaginationData: ', this.tablePaginationData);

                }
                this.$nextTick(() => {
                  if (this.paginationPath) {
                    this.$emit('pagination-data', this.tablePaginationData)
                  }
                  this.$emit('loaded')
                })
              }
          })
          .catch((error) => {
            //
            console.log('VTable: error : ',error);
            this.loadError(error);
          })
          .finally(() => {
            this.loading = false;
            // console.log('VTable: finally loading : ',this.loading);
          });
      }
    },

    getParams(params){
      for (const appendParam in this.appendParams) {
        params[appendParam] = this.appendParams[appendParam]
      }
      return params
    },

    getDefaultQueryParams(){
      let params= {}

      if (typeof this.queryParams === 'function') {
        params = this.queryParams(this.currentPage, this.perPage)
        return params && typeof params === 'object' ? params : {}
      }
      params[this.queryParams.page] = this.currentPage;
      params[this.queryParams.perPage] = this.perPage;

      return params
    },

    loadOnDataMode(responseData) {
      this.$emit('loading');

      if (Array.isArray(responseData)) {
        this.tableData = this.transform(responseData);
        this.$emit('loaded')
      } else {
        const data = this.transform(responseData);
        this.tableData = this.getObjectValue(data, this.dataPath, true); //Throw warning in this cas
        if (this.paginationPath) {
          this.tablePaginationData = this.makePagination(this.getObjectValue(data, this.paginationPath))
        }
      }
      this.$nextTick(() => {
        if (this.paginationPath) {
          this.$emit('pagination-data', this.tablePaginationData)
        }
        this.$emit('loaded')
      })
    },

    parseTableHeaderColumns(columnData){
      //
      const columns = [];
      if (columnData.length > 0) {
        columnData.forEach(column => {
          if (typeof column === "string") {
            columns.push(this.parseColumnFromString(column));
          }
          if (typeof column === "object") {
            columns.push(this.parseColumnFromObject(column));
          }
        });
      }
      // console.log("Table columns ", columns);

      return columns;
    },

    loadError(response) {
      this.noData = `<div class="text-error text-lg font-bold" >${response}</div>`;
      this.$emit("load-error", response);
      this.$emit("loaded");
    },

    setEmptyDataMessage(message){
      this.noData = message
    },

    changePage (page) {
      console.log('VTable: change page ', page);

      if (page === 'prev') {
        this.gotoPreviousPage()
      } else if (page === 'next') {
        this.gotoNextPage()
      } else {
        this.gotoPage(page)
      }
    },

    gotoPreviousPage(){
      if (this.currentPage > 1) {
        this.currentPage--
        this.loadData()
      }
    },

    gotoNextPage(){

      if (this.tablePaginationData !== null && this.tablePaginationData.lastPage) {
        if (this.currentPage < this.tablePaginationData.lastPage) {
          this.currentPage++
          this.loadData()
        }
      }else {
        console.warn('VTable: gotoNextPage tablePaginationData is possibly undefined');
      }
    },

    gotoPage(page){
      // console.log('tablePaginationData: ', this.tablePaginationData);

      if (this.tablePaginationData !== null && this.tablePaginationData.lastPage) {
        if (page != this.currentPage && (page > 0 && page <= this.tablePaginationData.lastPage)) {
          this.currentPage = page
          this.loadData()
        }
      }else {
        console.warn('VTable: gotoPage tablePaginationData is possibly undefined');
      }
    },

    makePagination(paginationData){
      if (paginationData === null || paginationData === undefined) {
        console.warn('VTable: pagination data is null');
        return null;
      }
      const pagination = {
        total: paginationData.total || 0,
        totalPage: paginationData.totalPage || Math.ceil((paginationData.totalPage || 1) / (paginationData.perPage || 1)),
        lastPage: paginationData.totalPage || Math.ceil((paginationData.totalPage || 1) / (paginationData.perPage || 1)),
        perPage: paginationData.perPage || this.perPage,
        currentPage: paginationData.currentPage || this.currentPage
      }
      return pagination
    }
  },

  watch: {
    apiUrl(val) {
      if (this.apiMode) {
        this.loadData();
      }
    },

    apiMode(val, old) {
      if (val !== old) {
        this.loadData();
      }
    },

    data(val,old){
      console.log('VTable: data change');
      this.loadData()
    },
    emptyDataMessage(val){
      this.setEmptyDataMessage(val)
    }
  },

  computed: {
    tableHeaderColumns(){
      return this.parseTableHeaderColumns(this.columns);
    },

    useRowDetail() {
      // console.log("$parent ", this.$parent);
      // console.log("typeof detailRowComponent", typeof this.detailRowComponent);
      // console.log("useRowDetail", !!this.detailRowComponent);

      return !!this.detailRowComponent;
    },

    visibleColumnLenght() {
      const columns = this.tableHeaderColumns;
      return columns.reduce((acc, column) => (column.visible ? ++acc : acc), 0);
    },

    tableBodyRowsData() {
      // console.log("Table data ", this.tableData);

      return this.$data.tableData;
    },

    vTableClass(){
      return {
        ...this.css
      };
    },

    displayLoading() {
      return this.showLoader && this.$data.loading;
    },

    isApiMode() {
      return this.apiMode;
    },

    defaultHeaderOptions() {
      const THeaderOptions= {
        name: "",
        width: "auto",
        center: false,
        align: "left",
        visible: true,
        titleClass: "p-3 font-bold text-sm text-inkDark border-b border-borderColor",
        dataClass: "pl-4"
      };

      return THeaderOptions;
    }
  },
  mounted() {
    this.loadData();
    // console.log("VTable: mounted___");
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active{
  transition: all .4s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.dots {
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.dots div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #4661B9;;
  animation: fade 1.5s ease-in-out alternate infinite;
}

.dots div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.dots div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}


</style>