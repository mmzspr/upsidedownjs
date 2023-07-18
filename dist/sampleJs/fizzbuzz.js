"use strict";
const max = 15;
for( let i = 1; i <= max; i ++ ) {
    if( i % 15 === 0 ) {
        console.log( "FizzBuzz" );
        continue;
    }
    if ( i % 5 === 0 ) {
        console.log( "Buzz" );
        continue;
    }
    if ( i % 3 === 0 ) {
        console.log( "Fizz" );
        continue;
    }
    console.log( i );
 }
