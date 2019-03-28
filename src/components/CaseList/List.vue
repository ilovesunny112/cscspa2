<template>
  <ul>
    <li v-for="(item, index) in caseArr" :key="index" :style="styleObj">
      <case-item  :case-obj="item"  ></case-item>
    </li>
     
  </ul>
</template>

<script>
import CaseItem from './CaseItem.vue'

export default {
  props:{
    limit: {
      type:Number
    },
    curPage: {
      type:Number,
      validator:function(val){
        console.log(val)
        console.log(typeof val)
        return typeof val == "number" && val>0
      }
    },
    caseArr:{
      type:Array,
      required:true
    },
    colomn:{
      type:Number
    }
  },
  components:{
    CaseItem
  },
  computed:{
    styleObj(){
      if(this.colomn == 4){
        return {
          width:'23%',
          marginLeft:"2%"
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
 ul{
    overflow: hidden;
    padding:4px 5px;

     li{
        display: table-cell;
         width: 31%;   
         float: left;
         margin-left: 3%;
         margin-bottom: 5%;
         box-shadow: 0px 0px 4px #c1c1c1;
     }

     li:nth-child(3n+1){
       margin-left: 0;
     }
     li:nth-child(3n){
       margin-right: 0;
     }

 }
</style>


