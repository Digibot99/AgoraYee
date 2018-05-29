$("#searchBar").keydown( function( event ) {
          if ( event.which === 13 ) {
              searchFor();
              console.log("pressed enter");
              event.preventDefault();
              return false;
          }
      });
function searchFor(){
  window.location = "list2/" + $("#searchBar").val();
}
