typesense
meilisearch

# Componenent nesting 
# https://beta.reactjs.org/learn/passing-props-to-a-component#passing-jsx-as-children

Used for rendering different JSX
¿ Can be used for PokemonItem forms ?
## How to use the app

## How the app is made 
### useContext Hook
Form are store in Map for better performance (adding/removing)
To keep track of pokemon form (lucky, shiny, shadow...) useContext is implemented:
- it avoids passing prop drilling from App > PokemonItem > PokemonCard
- allows each PokemonItem component to set the map
- every change on the map reload the every component (?)