// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: 2020-10-27 12:23 Colin Hughes

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:20, wid:80, hgt:40 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 15; // Update every 'mod' frames.
var g_stop = 0; // Go by default.


/// SETTING THE RACES UP
function setup()
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    rm.str = random_unsorted_string();
    start_race();
}

function random_unsorted_string( )
{
    let unsorted = []; // create a temporary array
    unsorted.push(
        "05CA627BC2B6F03",
        "065DE6671F040BA",
        "0684FB893D5754E",
        "07C9A2D183E4B65",
        "09F48E7862D2616",
        "1FAB3D47905C286",
        "286E1D0342D7859",
        "30E530C4786AF21",
        "328DE4765C10BA9",
        "34F2756F18E90BA",
        "90BA34F0756F180",
        "D7859286E2D0342"); // fill the array with our sample inputs
    
    return unsorted[Math.floor(Math.random()*unsorted.length)]; //return random element from array of strings
}

// RACE MANAGER ATTRIBUTES
var rm = { str:"4321", str_offset:0, row:0, col:0, raceflag:false }

// SORT MANAGER ATTRIBUTES
var is = { str: "", sortflag:false, i:1 }                       // Insertion Sort
var ps = { str: "", sortflag:false, db:false }                  // Poresort
var ms = { str: "", sortflag:false }                            // Mergesort
var qs = { str: "", sortflag:false, process:0, override:0 }     // Quicksort


/// STARTING THE RACE
function start_race( )
{
    clear(); // remove the current cells from canvas

    // reset all values needed to run the race
    rm.row = 0;
    rm.col = 0;
    for ( rm.col = 0; rm.col < 4; rm.col++ )
    {
        fill_cell(rm.col, rm.row, "red"); // put background fill on cell
        manager_print_name ( rm.col ); // print the name of each algorithm
    }
    rm.row = 1;
    rm.col = 0;

    if (rm.str_offset < rm.str.length) // check if every possible rotation has been used yet
    {
        manager_setup( rot_str( rm.str, rm.str_offset ) ); // pass in rotated string
        rm.str_offset++; // increment offset for next lap
    }
    else
    {
        //this is where the race needs ends
        clear(); // remove the current cells from canvas
        rm.raceflag = true;

        fill( "gold" ); // fill cell with given color
        stroke("black");
        rect( width/2-400, height/2-100, 800, 200 ); // Fill the cell

        fill( "black" )
        textAlign(CENTER, CENTER);
        textSize(48);
        // present text indicating end of races
        text( "RACE ALL CLEAR", width/2, height/2 - 40 );
        text( "REFRESH FOR NEW RACE", width/2, height/2 + 40 );
    }
}

function rot_str( str, x )
{
    var a = x % str.length; // contain rotation within string side
    var b = str.length - a; // find cutting point
    // cut stirng in to 2 substrings
    var c = str.substr(b,str.length);
    var d = str.substr(0,b);
    // add substring together before returning
    return c + d;
}

function manager_setup( str )
{
    // input string and reset managers here
    is.str = str; is.sortflag = false; is.i = 1;
    ps.str = str; ps.sortflag = false; ps.db = false;
    ms.str = str; ms.sortflag = false;
    qs.str = str; qs.sortflag = false; qs.process = 0; qs.override = 0;
}

function manager_print_name( col )
{
    fill( "white" )
    textAlign(CENTER, CENTER);
    textSize(16);
    var str = "";
    // set name
    switch (col) {
        case 0: { str = "Insertion Sort"; break; }
        case 1: { str = "Gold's Poresort"; break; }
        case 2: { str = "Mergesort"; break; }
        case 3: { str = "Quicksort"; break; }
    }
    // print name
    text( str, 400*(col)+200, 12 ); // print the name of the algorithm in the column
    text( rot_str( rm.str, rm.str_offset ), 400*(col)+200, 32 ); // print the starting string
}


