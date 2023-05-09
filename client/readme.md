typesense
meilisearch

# Componenent nesting 
# https://beta.reactjs.org/learn/passing-props-to-a-component#passing-jsx-as-children
# Font https://fonts.google.com/specimen/Source+Serif+Pro
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

## Problem 
### Lazy loading on Firefox
There are more than 900 pokemon item to display, each with one image. To optimize perfomance lazy loading images is a must.  
Nevertheless, according to the [official MDN doc](https://developer.mozilla.org/fr/docs/Web/HTML/Element/img#attributs), the _'loading'_ attribut naturally comes after the _'src'_ attribut. Even though, the order of attributs shouldn't matter.  
But when it comes to Firefox, [order matters](https://bugzilla.mozilla.org/show_bug.cgi?id=1647077):

    If you define the "loading" attribute at "lazy" AFTER the "src" attribute, it has no effect (all images are loaded, even those not in the viewport).
    If you define the "loading" attribute at "lazy" BEFORE the "src" attribute, it it applied as expected (only images in the viewport are loaded).

### Mandatory prop drilling
Account state and forms state were context. But React cannot memoized component using context. So props drilling is used in order to keep the app as fast as possible.

### Switching between pokemon account
A user can have **only one** player account.  
A player account can have **multiple** pokemon account.  
Switching between pokemon account to follow the collection progress must be fast.  

React re-renders all children components if the parent component re-render weither props have changed or not.
Switching between account will trigger a re-render of every component _'for the first time'_ down the tree, since the account state is placed at the top level component every children is render.
To optimize that and improve performance, component PokemonTitle and PokemonImage need to be **memoized** to avoid re-render.
Unfortunately, updating the Account context in the App component will re-render every children weither they're **memoized** or not.


### _const_ vs. _function_ for memo API
memo doesn't work is the App component use the _context_ hook.
memo doesn't also work if the memoized component is a variable. (?) variable have different reference each render (?) so React cannot memoized componenet and re-render it every time (even with memo).

## Hooks / API
### useContext Hook
Form are store in Map for better performance (adding/removing).  
Form default value is an empty Map() to avoir error if context is not provided.
To keep track of pokemon form (lucky, shiny, shadow...) useContext is implemented:
- it avoids passing prop drilling from App > PokemonItem > PokemonCard > PokemonFormBar
- allows each PokemonItem component to set the map
- since it's not a state React doesn't re-render every component.


### memo API
Switching between accounts re-renders every components. Since the images are the same no matter what, there is no need to re-render those components every time.  
By preventing re-render every image, memo hook improves performance. 
