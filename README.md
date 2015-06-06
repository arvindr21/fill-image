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

[The Jackal of Javascript](http://thejackalofjavascript.com/)