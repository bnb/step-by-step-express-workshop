# What have we done in this step

This step is a relatively light one: we start to serve some baisc static CSS from our project, since our previous unstyled display was a bit... lacking.

Using Express's `static` method, we can serve from the `/static` directory. This will serve all static assets called from the `/static` directory – inhcluding assets like local images, stylesheets, and even the `favicon.ico` that browsers will automatically request.

```javascript
app.use(express.static('static')) // this will look at the `static` directory for our static assets
```

Since the following changes are in HTML and CSS, we won't need to change them in futher steps. That said, I wanted to be sure to be very explicit in what was actually happening to ensure you've got the full context of all the changes and there's no magic here 👍

We've also gone ahead and added a line to `views/comic.handlebars` which points to a CSS file accessible from the root path:

```HTML
<link rel="stylesheet" href="./comic.css">
```

Additionally, we've added a `/static` directory with a `comic.css` file:

```css
h1 {
  text-align: center;
}

.entry {
  display: block;
  width: fit-content;
  margin: 0 auto;
}
```