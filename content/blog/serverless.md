---
title: Why I axed my serverless app
date: 2016-11-27 00:00:00 +0000
description: I had built a single page, serverless app with the hottest technologies,
  and yet I put a bullet in it's head just days before it was ready to launch. Why?

---


I recently axed a side project I when it was about 95% done. It was going to be my first side project that might actually make a little money! I had been excitedly telling all my friends and family about it, and whilst we all knew it'd never allow me to retire and sip Pina Coladas on a beach somewhere; it might provide a glimpse of that much revered "passive income".

You can imagine their faces when I told them I had decided to stop the project! I had been hyping it up for weeks as it started to come together ready for launch, so the sudden change of heart was a surprise to all involved.

Unfortunately, it wasn't a surprise for me. I think I had known for a few weeks that I had been painting myself into a corner, and that sooner or later I'd either have to seriously alter the application, or drop it entirely.

This was going to be my first, real, money-making project — and I put a bullet in it's head just days before it was ready to launch. Why?

## Serverless...

Having recently completed quite a complex Javascript app for Bikesoup, I was confident. I used React for Bikesoup purely because it seemed to be the UI that was being championed by Meteor at the time (having moved away from recommending their own Blaze library). I had enjoyed using React, but felt there was a lot of ceremony involved, and was curious about Vue having heard good things about it from the Laravel / Statamic community.

Not wanting to build another Meteor application, I decided to use something that we had debated for Bikesoup's application — Firebase.

They had just introduced a host of new features that promised to make the process of building my app so much easier, all whilst I was still on their free tier meaning zero hosting costs. It was too good an offer to pass up on!

So, I had just decided to build a Firebase backed (and therefore "serverless"), single page application. I certainly didn't appreciate the implications of this fully...

### Some Web-app basics

Just so we're all on the same page, here's quick recap of the fundamental requirements of any web application.

In short, an application is nothing more than an infinite loop of inputs, updates and reflected changes. A user's inputs are handled (validated, coerced, etc), data is processed (stored or received) and the changes to the applications state are reflected on screen for the user.

On the web, this has always been done server-side, with the browser only doing the most basic form validation client-side, and rendering the HTML & CSS that is delivered from the server. Javascript was used either to overcome shortcomings of CSS, provide some animations or add some "sprinkles" that made the interaction easier or clearer to the user.

A server less, single page app takes a large chunk of the these fundamental responsibilities, and transfers them from a secure, powerful, known environment *— the server —* to an insecure, almost-certainly less powerful, and unknown  or perhaps even hostile environment — *the **browser. *And all of this business logic, data-processing and code is transferred over what could be a slow or intermittent connection.

That's one hell of a paragraph, so let's break it down a bit...

The latest trend for serverless apps, where we do away with servers altogether, and instead rely on an orchestration of services is an interesting one. These days there is a service to cover pretty much every possible feature and function your app might need.

The benefits of this approach is meant to be a fast setup, reliable functionality that you don't have to maintain and instant access to features that would take a long time to build. I didn't have a huge amount of spare time for this side project, so I wanted some of that!

In many way, [Firebase](http://firebase.google.com/) epitomises this architecure, so I thought I’d take it for a spin! It would handle data-storage, user authentication, hosting plus a handful of other useful features such as asset management. [Stripe](https://stripe.com/gb) , alongside it’s [Checkout](https://stripe.com/checkout) would handle my payments and [Algolia](https://www.algolia.com) would take care of the search functionality.

### You might need that server after all…

The problem I had was that services like Stripe and Algolia require certain code to be run in a secure, server-only environment. The browser wouldn’t do. That meant that I had to somehow procure a server… Guess we're back to square one...

Fortunately I stumbled upon [Webtask.io](https://webtask.io), created by the guys at [Auth0](https://auth0.com), which dug me out of this particular hole. Webtask lets you run a snippet of code on a NodeJS server triggered with an HTTP request. The alternative here was setting up my own NodeJS server, or configuring a similar process on AWS Lambda; both far more involved than I was after for this project, so thumbs up to the Auth0 team for providing a solution to an irksome problem!

### Querying troubles

My next hurdle was that if you’re at all used to any sort of database, Firebase’s querying functionality is spartan to put it politely. It instead relies on data being stored in a large JSON tree, and accessing it at the right location to get the data you need.

This requires a lot of data denormalisation (multiple copies of the same or similar data in many places) which takes a while to get your head around, particularly when Firebase’s authorisation for access to this data is assigned to parent nodes and cascades, meaning that setting liberal authorisation at the wrong point could expose far more data than you intend!

In short, to get the same features as a database (even a NoSQL one) you need to do some serious mental acrobatics to ensure that all your data can be accessed in all possible situations, and remains secure across users, but has more liberal access for admin users.

I ended up writing a huge amount of the authorisation and user permissions within the app itself, rather than let the data storage be responsible for it’s own integrity as per a regular DB. This meant that now an error in my code could not only cause my users to suffer a degraded experience, but a mistake could leak sensitive data or compromise the accuracy of the information I’m storing, all without any safety net. Intimidating stuff!

### It's a question of ownership too

Something I hadn’t considered when opting to build a single page app hooked up to many services is that I come to rely directly on those services.

The result is that my application's logic and data was fragmented and spread across the internet in lots of little silos. Even the logic within the application was itself reliant on data structures outside of the codebase, controlled by third parties. I found juggling each service's responsibilities, accounts and different APIs frustrating. For the same reason gluing together lots of libraries is less rewarding and more draining than writing something yourself, making all the different services work **well** together was tricky.

Using this orchestration of services also puts you at the mercy of **any** of your third-party providers. As Rob Connery has shown over the last few weeks through a series of increasingly distressed tweets, handing over this control to third parties is a recipe for a lot of unexpected setbacks.

Rob’s article: [Trying Out The “Serverless” Thing While Bootstrapping My New Company](https://medium.com/@robconery/trying-out-the-serverless-thing-while-bootstrapping-my-new-company-6763a9de7ed#.2kbaykbah)  and the following discussion on Twitter was actually what prompted this post.

I’ll just conclude with a quote from his article...

<blockquote>
<p>The longer you stay with a PaaS, SaaS, or framework, the closer you come to the day they let you down.</p>
</blockquote>

## Client-side Javascript apps

The “serverless” architecture wasn’t the only reason that I drew a line under this project. I realised that single page apps, totally reliant on Javascript, cast aside decades of very astute work with the declarative languages of the web; HTML and CSS. Even though I had tackled much of it, I just wasn’t willing to try and recreate all that work in a brittle, imperative language, where there is little margin for error.

I'll be tackling this side project again, but instead using my more familiar tools: a robust back-end server built with [Elixir](http://elixir-lang.org) and [Phoenix](http://www.phoenixframework.org), serving HTML and CSS, enhancing with Javascript only where it's needed.