import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Home from './Home';
import SearchBar from "./Components/SearchBar";
 import ls from 'local-storage'

class Dashcards extends Component {
 
  render()
  {
    return (

      <div className="container-fluid">  
            <div className="top-search-bar">
              <SearchBar />
            </div>

      <div className="card1">
      <Link to={{ pathname: "/Restaurants"}}>   
      <Card style={{width:400, height:300, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}>
        <CardActionArea>
        <CardMedia
            style={{height:150}}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lHHfCINIxQ9VEQcrAjMNHh8sZP_88WnNbPle1b6-lNymT3kFKA&s"
            title="Explore Restaurants"
          />
    
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Restaurants
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Food and drink, two things that we all need to survive. But good food and drink is what we need to thrive. 
            </Typography>
           
          </CardContent>
        </CardActionArea>
        <CardActions>
        
        
        
        
        </CardActions>
      </Card>
      </Link>
     
      </div>
      
  
      <div className="card2">
          <Link to={{ pathname: "/Places"}}>     
      <Card style={{width:400, height:300, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}>
        <CardActionArea>
          <CardMedia
            style={{height:150}}
            image="https://www.visittucson.org/sites/default/files/styles/hero/public/canyon-ranch-hiking-49.jpg?itok=KrHnbGF2"
            title="Explore Tourist Spots"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Tourist Spots
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Food and drink, two things that we all need to survive. But good food and drink is what we need to thrive.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
      </Link>
      </div>
  
  <div className="card3">
                <Link to={{ pathname: "/Housing"}}>   

      <Card style={{width:400, height:300, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}>
        <CardActionArea>
          <CardMedia
            style={{height:150}}
            image="https://www.columbusunderground.com/wp-content/uploads/2017/09/milo-04.jpg"
            title="Explore Housing"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Housing
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Food and drink, two things that we all need to survive. But good food and drink is what we need to thrive.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions> 
        </CardActions>
      </Card>
      </Link>
      </div>
      
  
      <div className="card4">
    
      <Card style={{width:400, height:300, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}>
        <CardActionArea>
          <CardMedia
            style={{height:150}}
            image="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/12/16131147/future-phone-mobile-live-events-technology-trends.png"
            title="Explore Events"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Events
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Food and drink, two things that we all need to survive. But good food and drink is what we need to thrive.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
      </div>
      
      </div>
      
    );
  }
  //}
  }
  
  export default Dashcards;