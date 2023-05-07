typesense
meilisearch

# Componenent nesting 
# https://beta.reactjs.org/learn/passing-props-to-a-component#passing-jsx-as-children

Used for rendering different JSX
¿ Can be used for PokemonItem forms ?

## How to use the app

## App architecture

Array of map is load for one user
Components' tree
- App
  - NavBar
    - NavButton
    - NavList
      - NavItem
  - PokemonItem
    - PokemonCard
      - PokemonFormBar
        - ShinyBaseIcon/ShinyActiveIcon
        - LuckyBaseIcon/LuckyActiveIcon
      - PokemonTitle
      - PokemonImage
        - LazyLoadImage

## Problem 
### Switching between account
React default behavior renders all nested components within the updated component wether the props have changed.
Switching between account will trigger a re-render of every component _'for the first time'_ down the tree, since the account context is placed at the top level component as a state.
To optimize that and improve performance, useMemo or useCallback are tools to avoid re-render children components with no change in the props.

useState for account makes react re-render every component, since it's on the top level component
constante variable for account makes react not re-render PokemonFormBar since it's not a state.

## Hooks
### useContext Hook
Form are store in Map for better performance (adding/removing).  
Form default value is an empty Map() to avoir error if context is not provided.
To keep track of pokemon form (lucky, shiny, shadow...) useContext is implemented:
- it avoids passing prop drilling from App > PokemonItem > PokemonCard > PokemonFormBar
- allows each PokemonItem component to set the map
- since it's not a state React doesn't re-render every component.


### useMemo / useCallback (WIP)
Switching between accounts re-renders every image component. Since the images are the same no matter what, there is no need to re-render those components every time.  
By preventing re-render every image, memo hook improves performance. 
