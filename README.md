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

Add a reference to `fill-image.js` file either by downloading the source file from [here](https://github.com/arvindr21/fill-image/blob/master/dist/fill-image.min.js) or by running

```bash
 $ bower install fill-image --save
 ```
Then add `FillImage` module as a dependency to your awesome app

```js
angular.module('myApp', ['FillImage']);
```

Now you can start sprinkling around `<fill-image></fill-image>` tags. If no service attribute is provided, a random service from the above list will be used.

### Contribution
Feel free to add a new service or a PR to the existing code. 

* Download/clone repo
* `cd fill-image` Run `npm install` 
* To start developing `gulp watch`

Docs are located on `gh-pages` branch.

* Switch branch `git checkout -b gh-pages`
* Update  the docs & submit PR

### Todos
* [ ] Clean up the code
* [ ] "Real" Rules engine

#### Inspiration
I started this directive to integrate all image place holder services and use a single directive to access all of them, depending on the "mood" of the app. As I started developing the directive, the complexity of structuring the code became complex, As each service has its own set of options/structure. 

In v`0.1.0`, I tried to implement a rules engine (_not really a rules engine, but a few utility methods that tell about the behavior of a service_), which generates the output conditionally, depending on the service it is processing. 

The next step is to come up with a more cleaner solution, which is very close to an actual rules engine. This "Rules Engine" takes in a service and a rule set and spits out the URL of the image tag. This kind of architecture may be helpful for other services, where the code base needs to interact with multiple data response in multiple formats & process them in the same way.

[The Jackal of Javascript](http://thejackalofjavascript.com/)