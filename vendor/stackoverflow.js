function busAnimate () {
  $(document).ready(function() {
    function busLeft() {
      $("#flying-bus").animate({left: "-=3500"}, 4000, "swing", busRight);
    }
    function busRight() {
      $("#flying-bus").animate({left: "+=3500"}, 4000, "swing", busLeft);
    }
    busRight()

  })
}
