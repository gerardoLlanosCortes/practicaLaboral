import React from 'react'

export const About = () => {
  return (

    // <div className="contenedor">
    //   <div className="flex__container flex__container--reverse">
    //     <div className='textos'>
    //       <h1>About Us</h1>
    //       <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. A obcaecati aperiam libero placeat nihil? Nemo est quo vel omnis, consequatur, ut rerum enim ipsa corrupti veritatis maxime officia vero cupiditate.</h2>
    //       <div className="social">
    //         <a href=""><i className='fa fab fa-facebook-f'></i></a>
    //         <a href=""><i className='fa fab fa-twitter'></i></a>
    //         <a href=""><i className='fa fab fa-instagram'></i></a>
    //         <a href=""><i className='fa fab fa-linkedin'></i></a>
    //        </div>
    //     </div>
    //     <img src="./images/about-2.svg" alt="" />
    //   </div>
   
    // </div>

    <div className="container-sm">
    <div className="row hero__main">
      <div className="col-md-7 text-center about__img ">
        <img className='d-block' src="./images/about-2.svg" alt="" />
      </div>
      <div className="col-md-5 text-center ">
          <div className="about__texts d-flex flex-column justify-content-start">
            <h1>About Us</h1>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. A obcaecati aperiam libero placeat nihil? Nemo est quo vel omnis, consequatur, ut rerum enim ipsa corrupti veritatis maxime officia vero cupiditate.</h2>
            <div className="social">
              <a href=""><i className='fa fab fa-facebook-f'></i></a>
              <a href=""><i className='fa fab fa-twitter'></i></a>
              <a href=""><i className='fa fab fa-instagram'></i></a>
              <a href=""><i className='fa fab fa-linkedin'></i></a>
            </div>
          </div>
        </div>
      
      
    </div>

    </div>
  )
}

export default About
