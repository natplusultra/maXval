import React from "react";
import {Card, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import "./ProductCard.css";

const ProductCard = props => (
    <Card>
        <CardMedia
            overlay={<CardTitle title={props.productTitle} subtitle={props.userName}  />}>
            <img src={props.productImage} alt="" />
        </CardMedia>
        <CardHeader
            title={props.userName}
            subtitle={props.userLocation}
            avatar={props.userImage}
        />
        <CardText
            children={props.productDesc}
        />
    </Card>
);

export default ProductCard;