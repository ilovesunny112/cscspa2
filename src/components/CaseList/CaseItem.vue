<template>
  <div class="item">
    <div class="stage">
      <div class="front">
        <div class="logo">
          <img :src="`https://www.microsoft.com/china/casestudies/CaseImages/logos/${caseObj.logoImg}`" alt="">
        </div>
        <div class="title">
          <h4>{{caseObj.caseTitle}}</h4>
        </div>
      </div>
      <div class="back">
        <div class="intro">
          <p>
            {{caseObj.intro}}
          </p>
          <a href="javascript:;" class="more">了解详情</a>
        </div>
      </div>

    </div>
    <div class="meta">
      <div class="industry">
        <a href="javascript:;" v-for="(val, idx) in indArr" :key="idx">{{val}} ,</a>
      </div>
      <div class="solution">
        <a href="javascript:;" v-for="(val, idx) in solutionArr" :key="idx">{{val}} ,</a>

      </div>
    </div>
    <div class="sharetool">
      <div class="share fl">
        <i class="weibo"></i>
        <i class="wechat"></i>
      </div>

      <div class="video fr">
        <i class="play"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    caseObj:{
      type:Object,
      required:true
    }
  },
  created(){
    
  },
  computed:{
    solutionArr(){
      let arr = this.caseObj.products.split("，")
      return arr;
    },
    indArr(){
      let arr = this.caseObj.industry.split("，")
      return arr;
    }
  }
}
</script>
<style lang="less" scoped>
      .item{

        .stage{ 
         height: 276px;
         cursor: pointer;
         position: relative;

         .front, 
         .back{
           position: absolute;
           transform-style: preserve-3d;
           backface-visibility: hidden;
           transition: all .5s;
         }

         .front{
           transform: rotateY(0deg);

           .logo{
             width:80%;
             margin: 0 auto;
             margin-top: 15px;
             img{
               width: 100%;
             }
           }
           .title{
             padding:12px;
             line-height: 24px;
             font-size: 12px;;
           }
         }
         .back{
           transform: rotateY(180deg);
           background: #d7dfe0;

           .intro{
             padding: 18px;           
             p{
               line-height: 20px;
               font-size: 14px;
               height: 220px;
             }

             a.more{
               margin-top: 16px;
               display: inline-block;
               font-size: 14px;
               color: #0072c2;
               text-decoration: underline;
             }
           }
         }


      
        }

        .meta{
          padding: 10px;

          a:link,
          a:visited,
          a:hover,
          a:active{
            color:#0000ee;
            font-size: 12px; 
            line-height: 14px;
          }

          .industry,
          .solution{
            padding:10px 0;
          }

          .solution{
            height: 52px;
            max-height: 52px;
          }
        }


        .sharetool{
          height: 46px;
          overflow: hidden;
          .share{
            overflow: hidden;

            i{
              float: left;
              cursor: pointer; 
              margin-left: 10px;
              display: block;
              width: 30px;
              height: 30px;
              opacity: .7;
              transition: all .6s;
            }

            i:hover{
              opacity: 1;
            }
            .weibo{
              
              background: url('../../assets/images/weibo.png') no-repeat;
            }
            .wechat{
              background: url('../../assets/images/wechat.png') no-repeat
            }

          }
          .video{
            .play{
              width: 30px;
              height: 30px;
              margin-right: 10px;
              display: block;
              cursor: pointer;
              opacity: .7;
              transition: all .6s;
              background: url('../../assets/images/play.png') no-repeat;

              &:hover{
                opacity: 1;
              }
            }
            
          }
        }
        &:hover{
           .front{
           transform: rotateY(-180deg)
          }
          .back{
            transform: rotateY(0deg)
          }
        }

}
</style>

