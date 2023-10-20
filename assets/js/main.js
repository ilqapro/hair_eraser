$(function() {
  let htmlWidth = $('html').width();
  let headerHeight = $('.header').outerHeight();
  let windowHeight = $(window).height();

  $('body').on('click', '[data-open_popup]', function(e) {
    e.preventDefault()
    $('.popup.active').removeClass('active')
    $('.popup#' + $(this).data('open_popup')).addClass('active')
  })

  $('body').on('click', '.popup-close', function() {
    $(this).closest('.popup').removeClass('active')
  })

  $('body').on('click', 'a[href*="#"]', function(e) {
    var target = this.hash;
    var $target = $(target);

    if( ! $target.length ) {
      return;
    } else {
      e.preventDefault();
    }

    $('html, body').stop().animate({
      scrollTop: $target.offset().top
    }, 500, 'swing', function () {
      window.location.hash = target;
    });
  })

  new Swiper(".hero-slider--main", {
    thumbs: {
      swiper: new Swiper(".hero-slider--thumbs", {
        breakpoints: {
          0: {
            spaceBetween: 10,
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 22,
          }
        }
      })
    },
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },  
  });

  $('.reviews-slider').each(function(i, e) {
    let
      swiper = $(e).find('.swiper')[0],
      arrowPrev = $(e).find('.swiper-arrow.prev')[0],
      arrowNext = $(e).find('.swiper-arrow.next')[0];

    new Swiper(swiper, {
      navigation: {
        prevEl: arrowPrev,
        nextEl: arrowNext,
      },
      spaceBetween: 40,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        769: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      }
    });
  })
  

  $('.faq-section--header').on('click', function() {
    let nextElem = $(this).next();
    if( nextElem.hasClass('active') ) {
      $(this).removeClass('active')
      $(nextElem).slideUp(300).removeClass('active')
    } else {
      $(this).addClass('active')
      $(nextElem).slideDown(300).addClass('active')
    }
  })

  let $faq_section_first = $('.faq-section').first();
  $faq_section_first.find('> div').addClass('active')

  $('.btn-burger').on('click', function() {
    $(this).toggleClass('active')
    $('.mobileNavigation').toggleClass('active')
  })

  $('.mobileNavigation-item, .mobileNavigation-close').on('click', function() {
    $('.mobileNavigation').removeClass('active')
  })

  $('.card_number').mask('0000 0000 0000 0000')
  $('.card_mm_yy').mask('00/00')
  $('.card_cvv').mask('000')
})