Source files for transition_in_bojaya
=====

## Description

Please provide a short description of this project

## Data
Please link to any external data used, as well as scripts for cleaning and analyzing that data, all of which should live in the `/data` directory.

## Installation
After cloning the repository run:
```
npm install
```

To start watching the project and opening in the browser run:
```
npm start
```

To deploy to GitHub pages run:
```
npm run deploy
```

---

## Embeding on LSV
To embed on a webpage use this code:
```html
<!-- START OF OUR INTERACTIVE -->
<script type="text/javascript">
window.transition_in_bojaya_data = {
  "name": "transition_in_bojaya"
}
</script>
<div class="lsv-interactive" id="transition_in_bojaya">
<img src="https://la-silla-vacia.github.io/transition_in_bojaya/screenshot.png" class="screenshot" style="width:100%;">
</div>
<script defer type="text/javascript" src="https://la-silla-vacia.github.io/transition_in_bojaya/script.js"></script>
<!-- END OF OUR INTERACTIE -->
```