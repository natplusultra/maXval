import React from "react";
import {Card, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import "./ProductCard.css";

const ProductCard = props => (
    <Card>
        <CardMedia
            overlay={<CardTitle title={props.productTitle} subtitle={props.userName} />}>
            <img src={props.productImage} alt="" />
        </CardMedia>
        <CardHeader
            title={props.userName}
            subtitle={props.userLocation}
            avatar={props.userImage}
        />
        <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
    </Card>
);

export default ProductCard;