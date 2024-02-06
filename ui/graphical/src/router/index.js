import { createWebHistory, createRouter } from 'vue-router';
import Calibration from '@/views/Calibration.vue';
import Verification from '@/views/Verification.vue';
import Measurement from '@/views/Measurement.vue';


const routes = [
    {
        path: '/',
        redirect: '/calibration'
    },
  {
    path: '/calibration',
    name: 'Calibration',
    component: Calibration
  },
  {
    path: '/verification',
    name: 'Verification',
    component: Verification
  },
  {
    path: '/measurement',
    name: 'Measurement',
    component: Measurement
  },

  
  

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),       
    routes,
    stringifyQuery: queryStringify
})

function queryStringify(query){
    let query_string = '';
    let encoded_query = encodeQuery(query)
    //console.log(encoded_query)
    let keys = Object.keys(encoded_query);
    let index = 0;
    keys.forEach(key => {
        let new_string = ''
        if(index != 0){
            new_string += '&'
        }
        new_string += key 
        new_string += '=' 
        new_string += encoded_query[key]

        query_string += new_string;
        index += 1;
    })
    //console.log(query_string);
    return query_string;
}

function hasQueryParams(route) {
    return !!Object.keys(route.query).length
  }

  function encodeQuery(query){
    let new_query = {}
    let keys = Object.keys(query);
    keys.forEach(key => {
        //console.log(query[key])
        //let decoded_value = decodeURI(query[key])
        //console.log(decoded_value)
        let encoded_value = encodeURIComponent(query[key])
        //console.log(encoded_value)
        new_query[key] = encoded_value;
    })

    return new_query;
  }

  router.beforeEach((to, from, next) => {
    if(!hasQueryParams(to) && hasQueryParams(from)){
     next({name: to.name, query: from.query});
   } else {
     next()
   }
 })

export default router
