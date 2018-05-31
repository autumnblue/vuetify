<template>
  <v-container>
    <v-card class="table-card-outside">
      <v-card-text class="table-card-mid">
        <v-text-field
          append-icon="search"
          single-line
          hide-details
          v-model="search"
          :full-width="false"
          class="search-field"
        ></v-text-field>
        <vue-tabs>
          <v-tab title="Favorities" style="background-color: #323c45;">
            <v-card class="table-card-inside">
              <v-data-table
                :headers="headers"
                :items="favData"
                hide-actions
                item-key="symbol"
                :search="search"
                class="text-xs-right"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-right">
                          <span
                            v-bind:class="{ 'star starred': !!(props.item.favorite), 'star unstarred': !(props.item.favorite)}">
                            <span class="star-icon fa fa-star" @click="handleClick(props.item)"/>
                          </span>
                    </td>
                    <td class="text-xs-left">{{ props.item.pair}}</td>
                    <td class="text-xs-left">{{ props.item.price }}</td>
                    <td class="text-xs-right font-percent">{{ props.item.changePercent }}%</td>
                    <td class="text-xs-right">{{ props.item.volume }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab>
          <v-tab title="BTC">
            <v-card class="table-card-inside">
              <v-data-table
                :headers="headers"
                :items="btcData"
                hide-actions
                item-key="symbol"
                :search="search"
                class="text-xs-right"
              >
                <template class="table-card" slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-right">
                          <span
                            v-bind:class="{ 'star starred': !!(props.item.favorite), 'star unstarred': !(props.item.favorite)}">
                            <span class="star-icon fa fa-star" @click="handleClick(props.item)"/>
                          </span>
                    </td>
                    <td class="text-xs-left">{{ props.item.pair}}</td>
                    <td class="text-xs-left">{{ props.item.price }} / $ {{(props.item.price *1000).toFixed(2)}}</td>
                    <td class="text-xs-right font-percent">{{ props.item.changePercent }}%</td>
                    <td class="text-xs-right">{{ props.item.volume }} BTC</td>
                  </tr>

                </template>
              </v-data-table>
            </v-card>
          </v-tab>
          <v-tab title="ETH">
            <v-card class="table-card-inside">
              <v-data-table
                :headers="headers"
                :items="ethData"
                hide-actions
                item-key="symbol"
                :search="search"
                class="text-xs-right"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-right">
                          <span
                            v-bind:class="{ 'star starred': !!(props.item.favorite), 'star unstarred': !(props.item.favorite)}">
                            <span class="star-icon fa fa-star" @click="handleClick(props.item)"/>
                          </span>
                    </td>
                    <td class="text-xs-left">{{ props.item.pair}}</td>
                    <td class="text-xs-left">{{ props.item.price }} / $ {{(props.item.price *1000).toFixed(2)}}</td>
                    <td class="text-xs-right font-percent">{{ props.item.changePercent }}%</td>
                    <td class="text-xs-right">{{ props.item.volume }} ETH</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab>
          <v-tab title="BNB">
            <v-card class="table-card-inside">
              <v-data-table
                :headers="headers"
                :items="bnbData"
                hide-actions
                item-key="symbol"
                :search="search"
                class="text-xs-right"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-right">
                           <span
                             v-bind:class="{ 'star starred': !!(props.item.favorite), 'star unstarred': !(props.item.favorite)}">
                            <span class="star-icon fa fa-star" @click="handleClick(props.item)"/>
                          </span>
                    </td>
                    <td class="text-xs-left">{{ props.item.pair}}</td>
                    <td class="text-xs-left">{{ props.item.price }} / $ {{(props.item.price *10).toFixed(2)}}</td>
                    <td class="text-xs-right font-percent">{{ props.item.changePercent }}%</td>
                    <td class="text-xs-right">{{ props.item.volume }} BNB</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab>
          <v-tab title="USDT">
            <v-card class="table-card-inside">
              <v-data-table
                :headers="headers"
                :items="usdtData"
                hide-actions
                item-key="symbol"
                :search="search"
                class="text-xs-right"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-right">
                          <span
                            v-bind:class="{ 'star starred': !!(props.item.favorite), 'star unstarred': !(props.item.favorite)}">
                            <span class="star-icon fa fa-star" @click="handleClick(props.item)"/>
                          </span>
                    </td>
                    <td class="text-xs-left">{{ props.item.pair}}</td>
                    <td class="text-xs-left">{{ props.item.price }} / $ {{(props.item.price *1).toFixed(2)}}</td>
                    <td class="text-xs-right font-percent">{{ props.item.changePercent }}%</td>
                    <td class="text-xs-right">{{ props.item.volume }} USDT</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-tab>
        </vue-tabs>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import {VueTabs, VTab} from 'vue-nav-tabs'
  //you can also import this in your style tag
  import 'vue-nav-tabs/themes/vue-tabs.css'
  import VueStar from 'vue-star'
  import store from '../store'

  var $ = require('jquery')
  import jsonData from '../assets/jsonData.json'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Pair', align: 'left', sortable: true, value: 'pair'},
          {text: 'Price', align: 'left', sortable: true, value: 'price'},
          {text: '24h Change', align: 'right', sortable: true, value: 'changePercent'},
          {text: '24h Volume', align: 'right', sortable: true, value: 'volume'},
        ],
        search: '',
        allData: [],
        btcData: [],
        ethData: [],
        bnbData: [],
        usdtData: [],
        // favData: [],
        favData: this.$store.state.selectedItem,
        selectedItems: [],
        status: '',
      }
    },
    components: {
      VueTabs,
      VTab,
      VueStar
    },

    mounted() {
      console.log('Hello mounted')
      const that = this
      this.allData = jsonData.map(v => Object.assign({}, {...v}, {pair: '', favorite: false}))
      this.allData.reduce((result, item) => {
        if (item.symbol.includes("BTC")) {
          var txt1 = item.symbol
          var txt2 = txt1.split("BTC")[0] + '/' + 'BTC'
          item = Object.assign({...item}, {pair: txt2, group: 'BTC'})
          that.btcData.push(item)
        } else if (item.symbol.includes("ETH")) {
          var txt1 = item.symbol
          var txt2 = txt1.split("ETH")[0] + '/' + 'ETH'
          item = Object.assign({...item}, {pair: txt2, group: 'ETH'})
          that.ethData.push(item)
        } else if (item.symbol.includes("BNB")) {
          var txt1 = item.symbol
          var txt2 = txt1.split("BNB")[0] + '/' + 'BNB'
          item = Object.assign({...item}, {pair: txt2, group: 'BNB'})
          that.bnbData.push(item)
        } else {
          var txt1 = item.symbol
          var txt2 = txt1.split("USDT")[0] + '/' + 'USDT'
          item = Object.assign({...item}, {pair: txt2, group: 'USDT'})
          that.usdtData.push(item)
        }
        return result
      }, [])
    },
    methods: {

      handleClick(sItem) {
        const that = this
        if(!sItem.favorite && sItem.group === 'BTC') {
          this.btcData.reduce((result, item) => {
            if (item.symbol === sItem.symbol) {
              item.favorite = true
              this.favData.push(sItem)
              store.commit('UPDATE_SELECTED_ITEM', this.favData)
            }
            return result
          }, [])
        } else if(!sItem.favorite && sItem.group === 'ETH'){
          this.ethData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = true
              this.favData.push(item)
              store.commit('UPDATE_SELECTED_ITEM', this.favData)

            }
            return result
          }, [])
        } else if(!sItem.favorite && sItem.group === 'BNB') {
          this.bnbData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = true
              this.favData.push(item)
              store.commit('UPDATE_SELECTED_ITEM', this.favData)

            }
            return result
          }, [])
        } else if(!sItem.favorite && sItem.group === 'USDT') {
          this.usdtData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = true
              this.favData.push(item)
              store.commit('UPDATE_SELECTED_ITEM', this.favData)
            }
            return result
          }, [])
        } else if(sItem.favorite && sItem.group === 'BTC') {
          this.btcData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = false
            }
            return result
          }, [])
        } else if(sItem.favorite && sItem.group === 'ETH') {
          this.ethData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = false
            }
            return result
          }, [])
        } else if(sItem.favorite && sItem.group === 'BNB') {
          this.bnbData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = false
            }
            return result
          }, [])
        } else if(sItem.favorite && sItem.group === 'USDT') {
          this.usdtData.reduce((result, item) => {
            if(item.symbol === sItem.symbol) {
              item.favorite = false
            }
            return result
          }, [])
        } else {
          console.log(this.$store.state.selectedItem.filter(selectedItem => selectedItem.symbol !== sItem.symbol))
          store.commit('UPDATE_SELECTED_ITEM', this.$store.state.selectedItem.filter(selectedItem => selectedItem.symbol !== sItem.symbol))
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .search-field {
    padding: 0;
    position: absolute;
    width: 30%;
    right: 0;
  }

  .table-card-inside {
    max-height: calc(100vh - 420px);
    overflow: auto;
  }

  .table-card-mid {
    max-height: calc(100vh - 340px);
  }

  .table-card-outside {
    background: black;
    max-height: calc(100vh - 320px);
  }

  .text-xs-right {
    color: white;
    font-weight: bolder;
  }

  .text-xs-left {
    color: white;
    font-weight: bolder;
  }

  .font-percent {
    color: greenyellow;
    font-weight: normal;
  }

  body {
    background-color: #1b1b1b;
    overflow: hidden;
  }

  .container {
    display: table;
    margin: 80px auto;
  }

  .star {
    display: block;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }

  .star-icon {
    display: block;
    transition: all .2s ease-in;
    color: #FFFF;
  }

  .starred .star-icon {
    color: #f6c342;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(144deg);
    }
  }

  @keyframes unspin {
    0% {
      transform: rotate(142deg);
    }
    100% {
      transform: rotate(72deg);
    }
  }

  @keyframes hop {
    0% {
      transform: translate(0, 0px);
    }
    17% {
      transform: translate(2px, -10px);
    }
    33% {
      transform: translate(4px, 0px);
    }
    50% {
      transform: translate(-2px, -7px);
    }
    66% {
      transform: translate(-4px, -0px);
    }
    84% {
      transform: translate(-2, -5px);
    }
    100% {
      transform: translate(0, 0px);
    }
  }
</style>
