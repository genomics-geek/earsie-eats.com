import gql from 'graphql-tag'


const Recipe = {}
Recipe.fragments = {
  default: gql`
    fragment ReceipeParts on RecipeNode {
      id
      pk
      author {
        id
        username
        email
      }
      title
      description
      image
      published
      isPublished
      prepTime
      cookTime
      totalTime
      servingSize
      active
      ingredients {
        edges {
          node {
            id
            label
          }
        }
      }
      steps {
        edges {
          node {
            id
            label
          }
        }
      }
    }
  `,
}


export { Recipe }
