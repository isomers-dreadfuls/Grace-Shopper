import React from 'react'
import {Card, Image, Rating} from 'semantic-ui-react'
import history from '../history'

const ProductCard = props => {
  const ratingArray = props.product.reviews || []
  const averageRating =
    ratingArray.reduce((sum, elem) => {
      return sum + elem.rating
    }, 0) / ratingArray.length
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          history.push(`/products/${props.product.id}`)
        }}
      >
        <div style={{overflow: 'hidden', height: '20vw'}}>
          <Image src={props.product.image} size="medium" />
        </div>
        <Card.Content>
          <Card.Header>{props.product.name}</Card.Header>
          <Card.Meta>{`$${props.product.price}`}</Card.Meta>
          <Card.Meta>
            <Rating
              disabled
              icon="star"
              name="rating"
              rating={averageRating}
              maxRating={5}
            />
          </Card.Meta>
          <Card.Description>{props.product.description}</Card.Description>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

export default ProductCard
