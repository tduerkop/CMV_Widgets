AppSettings
===============

A widget designed for use in CMV that allows the user to save the current state of the map extent and visible layers.

<h3>Description: Allows the user to save</h3>
 the current state of the map extent and visible layers.
 
<h3>Limitations: </h3>
Currently only works with dynamicMapService layers.

<h3>Usage </h3>
In viewer.js: 
```javascript      
settings: {
    include: true,
    id: 'settings',
    position: 10,
    type: 'titlePane',
    path: 'gis/dijit/AppSettings',
    title: 'Save/Share Current Map',
    options: {
        map: true,
        tocLayerInfos: true
    }
}
```
 
 Copyright (C) 2014 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.