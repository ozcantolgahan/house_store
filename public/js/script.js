$(document).ready(function(){
let showClosedCategories=function(){
$(".show-men-category").hover(function(){
    $(".men-category").toggle({});
});
$(".show-women-category").hover(function(){
    $(".women-category").toggle({});
});
$(".show-other-category").hover(function(){
    $(".other-category").toggle({});
});
};
function showNavAnimation(){
    if($(window).scrollTop()>120){
        $(".default-nav").fadeOut();
        $(".fixed-nav").fadeIn();
    }else{
        $(".default-nav").fadeIn();
        $(".fixed-nav").fadeOut();
    }

};
let mainBannerAnimation=function(){
    let title=$(".main-banner-title")[0];
    let content=$(".main-banner-content")[0];
    let buttonOne=$(".main-banner-button")[0];
    let buttonTwo=$(".main-banner-button")[1];
    $(title).animate({marginLeft:"0px",opacity:"1"},"slow",function(){
        $(content).animate({marginLeft:"0px",opacity:"1"},"slow",function(){
            $(buttonOne).animate({marginBottom:"0px",opacity:"1"},"slow");
            $(buttonTwo).animate({marginBottom:"0px",opacity:"1"},"slow");

        });
    });

};
function discountProductAnimation(){
    if($(window).scrollTop()>400){
        console.log();
        let exPrice=$(".ex-price");
        exPrice.animate({marginLeft:"0px"},"slow",function(){
            exPrice.css({textDecoration:"line-through"});
        });

        $(window).off("scroll",discountProductAnimation);
    }

};
let contactAnimations=function(){
$(".contact-icons .card").mouseenter(function(){
  let img=$(this).children()[0];
  $(img).animate({top:"5%"},"slow");
});
$(".contact-icons .card").mouseleave(function(){
    let img=$(this).children()[0];
    $(img).animate({top:"13%"},"slow");
  });
};

let setupOwl=function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
};
let showSearchBar=()=>{
    $(".search").click(function(){
        $(".search-bar").toggle();
        $(".account-bar").fadeOut();
        $(".basket-bar").fadeOut();
    });


};
let showBasketBar=()=>{
    $(".basket").click(function(){
        $(".basket-bar").toggle();
        $(".account-bar").fadeOut();
        $(".search-bar").fadeOut();
    });
    $(".close-basket").click(function(){
        $(".basket-bar").fadeOut();
    });


};
let showAccountBar=()=>{
    $(".list").click(function(){
        $(".account-bar").toggle();
        $(".basket-bar").fadeOut();
        $(".search-bar").fadeOut();
    });
    $(".close-account-bar").click(function(){
        $(".account-bar").fadeOut();
    });

};
showAccountBar();
setupOwl();
showSearchBar();
showBasketBar();
$(window).scroll(showNavAnimation);
$(window).scroll(discountProductAnimation);
showClosedCategories();
mainBannerAnimation();
contactAnimations();
});