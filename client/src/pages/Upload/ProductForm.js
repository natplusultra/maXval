import React from "react";
import TextField from 'material-ui/TextField';

const ProductInfo = () => (
  <div>
    <TextField
      hintText="Product Name"
    /><br />
    <br />
    <TextField
      hintText="Description"
    /><br />
    
  </div>
);

export default ProductInfo;

export default class Form extends React.Component {
  state = {
    PictureUrl:"",
    ProductName: "",
    ProductDescription: ""
    
  };


  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
    PictureUrl:"",
    ProductName: "",
    ProductDescription: ""
    });
    this.props.onChange({
    PictureUrl:"",
    ProductName: "",
    ProductDescription: ""
    });
  };

  render() {
    return (
      <form>
        <input
          name="PictureUrl"
          placeholder="PictureUrl"
          value={this.state.PictureUrl}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="ProductName"
          placeholder="Product Name"
          value={this.state.ProductName}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="ProductDescription"
          placeholder="Product Description"
          value={this.state.ProductDescription}
          onChange={e => this.change(e)}
        />
        <br />
        
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}