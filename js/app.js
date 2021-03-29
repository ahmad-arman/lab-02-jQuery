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
  $( 'main' ).append (

    `<section id="photo-template">
        <h2>${this.title}</h2>
        <img src="${this.imageUrl}" alt="">
        <p> ${this.description}</p>
      </section>`
  );
};




$.ajax( './data/page-1.json' )
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

    $( '#filter' ).on( 'change',callBack );
  } );
// console.log( arrayData );

// console.log( arrayName );

function callBack( event ) {
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


console.log(callBack);