import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {verify} from './services/jwt_verify_sign';

const secret = process.env.SECRET_KEY;


export default async function middleware(req:NextRequest, res:NextResponse) {
  const {cookies} = req;
  var jwt = cookies.get('tm_access_token');
  const url = req.nextUrl.pathname;
  const login_path = req.nextUrl.clone();
  const home_path = req.nextUrl.clone();
  login_path.pathname = "/login";
  home_path.pathname = "/dashboard";

  const deleteCookie = () => {
    const response = NextResponse.next();
    response.cookies.delete("tm_access_token");
    return NextResponse.redirect(login_path);
  }


  if(req.nextUrl.pathname.startsWith('/dashboard')){
    if(jwt == undefined){
      return NextResponse.redirect(login_path);
    }
    try {
      const onVerif = await verify(jwt.value,secret);
      const response = NextResponse.next();
      if(onVerif == "ERR_JWT_EXPIRED"){
        deleteCookie();
      }
      return response;
    } catch (error) {
      return NextResponse.redirect(login_path);
    }
    return NextResponse.next();
  }

  if(req.nextUrl.pathname.startsWith('/document')){
    if(jwt == undefined){
      return NextResponse.redirect(login_path);
    }
    try {
      const onVerif = await verify(jwt.value,secret);
      const response = NextResponse.next();
      if(onVerif == "ERR_JWT_EXPIRED"){
        deleteCookie();
      }
      return response;
    } catch (error) {
      return NextResponse.redirect(login_path);
    }
    return NextResponse.next();
  }

  if(req.nextUrl.pathname.includes('/project')){
    if(jwt == undefined){
      return NextResponse.redirect(login_path);
    }
    try {
      const onVerif = await verify(jwt.value,secret);
      if(onVerif == "ERR_JWT_EXPIRED"){
        deleteCookie();
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(login_path);
    }
    return NextResponse.next();
  }

  if(req.nextUrl.pathname.startsWith('/department')){
    if(jwt == undefined){
      return NextResponse.redirect(login_path);
    }
    try {
      const onVerif = await verify(jwt.value,secret);
      if(onVerif == "ERR_JWT_EXPIRED"){
        deleteCookie();
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(login_path);
    }
    return NextResponse.next();
  }
  if(req.nextUrl.pathname.startsWith('/users')){
    if(jwt == undefined){
      return NextResponse.redirect(login_path);
    }
    try {
      const onVerif = await verify(jwt.value,secret);
      if(onVerif == "ERR_JWT_EXPIRED"){
        deleteCookie();
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(login_path);
    }
    return NextResponse.next();
  }

  if(req.nextUrl.pathname.startsWith('/login')){
    if(jwt === undefined){
      return NextResponse.next();
    }

    try {
      const onVerif = await verify(jwt.value,secret);
      if(onVerif == "ERR_JWT_EXPIRED"){
        deleteCookie();
      }
      return NextResponse.redirect(home_path);
    } catch (error) {
      return NextResponse.next();
    }

  }


}
