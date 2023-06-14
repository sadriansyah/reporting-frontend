import axios from 'axios';

export async function login(payload:any):Promise<any>{
  const {email, password} = payload;
  var verifyLogin = false
  var status = "";
  var message = "";

  await axios({
    method:'POST',
    url:process.env.API_LINK+"auth/login",
    data:{
      email:email,
      password:password
    }
  }).then((res) => {
    console.log(res);
    status = res.status;
    message = JSON.stringify(res.data);
  }).catch((e) => {
    // console.log(e)
    status = e.response.status;
    message = e.response.data.message;
  });
  return {
    status:status,
    message:message
  }
}
