# Simple Selector

Simple Selector is an es6 class used to create easily styleable select input. Simple Selector will create an HTML template that visually takes the place of your standard select tag.

## Installation

```bash
npm i simple-selector
yarn add simple-selector
```

##### Note: Version 2.0.0+ includes breaking changes. You will need to update your working environment to reflect this update, or continue using the latest 1.5.0 release.

```bash
npm i simple-selector@1.5.0
```

## Usage

```html
<select name="my-select" id="MySelect" class="js-select">
	<option value="1">View All</option>
	<option value="2">Option 1</option>
	<option value="3">Option 2</option>
</select>
```

```es6
import SimpleSelector from 'simple-selector';

const select = document.querySelector('.js-select');

const Selector = new SimpleSelector(select, {
    placeholder: 'Select your favourite.',
});
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| search | Boolean or String (default: 'Search') | True / False to enable / disable String will be true and change the placeholder text. |
| class | String (default: 'selector') | If you want more than one style of selector, you can change this class to suit your needs |
| placeholder | String (default: placeholder attribute or 'Select') | Will update the default text on the Simple Selector |
| autoClose | Boolean (default: true) | When multiple is false, autoClose: true will close the Selector when an option is clicked |

# Methods

#### The majority of the SimpleSelector functionality should happen automatically, although you may need to take control manually on some occations.

## Update the options dynamically

If the options in the default select have been updated dynamically, simply call the reinit() method.
You may also optionally need to call the update() method

```es6
SimpleSelector.reinit();
SimpleSelector.update();
```

## Callbacks

Each of the following methods has a callback. These can be used with the on() method
 - reinit
 - update
 - open
 - close
 - filter

```es6
SimpleSelector.on('update', (selector) => {
    console.log('selector updated!');
});
```

## SCSS Mixin - defaults

```scss
.selector {
  @include simple-selector (
    $min-width: 32rem,
    $border-radius: 0,
    $border-width: .1rem,

    $header-color: $black,
    $header-border-color: rgba($black, .2),
    $header-background-color: $white,
    $header-padding: 1rem 4rem 1rem 2rem,

    $chevron-color: $black,

    $list-border-color: rgba($black, .2),
    $list-background-color: $white,
    $list-padding: 0,

    $search-color: $black,
    $search-border-color: rgba($black, .2),
    $search-background-color: $white,

    $option-color: $black,
    $option-background-color: $white,
    $option-transition-speed: 0.3s,

    $option-color--hover: $black,
    $option-background-color--hover: rgba($black, .1),

    $option-color--active: $white,
    $option-background-color--active: rgba($black, .6),
  )
}
```

## Browser Support
**Desktop:**
Firefox 16+ ✓
Chrome 15+ ✓
Safari 5.1+ ✓
IE 10+ ✓

**Mobile:**
Safari iOS 5.1+ ✓
Chrome Mobile 47+ ✓

**Note:**
(Might work on earlier versions of chrome, but I couldn't test it.)


## License
[MIT](https://choosealicense.com/licenses/mit/)

