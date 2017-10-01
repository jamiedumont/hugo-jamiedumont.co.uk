+++
date = "2017-09-07T15:04:46+01:00"
title = "'Uses'"

+++

Here's a mostly complete run down of the tools and software that I use on
a near daily basis to get my work done. For now, I've just listed the software,
but in time I'll add the hardware and services I use too.

This post was inspired by — and very similar to — [Harry Robert's
list.](https://csswizardry.com/uses/) 

<hr />

# Software

### iTerm2 & Blink
Coming to web development as designer, I had the sort of irrational fear that
you'd expect someone accustomed to beautiful, intuitives GUIs to have. That
didn't stop me really — I mean _really_ — wanting to get comfortable on the
command line; it just felt the "proper" way somehow.

It took time, but I now can't imagine living without a terminal of some sort
open. On macOS that's iTerm2, and on iOS that's Blink. 

I won't talk about iTerm2, enough people have already, and it's the defacto
terminal anyway.

More people ask me about Blink. In short, it's the best terminal/SSH client for
iOS that I've found. Of course you can't access the iPad's local filesystem
with it, but SSH'ing into a remote server gives me a perfect working
environment.

Blink's party-piece however is it's support for Mosh, which is a replacement
for SSH that's far more robust and resilient to flaky connections — perfect for
roaming and working around Cornwall with it's spotty data service!

### Neovim
Much like using the Terminal rather than Finder, I felt that an editor like Vim
was the "proper" way (NB: there is no "proper" way, this was just my wide-eyed
enthusiasm having seen people work using Vim). Learning an editor like Vim
doesn't come easily, as I'm sure many people know; but the pay-off is well
worth it (again, as I'm sure many people know).

Whatever editor you choose to use, it pays to learn it well, inside and out,
until you don't have to think about what you're doing. 

Vim was really ellusive for me for a long time. The combination of weird key
sequences and complex plugin setups to reach feature parity with Sublime
stalled me for a long time.

I cracked it by using Spacemacs, with "Evil" mode enabled. It provided me all
the toys that I needed out of the box to get started, with the list of
available options displaying at the bottom being particularly useful. It
allowed me to focus on the "Evil" part — the Vim movements and commands.

Eventually however, I grew tired of Spacemacs really slow startup, and ran into
some configuration issues that I just couldn't resolve. This is the problem
with using someone else's configuration for an editor like emacs or vim, it's
fine until it goes wrong and you have to debug something totally alien! I found
the solution was the classic (Neo)Vim + Tmux combination. My reason for using
NeoVim is simply that it allows for async linting.

### Tower (Git)
From what I've heard, I'm fortunate enough to have never used Subversion. My
only experience of VCS has been Git. As with everything else, I started out
using nice comfortable GUIs that my designer-brain could handle. Tower seems to
be the defacto Git client for OS X, although there seems to have been more and
more released the last few years.

My work on remote servers (using the iPad) has forced me to learn Git's CLI,
which I'm perfectly happy with, but I still find myself firing up Tower
whenever I'm on my laptop for some reason. I never do any really complex
branching or merges, so I think that it's more habit than anything else!

### Browsers

Safari is my go-to for almost everything. I like it's bookmark and tab syncing
with my iPad and iPhone, and love the reduced CPU usage and resulting battery
life.

However, it's pretty useless for developers. Sure, the built-in inspector is
perfectly fine — but compared to Chrome and FF Developer with their array of
plugins, it just can't compete. I'd love to see a developer-focused version of
Safari the same as Firefox has done.

Chrome gets utilised mainly for React & Vue development, purely because of the
plugins available to assist with debugging. That said, I prefer the Firefox UI
and functionality — screenshots for example.

### Sketch

I started using Sketch about 5 years ago when Adobe decided that Creative Cloud
was a good idea. Sketch felt like a good protest purchase, but it turned out to
be a fantastic alternative. I can't imagine doing any of my design work in an
Adobe product now.

Sketch has got really, really good the last few years; and even though they've
sort of switched over to a pseudo-subscription business model, I'll happily
keep renewing my license. I'd love for them to create an iPad version, as much
as I know it's unlikely.

**_Sidenote:_** Affinity's Designer and Photo are fantastic alternatives to
Adobe if Sketch doesn't float your vote. They are much closer to Adobe's
applications in layout and mental-model, but world's apart in terms of
performance and price. How they can build such brilliant apps for the money
they are charging boggles my mind. Their addition of iOS apps, and an Adobe
Indesign equivalent could cement their place as the company to beat here!

### Slack

I use Slack. I'm not as impressed as I was with it when I first started using
it. I've found their recent versions a memory hog, and I'm rapidly going off
the concept of instant-messaging in general. It's incredibly distracting, and
not as great for running a business as we all think it is.

### Things 3

After years of trying loads of task manager and finally settling on just
a simple notebook; Cultured Code released Things 3. When I originally wrote
about it at release, I suggested it might be the only app capable of pulling me
away from pena & paper. Turns out I was right...

### Messages

If there's one thing that keeps me glued to Apple's ecosystem, it's the ability
to send iMessages from my laptop. As a messaging platform, I think it hits the
sweet spot; although I couldn't care less about all the stuff they keep adding
to it...

### 1Password

If you're not using a password manager these days, I'm not sure how you manage!
I put a lot of faith in the security of 1Password (perhaps naively!) because it
stores _everything_, and I mean *everything* important. I think that the family
plan (to share some of your passwords with others) is overpriced, but if that's
what they need to charge to make it secure; so be it.

### Backblaze

I've got very lazy the last few years with my local backups. I rarely, if ever,
back up my laptop to a local drive. This is partly because most of my work
lives in Git repos these days (rather than .PSD files), and partly because of
Backblaze. That said, I think I'd rather be using something like Arq and AWS S3
or Backblaze's B2 storage — just because it's an open format that I can access
multiple ways.

<hr />

## Hardware 

Full details coming shortly. For now, here's a brief list:

- 2015 MacBook Pro 15"
- iPad Pro (big one)
- iPhone 7 Plus
- BaronFig Confidant
- B&O H7