/// EVERY STEP OF THE RACE

function fill_cell( col , row , fill_col)
{
    fill( fill_col ); // fill cell with given color
    stroke("black"); // black outline to cell
    rect( 400*(col), 40*(row), 400, 40 ); // Fill the cell
}

function cell_text ( str )
{
    fill( "black" )
    textAlign(CENTER, CENTER);
    textSize(16);
    text( str, 400*(rm.col)+200, 40*(rm.row)+20 );
}

function race_step()
{
    if (!rm.raceflag) // stop sorting when race is over
    {
        // determine current algorithm
        switch (rm.col) {
            case 0: { if (!is.sortflag) {is_step()}; break; }
            case 1: { if (!ps.sortflag) {ps_step();} break; }
            case 2: { if (!ms.sortflag) {ms_step();} break; }
            case 3: { if (!qs.sortflag) {qs_step();} break; }
        }
        // move to next column or
        rm.col++;
        if (rm.col >= 4) 
        {
            rm.col = 0; 
            rm.row++;

            // check if all sorts have finished
            if (is.sortflag && ps.sortflag && ms.sortflag && qs.sortflag) { start_race(); } // start the next lap
        }
    }
}

function is_step()  // INSERTION SORT STEP
{
    // do a step of the insertion sort
    fill_cell(rm.col, rm.row, "white"); // fill background for cell
    is.str = is_iteration(is.i); // perform one pass
    is.i++; //increment to next starting position

    if (is.i == is.str.length) // check if we're done sorting
    { 
        is.sortflag = true; // mark that the algorithm is done sorting
        fill_cell(rm.col, rm.row, "gold"); // fill background for cell
    }

    // print current progress
    cell_text( is.str );
}

function is_iteration ( i )
{
    let temp_str = is.str.split("");    // create a character array
    // Choosing the first element in our unsorted subarray
    let current = temp_str[i];
    // The last element of our sorted subarray
    let j = i-1; 
    while ( (j > -1) && (parseInt(current,16) < parseInt(temp_str[j],16)) ) // compare int value of string positions
    {
        // move next char into j's position and move back j
        temp_str[j+1] = temp_str[j];
        j--;
    }
    // fill in gap with current char
    temp_str[j+1] = current;
// recombine string and return
return temp_str.join("");
}

function ps_step()  // PORESORT STEP
{
    // do a step of the poresort
    fill_cell(rm.col, rm.row, "white"); // fill background for cell

    // odd half sorting
    ps.str = pore_half_pass(0);
    // even half sorting
    ps.str = pore_half_pass(1);

    // check if sorting is complete
    if (ps.db) { ps.db = false; } //reset dirty bit for next pass
    else {
        ps.sortflag = true; // mark that the algorithm is done sorting
        fill_cell(rm.col, rm.row, "gold"); // fill background for cell
    }

    // print current progress
    cell_text( ps.str );
}

function pore_half_pass( i )
{
    let temp_str = ps.str.split(""); // create a character array
    while (i < (ps.str.length - 1) ) // move through string until 1 or 0 items from the end of the list 
    {
        // move next char into j's position and move back j
        if ( parseInt(temp_str[i],16) > parseInt(temp_str[i+1],16) ) // char pair comparison
        {
            [temp_str[i], temp_str[i+1]] = [temp_str[i+1], temp_str[i]]; //switch array elements if in wrong order
            ps.db = true; // set dirty bit since a swap was performed
        }
        i += 2; // move to the next pair in the string
    }
    // recombine string and return
    return temp_str.join("");
}

function ms_step()  // MERGESORT STEP
{
    // check if sort is completed
    if ( ms.str.length < ( pow( 2, rm.row ) ) ) // check if sorting is done
    {
        ms.sortflag = true; // mark that the algorithm is done sorting
        fill_cell(rm.col, rm.row, "gold"); // fill background for cell
    }
    else 
    {
        fill_cell(rm.col, rm.row, "white"); // fill background for cell
    }

    // do a step of the mergesort
    ms.str = merge_sort( ms.str );

    // print current progress
    cell_text( ms.str );
}

