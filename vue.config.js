module.exports = {
  publicPath:"/china/casestudies/spa/",
  devServer:{
    proxy:{
      "/china/casestudies/spa/api":{
        target:"https://www.microsoft.com",
        // changeOrigin:true
      }
    }
  }
}

// http://localhost:8080/china/casestudies/spa/api/info/solutions/22222/hjklh