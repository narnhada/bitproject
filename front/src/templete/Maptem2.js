import React from 'react';
import {Link} from 'react-router-dom';
import Map from '../page/Map';
import Footer from '../page/Footer';
import "../css/tem.css";
import Header1 from '../page/Header1';
import Map2 from '../page/Map2';

const Maptem2=({match}) =>{
    
  return (
    <>
        <div className="body">
          <Header1></Header1>
            <Map2 gu1={match.params.gu}></Map2>
            {/* <Footer></Footer> */}
        </div>
    </>
  );
}

export default Maptem2;