function merge( left, right )
{
    return left.concat(right);
}

function sorted_merge( left, right )
{
    let sorted = []; //create an array to merge items into
    
    while (left.length && right.length) // while both strings have atleast 1 character left to sort
    {
        left = left.split(""); // convert both strings to character arrays
        right = right.split(""); 
        if (parseInt(left[0],16) <= parseInt(right[0],16)) // compare leading item of each half
        {
            sorted.push(left.shift()); // remove front of array and add to sorted array
        } else {
            sorted.push(right.shift()); // remove front of array and add to sorted array
        }
        left = left.join(""); // convert both arrays back to strings
        right = right.join(""); 
    }
    
    //return (sorted.concat(left.slice().concat(right.slice()))).join(""); //add the remaining character then merge into string
    return (sorted.concat(left,right)).join(""); //add the remaining character then merge into string
  }
  
function merge_sort( str )
{
    // split array down the middle
    let middle = Math.floor(str.length / 2);
    let left = str.slice(0, middle);
    let right = str.slice(middle);

    if ( str.length < (pow( 2, rm.row+1 )-1) ) // when cutting the array in half reached the already sorted sublists
    {
        return sorted_merge(left, right); //do one sorted merge only at the current level
    }
    // if the sublists are not small enough yet, continue splitting
    return merge(merge_sort(left), merge_sort(right));
  }

function qs_step()  // QUICKSORT STEP
{
    qs.process = 0; // reset the process count
    qs.override += (pow( 2, rm.row -1 )); // increase process override amount exponentially per pass

    // do a step of the Quicksort
    qs.str = rm.str; //return string to original state before sorting
    qs.str = quicksort(qs.str,split("")); // break string into character array to perform sorting
    qs.str = qs.str.join(""); // reform array as string

    // check if sort is completed
    if ( qs.process < qs.override ) // check if every character in the string has been sorted
    {
        qs.sortflag = true; // mark that the algorithm is done sorting
        fill_cell(rm.col, rm.row, "gold"); // fill background for cell
    }
    else { fill_cell(rm.col, rm.row, "white"); } // fill background for cell 

    // print current progress
    cell_text( qs.str );
}

function quicksort(arr) {
    if (qs.process >= qs.override) { return arr; } // stop sorting when override limit is reached
    qs.process++; //increase process count as new recursive call has begun
	if (arr.length < 2) return arr; // last case. 1 element left

	// find center and use it as pivot
	let center = Math.trunc(arr.length / 2); // remove decimal to find rounded down center point as a sample pivot value
	let pivot = arr[center]; // pivot value
	let left = []; // left side of the pivot
	let right = []; // right side of the pivot

	// loop from start to center-1
    for (let i = 0; i < center; i++) 
    { arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]); } // elvis statement puts lesser values in left and greater ones in right

	// loop from center+1 to end
	for (i = center + 1; i < arr.length; i++)
	{ arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]); } // elvis statement puts lesser values in left and greater ones in right

	left = quicksort(left); // quick sort the left sub array
	right = quicksort(right); // quick sort the right sub array

	return left.concat(pivot).concat(right); // concat left + pivot + right
}


/// FRAME HANDLING
function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function draw_update()  // Update our display.
{
    race_step();
}

/// INPUT HANDLER
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        start_race(); //skip to the next lap
    }
    else if (event.code == 'ArrowLeft') {
        if (g_frame_mod < 60) { g_frame_mod++; } // decrease speed of sorting
    }
    else if (event.code == 'ArrowRight') {
        if (g_frame_mod > 1) { g_frame_mod--; } // increase speed of sorting
    }
    else { g_stop = ! g_stop; } // switch between paused and unpaused
});