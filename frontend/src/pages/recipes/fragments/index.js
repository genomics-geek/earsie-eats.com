import gql from 'graphql-tag'


const Recipe = {}
Recipe.fragments = {
  default: gql`
    fragment RecipeParts on RecipeNode {
      id
      pk
      author {
        id
        username
        email
      }
      title
      description
      imageUrl
      published
      isPublished
      prepTime
      cookTime
      totalTime
      servingSize
      active
    }
  `,
}


export { Recipe }
