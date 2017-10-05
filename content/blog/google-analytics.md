---
date: "2017-10-05"
description: "I questioned how this site — along with many others — benefits from having Google Analytics installed to track user behaviour."
title: "Does using Google Analytics make sense for your site?"
---

I’m in the process of putting together a nice introduction to website testing, but stumbled upon a flaw in my own practices whilst doing so.

I have always installed Google Analytics (GA) on every website I build as part of my default process. When asked, I have never had any client refuse an install. After all, why would they? 

> “Here, have this industry standard platform that if used properly can dramatically improve the performance of your business; for the grand sum of £0.  
> …What? You don’t want it? Are you mad?”  

I installed it on this site without question. However, writing an introduction to testing made me realise that the most attention it’s had since install is a cursory glance to see if anyone is even reading the damn thing!

From looking at at the multitude of GA dashboards I have access to, and speaking with fellow developers; this seems to be a pretty common scenario. Most installs are neglected, rarely used and aren’t configured with even the most basic of goals or user segmentation!

As I understand it, most people use it this way. They take a look at the superficial metrics and see whether traffic is going up or down. That's it...

Used this way, the most insight you can derive from it is some causal link between an event like a product launch or mention on Hacker News and a change in traffic. Whilst interesting (and likely expected) it doesn't really teach you much.

The truth of the matter is that without someone who understands analytics in depth to customise an install and attempt to draw conclusions meaningful to a business’ goals; the value of a Google Analytics install approaches zero.

## So why do we keep installing it?
I think that the crux of it — along with GA being totally free — you get access to data that you might need in the future. When/if you do start testing and optimisation, you’ll have plenty of data to work with, dating back to the site’s launch. It's the *"just-in-case"* mentality at work.

The problem with this thinking is that unless you actually configure GA to monitor the metrics you care about, most of that data you’ve collected is next to useless. It is really hard to retrospectively query GA and get the depth and specificity you need to make meaningful conclusions.

I've once had someone tell me how important it is that you're “doing analytics” — whatever the hell that means — and that they found it utterly fascinating. I was curious, and asked what sort of testing they were doing, and what results they had seen from the process. Turns out they were just watching the real-time traffic go up and down…

Unless you are willing to dedicate real resources (people, time & money) to analysing the data you’re collecting, and are willing to act on the insights you derive; then adding analytics to your site is a waste of time.

## What if I didn’t install Google Analytics?
Well, on this site at least, not much would change. I’d lose 2 network requests and the page would be ~80kB lighter. My site is light and fast anyway, so even though that represents over a third of my site’s weight, it doesn’t make any real world differences to it’s performance.

I certainly wouldn’t miss GA — as I said — I barely used it anyway. I've never been one to let analytics dictate the type of content I'll publish, and having seen that strategy used first hand, I can tell you that it results are questionable.

One benefit I'd see is that I could proudly state that this site wouldn't track or store data on any of it's users — something that people are becoming inreasingly concerned with, and with good reason!

Whilst there’s no proof that Google is doing anything untoward using the data it collects from GA; their history on user privacy doesn’t play to their advantage. Some speculate that it can impact your PageRank, which I wouldn't write off as unlikely.

As a search engine, their goal is to deliver the information people are searching for as promptly and accurately as possible. If they can use data gathered from your site about a user’s interaction and engagement with your content, I find it hard to believe they **wouldn’t** want to roll that into their page ranking calculations in some format.

I’ll put my tinfoil hat away, and refrain from digging into this too much, but from my perspective — because I don’t use it — the only person that benefits from Google Analytics being present on my site is Google. Google are in the unique position of having access to almost all of the western world's web traffic, something that gives them huge control over other companies and technologies. It’s been said that if you’re not paying for something, then you’re not the customer: you’re the product. 

## It’s not all bad.
Before we all jump on the _“Google are evil”_ band wagon, I just want to state for the record, in bold so that no one can claim they missed it:

**Proper A/B testing and data-based decision making can ABSOLUTELY improve a websites performance and usability; and Google Analytics _can_ play a crucial role in that.**

I've used Google Analytics in the past to uncover insights that have yielded impressive returns for my clients. It is definitely fit for purpose. However, I’ve also found it to rarely be the best tool for the job, and that alternatives are well worth looking into if you are going to be taking testing seriously.

Want I want you to question is, if you’re like a vast number of Google Analytics users, and you don’t use it for anything more than superficial page views; do you really need it? 

It might be worth uninstalling it if you can't point to any tangible benefits.

As an alternative, can I suggest reaching out to your users or readers personally, and starting a conversation? I suspect that what they have to say will provide more information than any of Google's dashboards, and you'll have improved the connection between yourself and your customers.

## Until next time…
My upcoming introduction to analytics & testing will take a much more detailed look at when you should start testing and what you’ll need to make it worth your while. 

Until then, perhaps question some of your default decisions. I did, and found that Google Analytics has no place on this site.
