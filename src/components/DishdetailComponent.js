import React,{Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle,BreadcrumbItem,Breadcrumb, Button,Row,Col,ModalBody,Modal,ModalHeader,Label} from 'reactstrap';
import {Link} from 'react-router-dom';

import {Control, LocalForm,Errors} from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;
    
    function RenderComments({comments, addComment, dishId  }) {
        if (comments == null) {
            return (<div></div>)
        }
        else{
            
        }
        const cmnts = comments.map(comment => {
            return (
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
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm dishId = {dishId} addComment = {addComment}/>
            </div>
        )
    }

   function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
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
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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
        const dish = props.dish;
        if (dish == null) {
            return (<div></div>)
        }
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
                        addComment = {props.addComment}
                        dishId = {props.dish.id}/>
                </div>
                <div className ='row'>
                {/* <CommentForm dishId = {dishId} addComment = {addComment}/> */}
                </div>
            </div>
        )
    }


export default DishDetail;