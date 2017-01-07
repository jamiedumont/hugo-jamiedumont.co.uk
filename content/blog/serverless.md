---
title: "Why I axed my serverless app"
date: "2016-11-27"
description: "I had built a single page, serverless app with the hottest 
technologies, and yet I put a bullet in it's head just days before it was 
ready to launch. Why?"
---

I recently axed a side project I when it was about 95% done, and more than a few people have since questioned me about the decision. The reasons were varied, nuanced and complicated. However, all stemmed from the fact that my decisions to use a serverless architecture had painted me into a corner.

I was building a Single Page App (SPA) with best of breed technologies, and yet I put a bullet in it's head just days before it was ready to launch. Why?

## The basics
The problem with critiquing a high-level concept like _“Serverless Single Page Apps”_, is that there are so many facets to the discussion. However, I’ll try to brief, and concentrate on being objective.

Let start with what we know…

Any web application will require that inputs are handled, data is processed, and resulting HTML to be rendered to the end user. This is an infinite loop of inputs, updates and reflected changes. I’m not teaching you to suck eggs, merely emphasising a fundamental rule.

SPAs take a large chunk of the code required for these essential, fundamental tasks, and transfer them from a secure, powerful, known environment (the server) to an insecure, (almost-certainly) less powerful, and unknown (perhaps even hostile) environment (the browser); all over what could be a slow or intermittent connection.

That's one hell of a sentence, so lets break it down a bit... The architecture I chose relied on two things, client-side javascript and a serverless-backend.

## “Serverless” apps
The latest trend for serverless apps, where we do away with servers altogether; and instead rely on an orchestration of services is an interesting one. These days there is a service to cover pretty much every possible feature and function your app might need.

The benefits of this approach is meant to be a fast setup, reliable functionality that you don't have to maintain and instant access to features that would take a long time to build. I didn't have a huge amount of spare time for this side project, so I wanted some of that!

In many way, [Firebase](http://firebase.google.com/) epitomises this architecure, so I thought I’d take it for a spin! It would handle data-storage, user authentication, hosting plus a handful of other useful features such as asset management. [Stripe](https://stripe.com/gb) , alongside it’s [Checkout](https://stripe.com/checkout) would handle my payments and [Algolia](https://www.algolia.com) would take care of the search functionality.

### You might need that server after all…
The problem I had was that services like Stripe and Algolia require certain code to be run in a server-only environment. The browser wouldn’t do. That meant that I had to somehow procure a server… Guess we're back to square one...

Fortunately I stumbled upon [Webtask.io](https://webtask.io), created by the guys at [Auth0](https://auth0.com), which dug me out of this particular hole. Webtask lets you run a snippet of code on a NodeJS server triggered with an HTTP request. The alternative here was setting up my own NodeJS server, or configuring a similar process on AWS Lambda; both far more involved, so thumbs up to the Auth0 for providing a solution to an irksome problem!

### Querying troubles
My next hurdle was that if you’re at all used to any sort of database, Firebase’s querying functionality is spartan to put it politely. It instead relies on data being stored in a large JSON tree, and accessing it at the right location to get the data you need. 

This requires a lot of data denormalisation (multiple copies of the same or similar data in many places) which takes a while to get your head around, particularly when Firebase’s authorisation for access to this data is assigned to parent nodes and cascades, meaning that setting liberal authorisation at the wrong point could expose far more data than you intend!

In short, to get the same features as from a database (even a NoSQL one) you need to do some serious mental acrobatics to ensure that all your data can be accessed in all possible situations, and remains secure across users, but has more liberal access for “admins”. 

I ended up writing a huge amount of the authorisation and user permissions within the app itself, rather than let the data-storage be responsible for it’s own integrity (as per a regular DB). This meant that now an error in my code could not only cause my users to suffer a bad experience, but a mistake could leak sensitive data or compromise the accuracy of the information I’m storing, all without any safety net. Intimidating stuff!

### You don’t “own” your app
Something I hadn’t considered when opting to build an SPA using many services, is that I don’t own any of the core components of my app. If I did consider this issue, it was fleetingly, and I must have decided the improved build time and easy scaling was worth it.

However, the result is that your application's logic and data is fragmented and spread across the internet in lots of little silos. I found juggling each services responsibilities, accounts and different APIs frustrating. For the same reason gluing together lots of libraries is less rewarding and more draining than writing something yourself, making all the different services work **well** together was tricky.

Using this orchestration of services also puts you at the mercy of **any** of your third-party providers. As Rob Connery has shown over the last few weeks through a series of increasingly distressed (and resigned) tweets, handing over this control to third parties is a recipe for a lot of unexpected setbacks.

Rob’s article: [Trying Out The “Serverless” Thing While Bootstrapping My New Company](https://medium.com/@robconery/trying-out-the-serverless-thing-while-bootstrapping-my-new-company-6763a9de7ed#.2kbaykbah)  and the following discussion on Twitter was actually what prompted this post.

I’ll just conclude with a quote from his article...

> The longer you stay with a PaaS, SaaS, or framework, the closer you come to the day they let you down.  

## Client-side Javascript apps
The “serverless” architecture wasn’t the only reason that I drew a line under this project. I realised that single page apps, totally reliant on javascript, cast aside decades of very astute work with the declarative languages of the web; HTML and CSS. I wasn’t willing to try and recreate all that work in a brittle, imperative language, where there is little margin for error.

I'll be tackling this side project again, but instead using my more familiar tools: a robust back-end server built with [Elixir](http://elixir-lang.org) and [Phoenix](http://www.phoenixframework.org), serving HTML and CSS, enhancing with Javascript only where it's needed.
