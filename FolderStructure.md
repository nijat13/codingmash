```

 _designs/
  │   You can drop your design sketches here.
  │   Added to .gitignore
  
 dev/
  │   
  └─── _sass/
  │    │   file011.txt
  │    │   file012.txt
  │    │
  │    └───subfolder1
  │         │   file111.txt
  │         │   file112.txt
  │   
  └─── _templates/
  │    │    Main layout. (`index.hbs`)
  │    │ 
  │    └─── _includes/
  │    │    │   Here you can create components that should be included.
  │    │    │   As an example here you can see the `footer.hbs`, `head.hbs`, `header.hbs`. They have imported in the `../index.hbs`.
  │    │    
  │    └─── _pages/
  │         │   Here you can create pages..
  │         │   For example added `index.hbs` as main page.
  │         │   For example added `index.hbs` as main page.
  │
  └─── fonts/
  │    │    Custom fonts. For example you can drop `entypo.ttf` and make `grunt fonts`.
  │    
  └─── js/
       │    All js files that written inside `script/` folder contcats to `app.js` file.
       │ 
       └─── assets/
       │    │   Libraries and frameworks.
       │    │   Now we have `bootstrap.js`(framework) and `jquery.js`(library).
       │    
       └─── build/
       │    │   `Compact.js` - JS file which contains all possible js files inside `js/*/` folder
       │    │   For example added `index.hbs` as main page.
       │    
       └─── script/
            │   JS files that you have created.
            │   Now we have only `app.js`, which you can use as main js file.

 public/
  │   Generated `*.html` pages, that you've created in `dev/_templates/_pages/*.hbs`.
  │   Default favicons by me :)
  │
  └─── content/
  │    │  Content images from design.
  │   
  └─── css/
  │    │  Minimized css files from `dev/_scss/*.min.scss`. Note: All `*.min.scss` files, it won't generate the `design.scss` as there's no `.min`.
  │
  └─── fonts/
  │    │  Fonts generated from `dev/fonts/`
  │  
  └─── img/
  │    │   Images.
  │    │
  │    └─── pico/
  │         │   Generated icons as one `.png` file from `dev/_sass/_molecules/icons.scss`.
  │    
  └─── js/
       │   Coppied js files from `dev/js/`. It can be useful if client wants non-minimized files. For that you need to run `grunt build`
       │
       └─── min/
            │   Minimized js files from `dev/js/`. It's auto generated when `grunt serve` or `grunt watch`.
      
```
