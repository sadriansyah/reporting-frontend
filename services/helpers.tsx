import axios from 'axios';
var status = '';
var result = [];

export function getCookieToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; tm_access_token=`);
  return parts[1];
}

export async function getUserLog(){
  const token = getCookieToken();
  const data = await axios({
    url:process.env.API_LINK+"auth/user-log",
    method:'GET',
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    status = res.status;
    result = res.data;
  }).catch((e) => {
    status = e.response.status;
    result = e.response.data.message;
  });
  return {
    status:status,
    result:result
  }
}

export async function getData(link:string):Promise<any>{
  const token = getCookieToken();
  var url = process.env.API_LINK+link;
  const data = await axios({
    url:url,
    method:'GET',
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    status = res.status;
    result = res.data;
  }).catch((e) => {
    status = e.response.status;
    result = e.response.data.message;
  });

  return {
    status:status,
    result:result
  }
}

export async function postData(payload:any,link:string):Promise<any> {
  const token = getCookieToken();
  const post = await axios({
    method:'POST',
    url:process.env.API_LINK+link,
    headers:{
      Authorization: `Bearer ${token}`
    },
    data:payload
  }).then((res) => {
    status = res.status;
    result = res.data;
  }).catch((e) => {
    status = e.response.status;
    result = e.response.data.message
  });
  return {
    status:status,
    result:result
  }
}

export async function deleteData(payload:any, link:string):Promise<any> {
  const token = getCookieToken();
  const hapus = await axios({
    method:'POST',
    url:process.env.API_LINK+link,
    headers:{
      Authorization : `Bearer ${token}`
    },
    data:payload
  }).then((res) => {
    status = res.status;
    result = res.data
  }).catch((e) => {
    status =  e.response.status;
    result = e.response.data.message;
  });
  return {
    status:status,
    result:result
  }
}

export async function generateFileMom(url:string){
  const send = await axios({
    method:'GET',
    url:url
  }).then((res) => {
    status = res.status;
    result = res.data;
  }).catch((e) => {
    status = e.response.status;
    result = e.response.data.message;
  });
  return {
    status:status,
    result:result
  }
}


export async function editData(payload:any, link:string):Promise<any> {
  const token = getCookieToken();
  const edit =  await axios({
    method:'PUT',
    url:process.env.API_LINK+link,
    headers:{
      Authorization: `Bearer ${token}`
    },
    data:payload
  }).then((res) => {
    status = res.status;
    result = res.data;
  }).catch((err) => {
    status = err.response.status;
    result = res.response.data.message;
  });
  return {
    status:status,
    result:result
  }
}

export function showingtime(date:string) {
  var now = new Date(date);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  if (month.toString().length == 1) {
      month = '0' + month;
  }
  if (day.toString().length == 1) {
      day = '0' + day;
  }
  if (hour.toString().length == 1) {
      hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
      minute = '0' + minute;
  }

  var dateTime = year + '-' + month + '-' + day;
  return dateTime;
}

export function showingdate(date:string) {
  var now = new Date(date);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  if (month.toString().length == 1) {
      month = '0' + month;
  }
  if (day.toString().length == 1) {
      day = '0' + day;
  }
  if (hour.toString().length == 1) {
      hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
      minute = '0' + minute;
  }

  var dateTime = day + ' ' + monthNames[month-1] + ' ' + year;
  return dateTime;
}

export function showday(date:string) {
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var d = new Date(date);
  var dayName = days[d.getDay()];
  return dayName;
}
