import React,{Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle,BreadcrumbItem,Breadcrumb, Button,Row,Col,ModalBody,Modal,ModalHeader,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';     
import {Control, LocalForm,Errors} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;
    
    function RenderComments({comments, postComment, dishId  }) {
        if (comments == null) {
            return (<div></div>)
        }
        else{
            
        }
        const cmnts = comments.map(comment => {
            return (
                <Fade in>
                <div>
                        <ul>
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author},
                                &nbsp;
                                {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(comment.date))}
                                </p>
                            </li>
                        </ul>
                </div>
                </Fade>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    <Stagger in>
                    {cmnts}
                    </Stagger>
                </ul>
                <CommentForm dishId = {dishId} postComment = {postComment}/>
            </div>
        )
    }

   function RenderDish({dish}) {
        if (dish != null)
            return(
                 <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        else
            return(
                <div></div>
            );
    }

    
export class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          isModalOpen: false
        };
      }

      toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values){
        this.toggleModal();
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
      }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className= 'fa fa-pencil'></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <div>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Control.select model=".rating" name="rating" defaultValue = "1"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className = "form-group">
                                <Label htmlFor="name" md={4}>Your Name</Label>
                                <Control.text model = '.author' name = 'author'
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const DishDetail = (props)=>
    {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        {
            return (
                <div className = 'container'>
                    <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to = '/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className= "col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <RenderDish dish ={props.dish}/>
                        <RenderComments comments ={props.comments}
                            postComment = {props.postComment}
                            dishId = {props.dish.id}/>
                    </div>
                    <div className ='row'>
                    {/* <CommentForm dishId = {dishId} addComment = {addComment}/> */}
                    </div>
                </div>
            )
        }
    }


export default DishDetail;