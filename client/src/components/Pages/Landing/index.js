import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../../App.css';
import Nav from '../../../components/Nav';
import Banner from '../../Banner';
import BannerCard from '../../BannerCard';
import Bucket from '../../../components/Bucket';
import axios from "axios";
import $ from "jquery";

function Landing(){
    return(
        <div>
        <Nav menus = {[]}/>
<<<<<<< HEAD
        <Banner />
        <Banner />
=======

    
        <br/>
        <Banner loadElement="trendingMovies"/>
        <br/>
        <Banner loadElement="trendingTV"/>
>>>>>>> 086f28410655016ed02a6360009d536535c761a8
        
        </div>
        
    )
}

export default Landing;