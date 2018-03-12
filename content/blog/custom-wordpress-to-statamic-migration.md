---
date: 2018-02-14
description: Writing a bespoke script to migrate the mangled content from a Wordpress site to clean, structured JSON file to import into Statamic.
title: Wordpress to Statamic migration

---

The gentlemen over at [Statamic](https://statamic.com?rfsn=1078755.9626a) have just put out an [official Wordpress plugin](https://statamic.com/blog/goodbye-wordpress?rfsn=1078755.9626a) to help developers move their content over to Statamic. There was already plenty of good reasons to make the move, but the content migration was often a hurdle that was just too big for some developers.

Having migrated Bikesoup’s magazine from Wordpress to Statamic last summer, I can attest to just how awkward a process it can be. Fortunately, this new plugin makes it an incredibly simple process that takes just a few minutes to get the content moved over, leaving you plenty of time to use Statamic's awesome features you’ve been desperate to try out.

However, if your Wordpress site is a few years old or has developed something of a “plugin problem”, then unfortunately this plugin won't help much, and you’re still in for a rough ride. The magazine I migrated was around 8 years old and had just shy of 500 articles and a whopping 7000 image assets. Over the years many different plugins had been used which had modified the content in weird and wonderful ways, making a straightforward migration something of a fantasy.

## Why migrate in the first place?
I’ll save details of why Statamic is an incredible little CMS for another post, and instead focus on why we wanted the jump ship from the HMS Wordpress. Frankly, at the point that we decided to embark on what was effectively a complete rebuild, we would have settled for **any** CMS other than Wordpress.

When I joined Bikesoup, the magazine was going through something of a renaissance. It had a solid readership that was rapidly growing and thanks to our editor Anna Cipullo, it was starting to turn some heads in the industry. This was great, but from a tech perspective was something of a nightmare.

The site had reached a state of utter plugin-hell and was in desperate need of some security updates, but the previous developers hadn’t passed on any of the FTP or database credentials needed to make updates or backups! If the magazine was to continue growing, we needed to get this technical roadblock sorted!

I looked into a few options, and after consulting the people who would be using it, and maintaining it afterwards, we decided Statamic was the best choice.

## Going ahead with the migration
Unfortunately, no dedicated migration plugin existed at the time to neatly export content to a format Statamic would understand. However, because Statamic content is just Markdown files with some YAML front matter — the same as static site generators like Jekyll — there were plenty of options ranging from WP plugins to Ruby scripts that would convert the XML generated from WP’s native export tool. Once converted, I could run the output through a simple script to to replace Jekyll's naming and date conventions for Statamic's own.

However this area of the open source ecosystem has a lot of neglected and out of date options. Very few worked at all due to issues with out of date dependencies or differences in WP's export format, and those that did work discarded a lot of our data. I guess the nature of export scripts is that they're quite specific to their particular use case, and rarely needed more than once, so then get forgotten about.

I changed tack and tried to export the content to Contentful, a commercial API-based CMS. I was hoping that as a paid-for product wanting to entice developers from Wordpress there would be a rock-solid migration process. From there I could either use Contentful as intended with a static site generator, or try to export it from there, this time taking advantage of the extra structure that Contentful had created during import.

Once again, I was thwarted by the utterly mangled content that WP was exporting. The plugins had made changes to the content that realistically only WP and that particular plugin would ever be able to parse. An example was the small galleries that were dotted throughout an article. A plugin was added in around 2014 that inserted a “shortcode” into the content with an array of image `ids`. It should be obvious that this presents a problem when the environment you’re working in has no knowledge of the images, let alone the `id` they once held in Wordpress’ database.

It was at this point I realised the only route available would be a completely custom script.

## Going bespoke
I found a PHP script that took the XML produced by Wordpress and ran it through Wordpress’ own shortcode RegEx that it used when rendering. That seemed like a great starting point, so I cloned the repo and got stuck in. Unfortunately I can’t find the link to it, but if this sounds like a repo you once wrote — thank you!

This script got me about 80% of the way there, but the problem was that I am not — and probably never will be — a competent PHP developer. I struggled to extend it and get that last 20% correct, and still hadn't solved the issue of these shortcodes sprinkled throughout the markdown, I had just converted them to equally unstructured HTML.

The aim of this migration was to put the magazine back on a solid footing with clean content isolated from any markup, so it seemed pointless to settle for less. I ideally wanted to take advantage of Statamic's awesome Replicator field to create different “blocks” of content, so it seemed a shame to just munge all of these different types of content into a single string of Markdown.

Having learnt a lot from tinkering with the PHP script, I decided to start again using Javascript and targeting Statamic’s JSON import structure.

## A disclaimer
I’m going to walk you through the export script I ended up with. I’ve cleaned it up a LOT for this post, but it’s still an absolute monster full of huge loops, a very mechanical style and lots of hard coded variables — it’s a long way from the pure, functional patterns that I strive for in my work. This script is not remotely reusable and very clunky.

That said, when we ran the export it did everything asked of it, and I haven’t had to look at it since because it’s so specific to this one task. It’s an example of when objectively bad code can be perfectly acceptable in a given context. It’s a means to an end.

Throughout the process of writing the script, I was taking a random sample of posts across a range of authors and years to check that it was working as intended for all posts, and not just the most recent. This was tricky as the structure of the posts and their markup changed over the years as different plugins were added and removed. As I later found out, I didn’t quite cover all the edge cases, but selecting posts randomly after each iteration in the build process weeded out the vast majority of the quirks.

## The code itself
I’ve put the script in it’s entirety below, and commented the hell out of it so hopefully you can follow it. However, here’s the process it goes through in brief:

1. Start by parsing the XML created by the WP plugin “All Export” into a JS object. This lets you choose the fields to export from Wordpress' database and the format that you want. There was some back and forth here as I discovered I needed additional bits of data I had left behind.
2. Enter a huge `forEach` loop over all the posts.
3. Extract the simple stuff like titles, dates and slugs to variables for use later on.
4. Map the Wordpress author `id` to the Statamic author `id` which I already created in the new project.
5. Extract and store the Categories and Tags used on posts in variables, again to be used later. As they were also a complete mess, it was decided that we would just import them as they are, convert to Taxonomies in Statamic, and then deduplicate and clean them up later.
6. Download all the images related to each post, and then store them in a file system which could either be placed in Statamic’s `assets` folder directly or stored on Amazon S3. All URLs were changed from absolute to relative to allow us to chose where we would store images.
7. Start sorting the body of the post. I used RegEx extensively to find the various shortcodes within the body, and then extract the meaningful data from them. This was done for the `[gallery]` and `[caption]` shortcodes. Galleries were stored in an array to be later inserted between the content blocks. Captions were converted to a semantic `<figure>` element and placed back in their original locations in the HTML.
8. Create custom filters for the `toMarkdown` function to leave my newly created `<figure>` elements alone when parsing the HTML to MD.
9. Insert the gallery “blocks” from the array between the content blocks used within the Replicator field.
10. Store the post in a JS object that gets pushed to an Object of all articles with the correct `slug` and `date` fields acting as keys for the Statamic JSON importer.
11. Build the complete output object, targeting the structure required by the importer.
12. Parse the object to JSON and write it to a file. This can then be imported to Statamic from the Control Panel.

Brace yourself, here comes the code! Also viewable as a GitHub gist [here](https://gist.github.com/jamiedumont/f52399ff5f7fd0e75c40d85aa63d1476).

```javascript
// Grab all the dependencies we'll need for this.
var fs = require('fs'),
xml2js = require('xml2js'),
jsonfile = require('jsonfile'),
toMarkdown = require('to-markdown'),
_ = require('underscore'),
yaml = require('js-yaml'),
jsdom = require('jsdom'),
mkdirp = require('mkdirp'),
download = require('image-downloader');

const { JSDOM } = jsdom;

// Setup some variables that we'll need at the end of the script
var outputFolder = "./output/";
var parser = new xml2js.Parser();

// Read the XML file produced by Wordpress
fs.readFile(__dirname + '/wpexport.xml', function(err, data) {
  parser.parseString(data, function (err, result) {

    // All the posts
    const posts = result.data.post;

    // An empty Object that we'll push the finished posts too
    const articles = {};

    // Begin a huge loop over all the posts.
    // This is where 90% of the hard work gets done.
    posts.forEach((post) => {

      // Start with the simple stuff.
      // Grab the slug...
      const slug = post.slug[0];

      // ... the title (cleaning up ampersands)...
      let title = post.title[0];
      title = title.replace('&amp;', '&');

      // ... and the date.
      let date = post.date[0];

      // Create an array of all the image ids related to this post.
      // Will be used later when we're replacing gallery shortcodes.
      const image_ids_str = post.image_id[0];
      const image_ids = image_ids_str.split(',');

      // Each of these map to an author, where the key is the Wordpress
      // id and the value is the Statamic id. All names bar mine removed.
      const author_map = {
        6: "6624f5ee-0a6e-483e-83b5-34c588c6fcbf",
        16: "46aab519-0723-42dc-9c4a-51d321b03a49",
        13: "11e3d834-5713-4094-ad27-f4b48c588112",
        30: "34246703-a3da-4085-ba8f-8ccd8f65ba3b",
        29: "f2eda8a7-b4ca-4e85-9024-833628f1400a",
        28: "0ed28477-1918-43c4-ba69-6c406e8670f5",
        2: "df9649bd-82a8-43b9-83d4-ca1c28f08ca8",
        19: "633898d2-6477-4e2f-a4ad-c496becfd026",
        23: "9e61f6a5-3c52-44b1-8db0-5c82220012e0", //jamiedumont
        22: "580ed808-75b5-4510-986e-9462f67f6f44",
        27: "2f75983b-eb88-465e-9d4c-e6254ab9d3d3",
        20: "a21d452d-389e-4834-9bb7-45ba689500c1",
        31: "f89550ca-65dc-40af-ac52-48667411aa6f",
        25: "c7815f02-6166-4615-a93a-80245c8b14db",
        15: "59e5f70f-1942-4434-952d-ce90f85f240e",
        14: "7c789b99-0653-42ea-af2b-6541b989237d",
        26: "1eecf805-0f20-4de3-b7b5-2eae0c1e03f6",
        11: "ad250945-1538-4ce7-9282-e462f18e458b",
        21: "f91ea037-fbe8-4e4c-bb0c-44821569b77d",
        24: "b9a7129f-c2c3-4f7e-a955-ababe24f8ac6"
      };

      // Grab the Wordpress author id...
      const author_id = post.author[0];
      // ..use it to find the Statamic author id for later.
      const author = author_map[author_id];

      // Create an array of categories from the XML string
      const category_str = post.category[0];
      let category = category_str.split("|");

      // Clean up any ampersands again.
      category = category.map((cat) => {
        cat = cat.replace('&amp;', '&');
        return cat;
      });

      // Remove "Uncategorized" and empty elements from category array
      category = category.filter((el) => {
        return el !== ("Uncategorized" || undefined || null || '');
      });

      // Repeat the same process for "tags"
      const tag_str = post.tag[0];
      let tags = tag_str.split("|");

      // Remove empty elements from tags array
      if (tags[0] == "") {
        tags = [];
      }

      // Create an array of all the images used in the post (as URLs)
      const img_str = post.image_url[0];
      let images = img_str.split(',');

      // An array that will be used when replacing gallery and content references to images
      const urlsToReplace = [
        'http://www.bikesoup.com/magazine/wp-content/uploads',
        'http://s3-eu-west-1.amazonaws.com/bikesoup-magazine-image-assets',
        'https://s3-eu-west-1.amazonaws.com/bikesoup-magazine-image-assets'
      ];

      // An array that we'll later push too. Stores all the images for this post
      // after they've been made relative.
      const allImages = [];

      // Loop over all images in this post
      images.forEach((image) => {
        if (image) {
          // Fetch the file, and store at proper location
          // Replace the absolute URL with a relative one. All retrival must
          // take place before this.
          let imageOutput, fileDest, path;

          // Loop over the absolute URLs we want to replace, creating variations
          // that get used throughout download and storage process
          urlsToReplace.forEach((url) => {
            imageOutput = image.replace(url, '/assets/uploads');
            fileDest = image.replace(url, './uploads');
            path = fileDest.substring(0, fileDest.lastIndexOf("/"));
          });

         // Create the params required for the 'download' function
         const opts = {
           url: image,
           dest: path,
           done: function(err, filename, image) {
             if (err) { console.error(err); }
             console.log(`File saved to: ${filename}`);
           }
         };

         // If the required destination exists, download
         // the image to it. If not, create the destination, then
         // download the image.
         if (fs.existsSync(opts.dest)) {
           download(opts);
         } else {
           mkdirp(opts.dest, (err) => {
             if (err) { console.error(err); }
             else {
               console.log(`${opts.dest} created`);
               download(opts);
             }
           });
         }

         download.image(opts).then(({ filename, image }) => {
           console.log(`File saved to: ${filename}`);
         }).catch((err) => {
           throw err;
         });

          // Add the local location of the image to our array
          allImages.push(imageOutput);
        }
      });

      // Grab the lead_image of each post. Used in header of new design.
      const lead_image = allImages[0];

      // Images now stores a key:value mapping of Image UIDs to Image URLs
      // Used later when we replace gallery shortcodes
      let imageURLs = _.object(image_ids, allImages);

      // Grab the body of the post. This is HTML + shortcodes.
      // Now the fun really starts.
      let body = post.body[0];

      // Add a new function to String to replace all instances, not just
      // the first found.
      String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
      };

      // Weed out any absolute image URLs in the content.
      urlsToReplace.forEach((url) => {
        body = body.replaceAll(url, '/assets/uploads');
      });

      // A carefully crafted RegEx that grabs a gallery shortcode...
      let galleryRegex = /\[gallery ids=\".*?\"\]/g;
      // ... and the ids within it.
      let galleryImageUIDSRegex = /"([^"]+)"/;

      // Function.
      // Takes Regex match of gallery shortcode
      // Returns array of Image UIDs
      function returnImageUIDs(match) {
        let imageArray = match.match(galleryImageUIDSRegex);
        imageArray = imageArray[1];
        return imageArray.split(',');
      }

      // Function.
      // Takes array of UIDs
      // Returns replicator segment with required URLs for a gallery
      function returnGallery(uidArray) {
        let returnedImages = uidArray.map((uid) => {
          return imageURLs[uid];
        });
        return returnedImages;
      }

      // We'll push instances of galleries to this.
      let galleries = []

      // Use the RegEx from above to find the gallery instances
      body = body.replace(galleryRegex, function(match) {
        // Add it to our array...
        galleries.push(match);
        // ... leave an empty shortcode for us to replace later
        // with a Statamic Replicator block.
        return '[gallery]';
      });


      // Replace captions with images here
      let caption_regex = /(\[caption.*?])(.*?)(\[\/caption\])/g;

      // Very messily replace caption shortcodes with semantic <figure> elements
      body = body.replace(caption_regex, function(match, p1, p2, p3) {
        let imgTag = p2;
        let caption = imgTag.match(/(\/>.*)/g);
        caption = caption[0].substring(3);
        const dom  = new JSDOM(imgTag);
        const src = dom.window.document.querySelector("img").src;
        return `<figure><img src="${src}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`;
      });

      // Use the shortcode we put back to split the content into blocks.
      let bodyArray = body.split('[gallery]');


      // Create custom filters for the toMarkdown function. This gives us the right structure
      // (plenty of <p> tags) and preserves the <figure>'s we just created.
      let replaceSpanDiv = {
        filter: ['span', 'div'],
        replacement: function(content) {
          return content;
        }
      };

      let preserveFigure = {
        filter: function(node) {
          return node.nodeName === 'IMG' && node.parentNode.nodeName === 'FIGURE';
        },
        replacement: function(innetHTML, node) {
          return `<img src="${node.src}" />`;
        }
      };

      // For each content block, convert to markdown, using our custom filters.
      bodyArray = bodyArray.map(function(md) {
        let content = toMarkdown(md, { converters: [replaceSpanDiv, preserveFigure] });

        // Create a Replicator block for this section of content.
        let myObj = {
          type: "markdown",
          content: content
        };

        return myObj;
      });

      // Create Replicator blocks for each gallery.
      galleries = galleries.map(function(gallery) {
        let myObj = {
          type: "gallery",
          images: returnGallery(returnImageUIDs(gallery))
        };
        return myObj;
      });


      // Insert a gallery block between each content block, giving us the complete
      // Replicator field, called 'article_body' here.
      let article_body = bodyArray.reduce(function(arr, v, i) {
        if (galleries[i]) {
          return arr.concat(v, galleries[i]);
        }
        return arr.concat(v);
      }, []);

      // Arrange all the data for this post into an Object.
      let toYAML = {
        title: title,
        content: "",
        categories: category,
        tags: tags,
        top_story: false,
        author: author,
        description: post.meta_description[0],
        article_body: article_body
      };

      // Not all articles have lead images specified
      if (lead_image) {
        toYAML.lead_image = lead_image;
      }

      // Handles unpublished entries
      if (post.status == "draft") {
        date = `_2018-01-01`;
      }

      // The check for "slug" removes the one article that doesn't have one!!!
      if (slug) {
        // Insert each article into the global 'articles' Object (ln: 26) with it's slug as the key
        articles[slug] = {
          order: date,
          data: toYAML
        };
      }

    }); // End of huge posts.forEach loop.



    // Object to create the JSON format that Statamic expects
    const output = {
      collections: {
        // Here's all our posts.
        articles: articles
      },
      pages: {},
      // Not using taxonomies during import. Will be sorting those
      // later within Statamic
      taxonomies: {
        categories: [],
        tags: []
      }
    };

    // Write to file system.
    fs.writeFile("./bikesoup.json", JSON.stringify(output, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });
  });
});
```

## Did it work?
Well...yes!

It turns out that some posts didn’t get the image URLs within their content modified correctly due to a particular Wordpress plugin being used for short time period, and not showing up in my random sampling. We still occasionally find an old post whose images are `404`’ing, but all the images are still present in the file system and a quick modification to the URL fixes it. Beyond that it worked very well!

This process drove home just how important it is to ensure the consistency and integrity of your data, even if that data is long-form content. It remains up for debate whether a database or Markdown files is the best tool for this job — and that’s probably a debate for another time. What’s clear is that just storing a huge string of HTML in a database that’s got special shortcodes inserted in it, isn’t the correct way and doesn’t take advantage of the database’s capabilities in the slightest.

This migration was, to be honest, much more of an ordeal than I anticipated. That said it was entirely worth it. The benefits that Statamic provides over Wordpress can’t be overstated. The team is now able to iterate on the magazine, and it’s reliability, performance and uptime have improved dramatically.

If you’re in a similar situation where you’ve got a big ball of mud for content, then this process will be hard, and probably require similar levels of work to migrate. All I can promise is that you’ll sleep better once it’s done!
