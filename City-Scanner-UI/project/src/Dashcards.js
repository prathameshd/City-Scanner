import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
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
});

export default function MediaCard() {
  const classes = useStyles();

  return (
      <div style={{ backgroundImage: 'url("src\images\city.png")',}}>
    <div className="card1">
        <br/>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="src/images/resto.jpg"
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
        <Button size="small" color="primary">
          Explore
        </Button>
        
      </CardActions>
    </Card>
    </div>
    <br/>

    <div className="card2">
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
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
        <Button size="small" color="primary">
          Explore
        </Button>
        
      </CardActions>
    </Card>
    </div>
<div className="card3">
    <br/>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
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
        <Button size="small" color="primary">
          Explore
        </Button>
        
      </CardActions>
    </Card>
    </div>
    <br/>

    <div className="card4">
    <br/>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Explore EventsS"
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
        <Button size="small" color="primary">
          Explore
        </Button>
        
      </CardActions>
    </Card>
    </div>
    <br/>
    </div>
    
  );
}