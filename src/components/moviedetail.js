import React, { Component } from 'react';
import { fetchMovie, submitReview } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {
    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            details:{
                movieID: this.props.selectedMovie.title,
                name: '',
                quote: '',
                rating: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.title));
        }
    }

    submit(){
        const {dispatch} = this.props;
        dispatch(submitReview(this.state.details));
    }

    render() {

            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) => {
                            console.log(actor);
                               return (<p key={i}>
                                    <b>{actor.actorName}</b> {actor.charName}
                                </p>);
                                 })}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.movieReviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.name}</b>&nbsp; {review.quote}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                        <Form className='form-horizontal'>
                            <Form.Group controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control onChange={this.updateDetails} value={this.state.details.name} type="text" placeholder="Name" />
                            </Form.Group>

                            <Form.Group controlId="quote">
                                <Form.Label>Leave a Review:</Form.Label>
                                <Form.Control onChange={this.updateDetails} value={this.state.details.quote} type="text" placeholder="Review" />
                            </Form.Group>

                            <Form.Group controlId="rating">
                                <Form.Label>Your Rating:</Form.Label>
                                <Form.Control onChange={this.updateDetails} value={this.state.details.rating} type="text" placeholder="Rating" />
                            </Form.Group>
                            {console.log("movie", this.state.details.movieID)}
                            {console.log("name", this.state.details.name)}
                            {console.log("quote", this.state.details.quote)}
                            {console.log("rating", this.state.details.rating)}
                            <Button onClick={this.submit}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

