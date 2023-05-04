typesense
meilisearch

# Componenent nesting 
# https://beta.reactjs.org/learn/passing-props-to-a-component#passing-jsx-as-children

Used for rendering different JSX
¿ Can be used for PokemonItem forms ?

## How to use the app

## App architecture

Array of map is load for one user

## Hooks
### useContext Hook
Form are store in Map for better performance (adding/removing)
Form default value is an empty Map() to avoir error if context is not provided.
To keep track of pokemon form (lucky, shiny, shadow...) useContext is implemented:
- it avoids passing prop drilling from App > PokemonItem > PokemonCard
- allows each PokemonItem component to set the map
- since it's not a state React doesn't re-render every component.

### memo (not working)
Switching between accounts re-renders every image component. Since the images are the same no matter what, there is no need to re-render those components every time.
By preventing re-render every image, memo improves performance. 
