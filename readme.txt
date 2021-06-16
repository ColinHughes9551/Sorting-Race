Readme for sort_race
Time-stamp: <2020-10-27 13:37:23 Colin Hughes>
------------------------------------------------------------

Class Number: 335-02
Team Name: Walkin
Team Member(s): Colin Hughes
Project Number 2, Sort Race


Intro

  This HTML page features 4 sorting algorithms which concurrently sort a hexadecimal string, one pass at a time until all 4 are completed. The 4 sorting algorithms present are Insertion Sort, Gold's Poresort, Mergesort, and Quicksort. In order to accurately compare the algorithms, a random string is chosen from a list of possible inputs when the page is loaded, and after all 4 algorithms are finished, the string is rotated by 1 character and the race starts over until every possible permutation of the string has been tested.


Features 

  A random hexadecimal string is selected on loading or refreshing the page, offering several different races to watch.

  Pressing the space bar will skip to the next "lap" of the race by rotating the string one character and starting the sorting algorithms over.
  Pressing the left arrow key will decrease the speed at which the passes occur, down to 1 pass per second.
  Pressing the right arrow key will increase the speed at which the passes occur, up to 60 passes per second.
  Pressing any other key will pause the race, allowing for easier viewing of the partially sorted strings.


Zip Contents

  File readme.txt.  This file.

  File index.html. Drag and drop this into a browser to
    run the example.

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js; This contains several P5 user-defined linkage functions
   (setup, draw, keyPressed, and mousePressed), as well as example
    support functions.  P5's setup() is run once before page display.
    P5's draw() is run once per display frame, so you can do animation.
    The majority of the javascript functions handling the race have also been implemented here.

  File assets/styles.css.  This is an extra-small example of controlling
    webpage styling.  // Loaded inside the html.


Installation & Running

  1. Extract the .zip file into a folder.

  2. Drag the main HTML file, index.html, into a browser
    window.  The example P5 program should start immediately with a randomly selected 


Known Bugs


Warnings

  o- Time is still alloted for all 4 sorting algorithms, even when they are finished, so the passes will seem to slow down when there are less than 3 algorithms running.

Testing

  o- Following installation instruction, above, watched it run, and confirmed all hotkeys work.
  Only tested on Google Chrome with a single dell keyboard.


Credits

  Code based on Professor Siska's starter code, which was based on Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.

  And, of course, thanks to the HTML and P5.js developers.
