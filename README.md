<h1>Eden Prairie Playground Finder API</h1>
This repo is for the frontend user interface for my MS Capstone Project, Eden Prairie Playgrounds.  This web app is designed to allow families and outdoor enthusiasts with the opportunity to find and explore all 29 public playgrounds in the community of Eden Prairie, Minnesota.

<h2>Link to live project</h2>

[epplay.today](https://epplay.today)

<h2>App Features</h2>

:round_pushpin: Find all 29 Playgrounds in Eden Prairie, even the ones that don't show up on Google Maps

:mag: Search for Playgrounds based on Distance, Equipment, Amenities, and Sports

:person_in_manual_wheelchair: Locate Playgrounds with Accessible Features to find the best place to play

:parking: Get directions to the exact location of the Playground, not the park's street address

:bike: Choose your route based on your preferred mode of travel

:warning: Report on-site maintenance issues directly to the city

<h2>Screenshots</h2>

![main app screenshot](https://github.com/bstrock/eden_prairie_playground_finder/blob/86891a08bdb5aba9f83d994358ee6a37e16bdb9c/site/src/images/screenshots/playgrounds-hero.png)


<h2>Project Materials</h2>

[Watch a short project overview walkthrough](https://youtu.be/EvkzLfWa2Ko)

[Check out the backend FastAPI app repo](https://github.com/bstrock/playground_finder)

[Use the interactive API documentation](https://eden-prairie-playgrounds.herokuapp.com/docs#/)

<h2> Supporting Documents</h2>

[Project Proposal](https://github.com/bstrock/playground_planner/blob/master/data/docs/Brian%20Strock%20-%20Project%20Proposal.docx)

[Project Plan](https://github.com/bstrock/playground_planner/blob/master/data/docs/Brian%20Strock%20Project%20Plan.pdf)

[Project Executive Summary](https://github.com/bstrock/playground_planner/blob/master/data/docs/Brian%20Strock%20778%20Executive%20Summary.docx)


<h2>Tech Stack</h2>

* React.js
* Leaflet.js
* react-leaflet
* Material UI
* Geoapify
* Mapbox/ESRI (basemaps)

<h2>Project Structure and Contents</h2>

```site/
├── public/
│       ├── CNAME
|       ├── favicon.ico
│       ├── index.html
│       ├── manifest.json
│       └── logo.txt
└── src/
        ├── /components
        |     ├── /FilterDrawer
        |     |      ├── AccordionTemplate.js
        |     |      ├── DistanceSlider.js
        |     |      ├── EquipmentCheckboxList.js
        |     |      ├── FilterAccordion.js
        |     |      ├── FilterDrawer.js
        |     |      ├── FloatingButton.js
        |     |      └── ParkButton.js
        |     ├── /Map
        |     |      ├── /LeafletLayers
        |     |      |     ├── LayerControl.js
        |     |      |     ├── LocationMaker.js
        |     |      |     ├── PlaygroundMarker.js
        |     |      |     └── UserGuide.js
        |     |      ├── /ParkPopup
        |     |      |     ├── AddressBlock.js
        |     |      |     ├── AssetTable.js
        |     |      |     ├── EquipmentCard.js
        |     |      |     ├── InfoBox.js
        |     |      |     ├── ParkCard.js
        |     |      |     └── ParkCardActionBar.js
        |     |      └── /StaticLayers
        |     |            ├── PlaygroundPolygons.js
        |     |            └── TileLayers.js
        |     ├── App.js
        |     ├── NavBar.js
        |     └── ApiQuery.js
        ├── /data
        |     └── ep_boundary.json
        ├── /images
        |     ├── /icons
        |     |     └── ...svg elements
        |     ├── /leaflet
        |     |     └── ...leaflet base icons
        |     ├── /playgrounds
        |     |     └── ...images of playgrounds
        |     └── hero.png
        ├── App.css
        ├── index.css
        ├── index.js
        └── reportWebVitals.js   
```

`/public` contains resources for site hosting and publication.

`/src` contains website source code, including all custom React components, images, data, and api loading.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
