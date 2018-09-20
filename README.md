# Apostrophe Headless -  Next.js - Boilerplate
This project builds a performant Front-End application to be the public face of your JSON API. The initial intent was for it to work seamlessly with a deployment of Apostrophe using the Apostrophe-Headless plugin.
- Uses data from an Apostrophe headless CMS to control the frequently updated content.
- Data is requested and rendered on the server-side for optimal performance and SEO.
- Leverages code splitting, prefetching, and other performance enhancers that come with Next.js
- G-zipping, preloading, and heavily caching common fonts and css files

### Run locally
```
npm install
```

```
npm run dev
```

### Deploy to Staging
```
npm run build
```

```
deploy command
```

### Deploy to Production
```
npm run build
```

```
deploy command
```


### Communication with Apostrophe Headless
This particular setup makes server-side request and renders the components there. Currently there are only GET request, but I have plans to add PUT and authentication requests in the coming months.

#### Where does the data request happen?
Next.js utilizes a function within Page components called `getInitialProps`. An example of that is in the `pages/sample-with-data.js` file. More documentation on the ins and outs of how that works is here on the Next.js website: [Next.js Documentation](https://nextjs.org/docs/#fetching-data-and-component-lifecycle) 
If you aren't familliar with React.js and/or it's component lifecycle, I would suggest brushing up on that before you dive into the wonderful perks of Next.js
That said, Next.js kind of handles a lot of the hardships with code splitting and request handling. 
I have created a couple of helper functions to aid in the requests that will be made to the Apostrophe-Headless instance in `utils/dataHelpers.js`. Clearly this project is deployed on Google Cloud, but this can easily be changed out for AWS, Heroku, or any other node hosting platform. This will get abstracted in the future.

```
function getAPIUrl (path, paramString) {
  const requestVars = buildRequestVars(paramString)
  const urlBase = `${API_DOMAIN}/api/v1/`
  return `${urlBase}${path}${requestVars}`
}

function buildRequestVars (paramString) {
  let rvars = GOOGLE_CLOUD_PROJECT === PROD_ENV ? '?env=prod' : ''

  if (paramString && paramString.length > 0) {
    rvars += rvars.length > 0 ? `&${paramString}` : `?${paramString}`
  }
  return rvars
}
```

`API_DOMAIN` is set in the `.env` and is to be the domain at which you have deployed your Apostrophe-Headless instance. The `urlbase` variable adds the rest of the base paths currently used by a standard install of Apostrophe-Headless. The `path` variable is used as the item type. More documentation on how 
Apostrophe-Headless handles requests can be found [here](https://github.com/apostrophecms/apostrophe-headless)

I do have a branch of Apostrophe-Headless that will accept `slug` as a query parameter when trying to requst a single page. I'm not sure why it was excluded from the original codebase ( I'm sure there were reasons ) or how they (Apostrophe peeps) will feel about it, but I have a fork [here](https://github.com/blaineo/apostrophe-headless) that I am maintaining as best I can. The main difference can be found on lines [96](https://github.com/blaineo/apostrophe-headless/blob/master/lib/modules/apostrophe-pages-headless/index.js#L96) and [125](https://github.com/blaineo/apostrophe-headless/blob/master/lib/modules/apostrophe-pages-headless/index.js#L125) of the `apostrophe-pages-headless` module.


### Coming soon
- Abstracted version of the Apostrophe CMS deployment ( utilizing Apostrophe Headless ) used for this project
- Abstract hosting platform away from just Google Cloud