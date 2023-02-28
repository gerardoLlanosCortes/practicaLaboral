import React from 'react'
import PDFFile from '../components/PDFFile'
import { PDFDownloadLink,  PDFViewer} from '@react-pdf/renderer'
import { height } from '@mui/system'

export const Home = () => {

  const openModal = () => {
    console.log("click al modal")
  }




  return (
  <div className="container-sm">
    <div className="container-sm">
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
          <img src="https://loremflickr.com/150/150" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable"  className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <img src="https://loremflickr.com/150/150" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#modalTable"  className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <img src="https://loremflickr.com/150/150" className="card-img-top" alt="..." />
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" onClick={() => openModal()} className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>


      <div id='modalTable' className="modal fade modal-xl" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
              <PDFViewer style={{width:"100%", height:"93vh"}}><PDFFile/></PDFViewer>
            </div>
        </div>
      </div>


      
        
    {/* <div className="container-sm">
      <div className="row hero__main flex-column-reverse flex-md-row">
        <div className="col-md-5 text-center">
            <div className="home__texts d-flex flex-column justify-content-start">
              <h1>Home</h1>
              <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, rem!</h2>
              <a href="#" className='btn__home'>Click</a>
            </div>
          </div>
        
        <div className="col-md-7 text-center home__img ">
          <img className='d-block' src="./images/hero-img.svg" alt="" />
        </div> */}

        
        {/* <PDFDownloadLink style={{width: "200px", backgroundColor:"#6dbafa", textAlign: 'center', padding: "16px", color:"white", borderRadius: "6px"}}   
          document={<PDFFile/>} fileName="ArchivoDePrueba">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink> */}

        {/* <PDFViewer><PDFFile/></PDFViewer> */}
      </div>

    </div>
  )
}

export default Home
