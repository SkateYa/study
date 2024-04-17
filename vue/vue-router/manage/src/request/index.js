
import qs  from 'qs'
import axios from 'axios'

function getUserRouter(uid){
  return axios({
    url:'http://localhost:3000/user_router_auth',
    method:'post',
    header:{
        'content-type':'application/x-www-form-urlencoded'
    },
    data:qs.stringify({uid})
  }).then(res=>{
    return res.data
  }).catch(err=>{
    throw err
  })
}

export {
    getUserRouter
}

