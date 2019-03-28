 let axios = require('axios')
 
 async function getSolutionListAsync(){
  return axios.get('/china/casestudies/spa/api/info/solutions')
 }

 async function getIndustryListAsync(){
  return axios.get('/china/casestudies/spa/api/info/industries')
 }

 export async function getAllMetaData(){
  let requestArr = [getSolutionListAsync(), getIndustryListAsync()]

  return Promise.all(requestArr)
 }


 export async function getListByPage( num = 1){
  return axios.get(`/china/casestudies/spa/api/case/p/${num}`)
 }
 

 export async function getCaseById(id){
   return axios.get(`/china/casestudies/spa/api/case/${id}`)
 }