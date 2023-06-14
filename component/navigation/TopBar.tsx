import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import loadjs from 'loadjs';

export default function TopBar() {
  const [cookie,setCookie] = useCookies(['tm_access_token']);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      navuserClick();
    }, 2000);
  },[])


  const navuserClick = () => {
    $(".nav-user").on('click',function(e){
      $(".profile-dropdown").toggleClass("power");
      $(".nav-pro-img").toggleClass("power");
      if($('.nav-pro-img').hasClass('show')){
        $(".nav-pro-img").toggleClass('show');
        $(".profile-dropdown").toggleClass("show");
      }else {
        $(".nav-pro-img").toggleClass('show');
        $(".profile-dropdown").toggleClass("show");
      }
    });

  }

  const sideClick = (e) => {
    // event.preventDefault();
    $("body").toggleClass("enlarged");
  }

  const onLogout = () => {
    setCookie("tm_access_token",'', { expires: new Date(0) });
    router.push("/login");
  }



  return (
    <div className="topbar">
      <div className="topbar-left">
        <Link href="/" className="logo">
          <span className="logo-light">
            <i className="mdi mdi-camera-control"> Report</i>
          </span>
          <span className="logo-sm">
            <i className="mdi mdi-camera-control" ></i>
          </span>
        </Link>
      </div>
      <nav className="navbar-custom">
        <ul className="navbar-right list-inline float-right mb-0">
          {

            // <li className="dropdown notification-list list-inline-item">
            //   <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            //     <i className="mdi mdi-bell-outline noti-icon" ></i>
            //     <span className="badge badge-pill badge-danger noti-icon-badge">3</span>
            //   </a>
            //   <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg px-1">
            //     <h6 className="dropdown-item-text">
            //       Notifications
            //     </h6>
            //     <div className="slimscroll notification-item-list">
            //       <a href="#" className="dropdown-item notify-item active">
            //         <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline" /></div>
            //         <p className="notify-details"><b>Your order is placed</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
            //       </a>
            //       <a href="#" className="dropdown-item notify-item">
            //         <div className="notify-icon bg-danger"><i className="mdi mdi-message-text-outline" /></div>
            //         <p className="notify-details"><b>New Message received</b><span className="text-muted">You have 87 unread messages</span></p>
            //       </a>
            //       <a href="#" className="dropdown-item notify-item">
            //         <div className="notify-icon bg-info"><i className="mdi mdi-filter-outline" /></div>
            //         <p className="notify-details"><b>Your item is shipped</b><span className="text-muted">It is a long established fact that a reader will</span></p>
            //       </a>
            //       <a href="#" className="dropdown-item notify-item">
            //         <div className="notify-icon bg-success"><i className="mdi mdi-message-text-outline" /></div>
            //         <p className="notify-details"><b>New Message received</b><span className="text-muted">You have 87 unread messages</span></p>
            //       </a>
            //       <a href="#" className="dropdown-item notify-item">
            //         <div className="notify-icon bg-warning"><i className="mdi mdi-cart-outline" /></div>
            //         <p className="notify-details"><b>Your order is placed</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
            //       </a>
            //     </div>
            //     <a href="#" className="dropdown-item text-center notify-all text-primary">
            //       View all <i className="fi-arrow-right" ></i>
            //     </a>
            //   </div>
            // </li>
          }
          <li className="dropdown notification-list list-inline-item user-profile"  >
            <div className="dropdown notification-list nav-pro-img " >
              <a className="dropdown-toggle nav-link arrow-none nav-user " data-toggle="dropdown"  href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="/assets/images/users/user-4.jpg" width={24} height={24} alt="user" className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                <a className="dropdown-item" href="#"><i className="mdi mdi-account-circle" /> Profile</a>
                <a className="dropdown-item d-block" href="#"><i className="mdi mdi-settings" /> Settings</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item text-danger" href="#" onClick={onLogout}><i className="mdi mdi-power text-danger" /> Logout</a>
              </div>
            </div>
          </li>

        </ul>
        <ul className="list-inline menu-left mb-0">
          <li className="float-left">
            <button onClick={sideClick} className="button-menu-mobile open-left waves-effect">
              <i className="mdi mdi-menu" />
            </button>
          </li>
          <li className="d-none d-md-inline-block">
            <form role="search" className="app-search">
              <div className="form-group mb-0">
                <input type="text" className="form-control" placeholder="Search.." />
                <button type="submit"><i className="fa fa-search" /></button>
              </div>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  )
}
