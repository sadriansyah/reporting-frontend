import Head from 'next/head';
import Link from 'next/link';
import ErrorPage from '../component/Master/Error';
export default function file404() {
  return (
    <ErrorPage pageTitle="404 Not Found | Thinkmatch Reporting App">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card shadow-lg">
              <div className="card-block">
                <div className="text-center p-3">
                  <h1 className="error-page mt-4"><span>404!</span></h1>
                  <h4 className="mb-4 mt-5">Sorry, page not found</h4>
                  <p className="mb-4">It will be as simple as Occidental in fact, it will Occidental <br /> to an English person</p>
                  <Link className="btn btn-primary mb-4 waves-effect waves-light" href="/"><i className="mdi mdi-home" /> Back to Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorPage>
  )
}
