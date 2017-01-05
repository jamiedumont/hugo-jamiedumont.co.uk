---
date: "2016-12-02"
title: "Discovering Tachyons"
description: "Using functional, single-purpose CSS classes to drastically reduce CSS complexity and update woes."
---

I’ve been using a CSS framework called Tachyons for the past 9 months, and I think I’ve fallen…hard. 

Back when I started this game, I think I built precisely one website using a “framework” before deciding it was all a load of bollocks. I bloated out the codebase with loads of styling I never used, and then worsened it by spending too much time over-riding all these styles.

I promptly threw the site in the bin, and started again…from scratch, writing all the CSS myself. Lesson learnt.

## ITCSS
It wasn’t long before I stumbled upon the benefits of SCSS and Harry Robert’s wonderful site;  [CSS Wizardry](http://csswizardry.com). If you are a developer, and haven’t encountered Harry and his work before, I thoroughly recommend setting aside some time and reading through his articles. You’ll learn a lot!

This discovery led me to slowly formulate my own SCSS framework loosely based on Harry’s ITCSS principle. It had a bunch of sensible defaults, utilities and basic components, although at a much lower fidelity than something like Bootstrap or Foundation. 

The framework became my de-facto starting point for every project, and saved me a good chunk of time. The other upshot was that it gave me a consistent environment  between projects, meaning that code could _largely_ be shared between projects, albeit with the occasional irritating bugs.

## Where I had problems…
My only gripes with it were that my “build efficiency” seemed to suffer. There was a lot of friction in my workflow, just because the ITCSS structure and BEM naming methods had me jumping between lots of different files.
My homegrown framework had created a weird love-triangle between my HTML, SCSS and the browser.

All of this was worth it right? Having a well documented, structured and consistent codebase would be worth this extra initial friction. What I lost in the actual _writing_ of my code, I’d make up for with easier, and faster comprehension when I came to make some updates 6, 12 or 18 months down the line. 

Unfortunately, I didn’t find that to be the case. When I came back to a project and encountered some code like this; I was stumped. 
``` html
<header class="header header--primary">
  <ul class="header__nav">
      <li class="nav__item nav__item--current">
      <li class="nav__item">
  </ul>
</header>
```

I first had to open up my browser to get a feel again for how the modifier classes - `header—-primary` - overrode the base classes, and what sort of CSS I was using underneath - `float?` `flex?` Not a clue from this markup!

To ensure that I adhered to [BEM’s open/closed principle](https://en.bem.info/methodology/css/#openclosed-principle), and didn’t pollute my codebase with repetitive code, I felt like I had to spend too much time getting to know my own code again before making any changes.

## Along came Tachyons
Like so many discoveries on the web,  I can’t remember how I ended up at the [Tachyons website](http://tachyons.io).  I had a quick flick through the [docs](http://tachyons.io/docs/) and read some of the [glowing testimonials](http://tachyons.io/#testimonials) and was intrigued.

Stupidly, I didn’t actually try it. I concluded that it was good for rapid prototyping and designing, but certainly couldn’t replace my robust SCSS framework. I went back to `Alt-tabbing`  through my workflow, and didn’t think any more of it…until I stumbled upon this [wonderful article](http://mrmrs.io/writing/2016/03/24/scalable-css/) by Tachyon’s creator; Adam Morse.

Everything he said made complete sense to me. Tachyons was the result of his discoveries and made the concept of a “single-purpose class” tangible. I also read some of his other articles and realised that he and I hold the same values _(upholding the web’s integrity, the user’s experience is the priority, etc)_ and decided I needed to have a crack at Tachyons.

I started slowly, and tentatively. I dropped the CDN hosted stylesheet into a project I was working on and just started using the odd class here and there as a quick extension to my SCSS framework. Just simple classes like `tc` to centre-align the text, or `pa2` to add some padding all the way around an element.

I quickly realised the value of the single-purpose classes, and how they could quickly be composed to form complex, yet simple to understand layouts. As I was building the front-end with React, I appreciated being able to stay in one file, and at a glance see how a reusable component would be styled in any environment. More and more Tachyons classes were used, and soon I was actively replacing my BEM classes with Tachyons.

It wasn’t long before my co-worker asked me

> “What are these funny little classes?”

Tachyons had been my little experiment. I had never intended it to become a part of the codebase. I explained the concept, the upsides, what I thought of it so far, and pointed him to the docs.

The next day, after he’d had a chance to play with Tachyons himself, we sat down and made the decision to make it part of the new site. We agreed that we’d write no new classes where Tachyons could work, and replace old BEM classes whenever we encountered them.

## But…maintenance!
That was many months ago, and I’m happy to report that Tachyons is still the best decision we made for this project; a ground-up rebuild of [Bikesoup](https://www.bikesoup.com). We’ve yet to remove all traces of the SCSS framework, I’m confident that there’s still lots we can trim!

This project was a big one too! As lead developer, I felt a huge amount of pressure to “get it right”, particularly having chosen such an unconventional option. <a href="https://www.quora.com/What-does-the-phrase-Nobody-ever-got-fired-for-choosing-IBM-mean">'Nobody ever got fired for choosing <strike>IBM</strike> Bootstrap, right?</a>

The benefits we’ve found go beyond the considerably smaller, tighter CSS file we’re loading to users. Being able to open up someone else’s markup and have it tell the whole story, in one file can’t be underestimated.

Tachyons has also acted as the most effective style-guide I’ve ever encountered! By carefully reviewing how Tachyons gets extended and altered to fit our needs (colour variables, additional classes), I can open up markup that I’ve never seen before and understand it like I wrote it myself 10 minutes ago!

Just as functional Javascript - and functional languages at large - have proven there are great benefits to having knowable, purposeful and isolated code; Tachyons has shown that the same concept works just as well - if not better - for CSS.

## React/Tachyons example
React and Tachyons are particularly good bed partners, so I thought I’d show you an example of how I’m using it. Below is the source code for a simple, yet reusable button component.

```javascript
class Button extends React.Component {
  constructor(props) {
    super(props);
    this._goRoute = this._goRoute.bind(this);
  }

  _goRoute() {
    if (this.props.href) {
      return FlowRouter.go(this.props.href);
    }
    if (this.props.type === 'submit') {
      return null;
    }
    console.warn(
      "If a button is not the 'submit' for a form, you should specify either an onClick() or and href target"
    );
    return null;
  }

  render() {
    const small = 'f6 ph2 pv1';
    const regular = 'f5 ph3 pv2';
    const large = 'f4 ph4 pv3';

    const noWidth = 'dib';
    const fullWidth = 'w-100 db';

    const noRadius = 'br0';
    const stdRadius = 'br2';

    const notDisabled = 'pointer';
    const disabled = 'disabled bg-light-gray white b--light-gray';

    const buttedLeft = 'br--right';
    const buttedRight = 'br--left';

    const primary = 'bg-primary white b--primary';
    const secondary = 'bg-secondary white b--secondary';
    const danger = 'bg-red white b--red';
    const ghost = 'bg-transparent primary b--primary';
    const ghostSecondary = 'bg-transparent secondary b--secondary';
    const white = 'bg-white secondary b--white';

    const buttonClasses = classNames(
      'tc', 'link', 'outline-0', 'ba', {
        [small]: this.props.size === 'sml',
        [regular]: this.props.size === undefined,
        [large]: this.props.size === 'lrg',

        [noWidth]: this.props.width === undefined,
        [fullWidth]: this.props.width === 'full',

        [noRadius]: this.props.radius === 'none',
        [stdRadius]: this.props.radius === 'standard',

        [notDisabled]: this.props.disabled === false,
        [disabled]: this.props.disabled === true,

        [buttedLeft]: this.props.butted === 'left',
        [buttedRight]: this.props.butted === 'right',

        [primary]: this.props.btnStyle === 'primary',
        [secondary]: this.props.btnStyle === 'secondary',
        [danger]: this.props.btnStyle === 'danger',
        [ghost]: this.props.btnStyle === 'ghost',
        [ghostSecondary]: this.props.btnStyle === 'ghost-secondary',
        [white]: this.props.btnStyle === 'white'
      }
    );
    return (
      <button
        onClick={ this.props.onClick || this._goRoute }
        className={ buttonClasses }
        type={ this.props.type || 'button' }
        disabled={ this.props.disabled }
      >
        { this.props.label }
      </button>
    );
  }
}

Button.propTypes = {
  label: T.string.isRequired,
  onClick: T.func,
  type: T.oneOf(['button', 'reset', 'submit']),
  disabled: T.bool,
  btnStyle: T.oneOf([
    'primary',
    'secondary',
    'danger',
    'ghost',
    'ghost-secondary','white'
  ]),
  size: T.string,
  href: T.string,
  width: T.string,
  butted: T.oneOf(['left', 'right']),
  radius: T.oneOf(['none', 'standard'])
};

Button.defaultProps = {
  btnStyle: 'primary',
  label: 'Click me',
  disabled: false,
  radius: 'standard'
};

export default Button;
```
