import Dashboard from '../../component/Master/dashboard';
import Link from 'next/link';

export default function ListTask() {
  return (
    <Dashboard pageTitle='MoM | Thinkmatch Report App'>
      <div className='content'>
        <div className='container-fluid'>
          <div className='page-title-box'>
            <div className='row align-items-center'>
              <div className='col-sm-6'>
                <h4 className='page-title'>Document</h4>
              </div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-right'>
                  <li className='breadcrumb-item'>
                    <Link href='/'>Thinkmatch</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link href='#'>Document</Link>
                  </li>
                  <li className='breadcrumb-item active'>Task</li>
                </ol>
              </div>
              <div className='col-sm-6 text-center'>
                <h5>Daily Task : 29 November 2022</h5>
              </div>
              <div className='col-sm-6 text-right'>
                <Link href='/task/create-task' className='btn btn-secondary'  style={{marginRight: "12px"}}>
                  {' '}
                  <i className='icon-paper-sheet'></i> List Task
                </Link>
                <Link href='/task/create-task' className='btn btn-primary'>
                  {' '}
                  <i className='fa fa-plus'></i> Create Task
                </Link>
              </div>
            </div>
          </div>

          <div className='row m-t-30'>
            <div className='col-lg-4'>
              <div className='card faq-box border-success'>
                <div className='card-body'>
                  <div className='faq-icon float-right'>
                    <i className='fas fa-question-circle font-24 mt-2 text-success'></i>
                  </div>
                  <h5 className='text-success'>01.</h5>
                  <h5 className='font-16 mb-3 mt-4'>What is Lorem Ipsum?</h5>
                  <p className='text-muted mb-0'>
                    Phasellus eros odio Curabitur hendrerit neque at vestibulum
                    consequat Cras nibh ipsum tempor ac ex eget euismod auctor
                    mi Ut condimentum eu elit eget cursus Fusce eu consequat
                    nisl Praesent vel dictum enim ac convallis dolor Proin in
                    velit vel enim laoreet cursus.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card faq-box border-primary'>
                <div className='card-body'>
                  <div className='faq-icon float-right'>
                    <i className='fas fa-question-circle font-24 mt-2 text-primary'></i>
                  </div>
                  <h5 className='text-primary'>02.</h5>
                  <h5 className='font-16 mb-3 mt-4'>Where can I get some?</h5>
                  <p className='text-muted mb-0'>
                    Aliquam sed efficitur urna Integer mattis metus risus
                    egestas hendrerit condimentum dolor auctor quis In vitae
                    dictum eros Vestibulum aliquet tortor sapien ut sodales
                    massa faucibus nec cras tristique condintum rsum a tincidunt
                    Ut lacinia ornare tempor.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card faq-box border-warning'>
                <div className='card-body'>
                  <div className='faq-icon float-right'>
                    <i className='fas fa-question-circle font-24 mt-2 text-warning'></i>
                  </div>
                  <h5 className='text-warning'>03.</h5>
                  <h5 className='font-16 mb-3 mt-4'>
                    Where does it come from?
                  </h5>
                  <p className='text-muted mb-0'>
                    Quisque aliquet egestas vel tincidunt sem pretium mattis
                    suspendisse euismod at elit eu tempor Nunc ac vehicula dolor
                    Maecenas at tincidunt accumsan nibh Sed dapibus augue quis
                    dignissim ultrices turpis mauris porta lectus sed
                    ullamcorper leo risus in metus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <div className='card faq-box border-danger'>
                <div className='card-body'>
                  <div className='faq-icon float-right'>
                    <i className='fas fa-question-circle font-24 mt-2 text-danger'></i>
                  </div>
                  <h5 className='text-danger'>04.</h5>
                  <h5 className='font-16 mb-3 mt-4'>Why do we use it?</h5>
                  <p className='text-muted mb-0'>
                    Nullam odio justo ullamcorper aliquet ex sit amet efficitur
                    facilisis ligula Aenean euismod vel tellus ac feugiat Morbi
                    finibus nisl in dui facilisis ut iaculis urna facilisis
                    Suspendisse potenti Proin interdum nulla nulla sed faucibus
                    Integer sapien pretium vestibulum.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card faq-box border-info'>
                <div className='card-body'>
                  <div className='faq-icon float-right'>
                    <i className='fas fa-question-circle font-24 mt-2 text-info'></i>
                  </div>
                  <h5 className='text-info'>05.</h5>
                  <h5 className='font-16 mb-3 mt-4'>Why do we use it?</h5>
                  <p className='text-muted mb-0'>
                    Fermentum molestie leo at dignissim mi Donec at ex placerat
                    pretium ex vitae porta orci Pellentesque augue lacus
                    dignissim tristique aliquam in placerat feugiat sapien Fusce
                    a enim faucibus lacinia felis a vulputate eros Aenean
                    malesuada et ex et laoreet.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='card faq-box border-dark'>
                <div className='card-body'>
                  <div className='faq-icon float-right'>
                    <i className='fas fa-question-circle font-24 mt-2 text-dark'></i>
                  </div>
                  <h5 className='text-dark'>06.</h5>
                  <h5 className='font-16 mb-3 mt-4'>
                    Where does it come from?
                  </h5>
                  <p className='text-muted mb-0'>
                    Suspendisse sapien urna ullamcorper vel erat at suscipit
                    dapibus dolor Proin sodales dictum ante Vivamus non dictum
                    metus Sed quis leo non massa viverra rutrum in a elit
                    Praesent sit amet rhoncus justo Mauris pharetra mollis enim
                    non efficitur ipsum porttitor vitae.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
