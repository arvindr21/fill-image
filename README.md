# &lt;fill-image>&lt;/fill-image>

&lt;fill-image>&lt;/fill-image> generates place holder images for your prototype app. &lt;fill-image>&lt;/fill-image> is designed to be used with dynamic placeholder services like

|     Service     |  Service          | 
| :-------------: |:-------------:| 
| [dummyimage.com](http://dummyimage.com/)    | [placehold.it](http://placehold.it/)| 
| [lorempixel.com](http://lorempixel.com/)    | [fpoimg.com](http://fpoimg.com/)      | 
| [placeimg.com](http://placeimg.com/) | [fillmurray.com](http://www.fillmurray.com/)     | 
| [placecage.com](http://www.placecage.com/) | [placekitten.com](http://placekitten.com/)      | 
| [stevensegallery.com](http://www.stevensegallery.com/)| [nicenicejpg.com](http://www.nicenicejpg.com/)      | 
| [placebear.com](http://placebear.com/) | [baconmockup.com](http://baconmockup.com/)    | 
| [placesheen.com](http://placesheen.com/)| [placeskull.com](http://placeskull.com/)      | 
| [fakeimg.pl](http://fakeimg.pl/) | [beerhold.it](http://beerhold.it/)      | 

### Setup

Add a reference to `fill-image.js` file either by downloading the source file from [here](dist/fill-image.min.js) or you by running

```bash
 $ bower install fill-image --save
 ```
Then add `FillImage` module as a dependency to your awesome app

```js
angular.module('myApp', ['FillImage']);
```

Now you can start sprinkling around `<fill-image></fill-image>` tags. If no service is provided, a random service will be used.

#### Note
* Docs for each service can be accessed from the menu on the left!
* Not all services supports all properties!

### Contribution

Feel free to add a new service or a PR for existing code. 

* Download/clone repo
* `cd fill-image` Run `npm install` 
* To start developing `gulp watch`

Docs are located on `gh-pages` branch.

* Switch branch `git checkout -b gh-pages`
* Update  the docs & submit PR

### Todos
* [ ] Clean up the code
* [ ] Modularize the Rules engine

#### [The Jackal of Javascript](http://thejackalofjavascript.com/)