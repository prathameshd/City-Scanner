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

class Dashcards extends Component {


render()
{
  /*const useStyles = makeStyles({
  card: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    maxWidth: 400,
    border: 15,
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
   
  },
  media: {
    height: 100,
  },
});*/
//export default function MediaCard() {
  //const classes = useStyles();

      const { data } = this.props.location;

  return (
    <div>  
   <div class="top-search-bar">
    <SearchBar />
  </div>
    <div className="card1">
    <Link to={{ pathname: "/Restaurants", data: data }}>   
    <Card className="">
      <CardActionArea>
      <CardMedia
          className=""
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
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
        <Link to={{ pathname: "/Places", data: data }}>   

    <Card className="">
      <CardActionArea>
        <CardMedia
          className=""
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
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
    
    <Card className="">
      <CardActionArea>
        <CardMedia
          className=""
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
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
    </div>
    

    <div className="card4">
  
    <Card className="">
      <CardActionArea>
        <CardMedia
          className=""
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
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
