# React Spotify
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using `--template typescript`
#### Goals:
*Deadline: 12.02.2020 11:59 PM*
- [ ] Integrate application with Spotify Web API.
- [ ] Apply styling as close as possible to Spotify.
- [ ] ***Apply styling as close as possible to Winamp.***
- [ ] Make content displayable and playable.
- [ ] Apply application state (use either Redux library or similar or React mechanisms like
Context API or hooks).
- [ ] Visualise data loading states.
- [ ] Add unit tests (no need to apply coverage for edge cases, focus on main possible
issues).
- [ ] Add at least one UI test for a happy path related scenario.
- [ ] It must be possible to run the app by doing just yarn &amp;&amp; yarn start (of course,
you can use npm install &amp;&amp; npm start).
- [ ] ***Implement separate “User profile” screen (details to display are free of choice) and
apply routing to the application.***

## Dependencies
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose 
- Node-sass
- Redux 
- Redux-saga

---

## UI
![ui](spotify-winamp-concept.png)

---

## Documentation
- src
    - [components](#components)
        - [UserProfile](#userprofile)
        - [TopBar](#topbar)
        - [MainContent](#maincontent)
        - [BottomBar](#bottombar)
        - [SideBar](#sidebar)
            - [Categories](#categories)
            - [NewReleases](#newreleases)
        - shared
            - hoc
    - [store](#redux-store)
        - [constants](#constants)
        - [actions](#actions)
        - [sagas](#sagas) 
    - [`App.tsx`](#react-app)
- [`index.js`](#server)

---

### Server

---

### React App

#### Redux Store
##### Constants 
##### Actions
##### Sagas

---

### Components 
#### TopBar
> Containing search component where user can search for artists tracks etc.

#### MainContent
> Displaying search results or category contents or any other content
not mentioned elsewhere.

#### BottomBar
> With player, after clicking on track user should be able to listen a song
(demo 30s).

#### Sidebar
> Containing two tabs/buttons: “Categories” and “New Releases”

##### Categories
> After clicking on “Categories” users should be able to see a list
of categories in Main Content (same as in real Spotify app - matrix/grid). Also
after clicking on category user should be able to see playlists and their tracks
(after clicking on the playlist).

##### NewReleases
> After clicking on “New Releases” albums and their tracks
should be displayed (just like with playlists in “Categories”).

#### UserProfile
> View displaying user details

---

### Styling
> The themes functionality was based on the tutorial made by [Jason McAffe](https://www.google.com/search?q=themes+scss+react&oq=themes+scss+react&aqs=chrome..69i57j35i39j0l6.7231j0j7&sourceid=chrome&ie=UTF-8).
