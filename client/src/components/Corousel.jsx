import React from 'react'
import img1 from "../components/img/mainCorousel/OnWj0is-615706806.png"
import img2 from "../components/img/img2.jpg"
import "./main.css"

const corousel = () => {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img id="cImg" src={img1} height="400" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} height="400" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img1} height="400" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default corousel