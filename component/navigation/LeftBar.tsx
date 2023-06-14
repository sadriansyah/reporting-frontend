import Link from 'next/link';

export default function LeftSideBar() {
  return (
    <div className="left side-menu">
      <div className="slimscroll-menu" id="remove-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu" id="side-menu">
            <li className="menu-title">Menu</li>
            <li >
              <Link href="/dashboard" className="waves-effect mm-active">
                <i className="icon-accelerator" /><span className="badge badge-success badge-pill float-right">9+</span> <span> Dashboard </span>
              </Link>
            </li>


            <li>
              <a href="#" className="waves-effect"><i className="icon-paper-sheet" /><span> Document <span className="float-right menu-arrow"><i className="mdi mdi-chevron-right" /></span> </span></a>
              <ul className="submenu">
                <li><Link href="/task">Daily Task</Link></li>
                <li><Link href="/document/mom">MoM</Link></li>
              </ul>
            </li>
            
            <li>
              <Link href="/project" className="waves-effect"><i className="icon-coffee" /><span> Project </span></Link>

            </li>
            <li className="menu-title">Settings</li>
            <li>
              <Link href="/department"> <i className="icon-portable-pc"></i> <span>Department</span> </Link>
            </li>
            <li>
              <Link href="/users" className="waves-effect"><i className="icon-profile" /><span> Users </span></Link>
            </li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}
