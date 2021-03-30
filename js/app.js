'use script';
let arrayData = [];
let arrayName = [];
const Animals = function( imageUrl ,title ,description ,keyword ,horns ){
  this.imageUrl = imageUrl;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  arrayData.push( this );

};
Animals.prototype.render = function () {
  // $( 'main' ).append (

  //   `<section id="photo-template">
  //       <h2>${this.title}</h2>
  //       <img src="${this.imageUrl}" alt="">
  //       <p> ${this.description}</p>
  //     </section>`
  // );
  let template1 = $( '#template' ).html();
  let dataSet = Mustache.render( template1,this );
  $( 'main' ).append( dataSet );
};



function getData( url ) {
  $.ajax( url )
    .then( data => {
    // console.log( data );
      data.forEach( element => {
        let myAnimal = new Animals( element.image_url,element.title ,element.description , element.keyword , element.horns );
        myAnimal.render();

        if( !arrayName.includes( element.keyword ) ){
          arrayName.push( element.keyword );
        }
      } );

      arrayName.forEach( element => {
        $( '#filter' ).append(
          `<option value = "${element}"> ${element} </option>`
        );
      } );

      $( '#filter' ).on( 'change',callBackFilter );
    } );
}
getData( './data/page-1.json' );
// console.log( arrayData );

// console.log( arrayName );

/////////////Function filter /////////////
function callBackFilter( event ) {
  let animal = event.target.value;
  console.log( animal );
  $( 'main' ).html( '' );
  arrayData.forEach( element => {
    if( element.keyword === animal ){
      element.render();
    }
    console.log( typeof element.keyword );
  } );
}
console.log( callBackFilter );
/////////////////Function page 1 //////////////////

$( '#page1' ).on( 'click',callBackPage1 );

function callBackPage1() {
  arrayData = [];
  arrayName = [];
  $( '#filter' ).empty();
  $( 'main' ).empty();
  getData( './data/page-1.json' );
}

////////////////Function page 2 ////////////////////

$( '#page2' ).on( 'click',callBackPage2 );

function callBackPage2() {
  arrayData = [];
  arrayName = [];
  $( '#filter' ).empty();
  $( 'main' ).empty();
  getData( './data/page-2.json' );
}

//////////////Function sort ///////////////

$( '#sort' ).on( 'click' ,callBackhorns );

function callBackhorns ( event ) {
  let value = event.target.value;
  arrayData.sort( ( a,b ) =>{
    if( a[value] < b[value] ) return -1;
    else if( a[value] > b[value] ) return 1;
    else return 0;
  } );
  console.log( value );
  $( 'main' ).empty();
  arrayData.forEach( item => item.render() );
  console.log( value );
}


