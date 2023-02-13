import React from 'react'

export const Home = () => {
  return (

    <div className="container-sm">
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
        </div>
        
      </div>

    </div>
  )
}

export default Home
