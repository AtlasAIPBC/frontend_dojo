# atlas-web

### Run it

    git clone https://github.com/AtlasAIPBC/atlas-web.git

    cd atlas-web
    yarn 
    yarn start

    open http://localhost:3000/


Runs the app from http://localhost:3000

## Details about project

### Styleguide links (Eslint [Airbnb](https://github.com/airbnb/javascript/tree/master/react))

- [Airbnb react](https://github.com/airbnb/javascript/tree/master/react)
- [Destructing assignments](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md)

### Libraries

- [AntDesign](https://ant.design)
- [React UBER Map GL](https://github.com/uber/react-map-gl)
- [Rematch](https://rematch.gitbooks.io/rematch/#getting-started)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
- [Axios](https://github.com/axios/axios)

### Rules

- Keep components at 150 max 200 lines of code, separate if they become longer
- Follow styles if you can, sometime linting could slow down your process. Skip it if you need to develop something fast, then go back to it and fix it

### Configuration

Under `src/configuration` there are 2 expected files.  The `mapboxStyle.json` must also be configured correctly.

TODO:

*  `src/helpers/deckLayers/hexagonLayer.js`  also has hardcoded constants, these need to be better documented.
*  `src/pages/MapView.jsx`'s default viewport.
*  `src/store/index.js`'s version.

#### General

`src/configuration/config.js` should look like:

```
export default {
    mapboxToken: "<Public mapbox access token>",
    ingestionApiBaseUrl: "http://<Server IP>/api/"
};
```

#### Firebase

https://console.firebase.google.com/

Click on the Project Overview tab.  Click on the appropriate icon to add an app.  This was a bit hard to find, but looked like "</>" when I was browsing.  You should see a snippet that looks like (strings have been redacted):

```
<script src="https://www.gstatic.com/firebasejs/5.6.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "REDACTED",
    authDomain: "REDACTED",
    databaseURL: "REDACTED",
    projectId: "REDACTED",
    storageBucket: "REDACTED",
    messagingSenderId: "REDACTED"
  };
  firebase.initializeApp(config);
</script>
```

`src/configuration/fire.js` should look like:

```
import firebase from 'firebase';

var config = {
    apiKey: "REDACTED",
    authDomain: "REDACTED",
    databaseURL: "REDACTED",
    projectId: "REDACTED",
    storageBucket: "REDACTED",
    messagingSenderId: "REDACTED"
};

const fire = firebase.initializeApp(config);

export default {
  fire,
  fireAuth: fire.auth(),
};
```

#### Mapbox Style

`mapboxStyle.json` controls the map style though Mapbox.

We currently use the dark template with some of the features turned off.  Publish your style (remeber to lock the starting position) and download the style.json file and override `mapboxStyle.json` as necessary.

They mapbox style must have been generated from the same mapbox account that the public access token is taken from.
