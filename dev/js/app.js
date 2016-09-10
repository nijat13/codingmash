(function() {
  $(function() {
    return console.log("hello world!");
  });

}).call(this);

$(function(){

    if ($('#baharNavbar').length) {

        var headerTop = $(".header-top").height(),
            headerBottom = $(".header-bottom"),
            scrollOffsetHeaderBottom = headerBottom.offset();

        $(document).scroll(function(){

            var scroll = $(this).scrollTop(),
                scrolltopheaderbottom = headerBottom.scrollTop();

            // alert(scrolloffsetheadertop.bottom);
            if(scroll > scrollOffsetHeaderBottom.top){
                $(".header-bottom").addClass("navbar-fixed-top");
                $(".menu").addClass("fixed-menu");
                $(".navbar-brand").addClass("fixed-navbar-brand");
            }
            else if(scroll < headerTop){
                $(".header-bottom").removeClass("navbar-fixed-top");
                $(".menu").removeClass("fixed-menu");
                $(".navbar-brand").removeClass("fixed-navbar-brand");
            }
        });
    }

    if ($('.animateFade').length) {

        $(window).scroll(function(){

        });

         /*var creative=$(".creative").offset();
         if(scroll>creative.top-500){
             $(".thumbnail-creative").addClass("animated fadeInUp");
         }
         var portfoliomenu=$(".nav-btn").offset();
         if(scroll>portfoliomenu.top-600){

             $(".nav-btn").addClass("animated fadeInRight");
         }*/
    }

});