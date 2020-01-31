$(function(){

    //메인 슬라이드
    var mainSwiper = new Swiper('.main-slide .swiper-container', {
      scrollbar: {
        el: '.main-slide .swiper-scrollbar',
        hide: true,
      },
      pagination: {
          el: '.main-slide .swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
              return '<span class="' + className + '">0' + (index + 1) + '</span>';
          }
      },
      navigation: {
          nextEl: '.main-slide .swiper-next',
          prevEl: '.main-slide .swiper-prev',
      },
      loop:true, 
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });

    // quick-menu    
    //페이지 첫 로딩시 메뉴의 위치  
    // $(".quick_div").animate( { "top": '50%' }, 100 ); // 빼도 된다.
    
    //스크롤 이벤트가 일어났을때 실행하는 함수
    $(window).scroll(function(){      
      //스크롤 이벤트가 일어났을때 스크롤의 위치를 알아내서 이동
      $(".quick_div").stop().animate( { "margin-top": $(document).scrollTop()+"px" }, 1000 );
    });    
    
    //퀵메뉴 버튼 누를 때 해당 영역으로 스크롤 이동 
    $('.quick_div button').click(function () { 
      var selector=$(this).data('position');      
      $('html, body').animate({
        scrollTop:$(selector).offset().top
      })
    });

    // about 
    var aboutSwiper = new Swiper('.synopsys .swiper-container', {
      pagination: {
        el: '.synopsys .swiper-pagination',
        clickable: true,
      },
      loop:true,
    });

    $('.summary .tab-nav a').click(function(e){
      e.preventDefault();
      var id=$(this).attr('href');
      $('.summary .tab-nav a').removeClass();
      $(this).addClass('active');
      $('.summary .tab-contents > div').hide(300);
      $(id).show(300);
    })

    // cast 
    var castSwiperOption={
      pagination: {
        el: '.cast .swiper-pagination',
        clickable: true,
      },
      scrollbar: {
        el: '.cast .swiper-scrollbar',
      }
    }
    var castSwiper = new Swiper('.cast .swiper-container',castSwiperOption);    
    
    // cast tab-menu
    $('.cast .tab-nav a').click(function(e){
      e.preventDefault();      
      $('.cast .tab-nav a').removeClass();
      $(this).addClass('active');
      $('.cast .swiper-wrapper').fadeOut(300);
      $('.cast .swiper-wrapper').fadeIn(300);
      var index=$('.cast .tab-nav a').index(this);  

      if(castSwiper!=undefined){
        castSwiper.destroy();
      }

      $.ajax({
        url:'js/cast.json',
        success:function(cast){
          var castInfo=cast[index];
          var actorLength=castInfo.castActors.length;          
          $('.cast .swiper-wrapper').empty();
          for (let index = 0; index < actorLength; index++) {
            $('.cast .swiper-wrapper').append(`
              <div class="swiper-slide">
                <div class="cast-info">
                    <div class="img-box">
                        <img src="${castInfo.castActors[index].image}" alt="">
                    </div>
                    <div class="text-box">  
                      <h4>${castInfo.castName}</h4>
                      <h5>${castInfo.castActors[index].actorName}</h5> 
                      <div class="description"></div>
                      <dl>
                          <dt>[뮤지컬]</dt>                                            
                          <dd>${castInfo.castActors[index].info.musical}</dd>                          
                      </dl>                       
                    </div>
                </div>
              </div>            
            `)

            // 설명넣기
            castInfo.castActors[index].description.forEach(item => {
              $('.cast .swiper-slide').eq(index).find('.description').append(`<p>${item}</p>`)
            });

            // 수상경력
            if(castInfo.castActors[index].info.career!=undefined){
              $('.cast .swiper-slide').eq(index).find('dl').append(`<dt>[수상경력]</dt>`)
              castInfo.castActors[index].info.career.forEach(item => {
                $('.cast .swiper-slide').eq(index).find('dl').append(`<dd><i>${item}</i></dd>`)
              });
            }
          }
          
          if(actorLength == 1){
            $('.cast .control').hide();
          }else{
            $('.cast .control').show();
            castSwiper = new Swiper('.cast .swiper-container',castSwiperOption);  
          }
        }
      })
    })

    // video
    var videoSwiper = new Swiper('.media .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      // centeredSlides: true,
      pagination: {
        el: '.media .swiper-pagination',
        type: 'fraction',
        formatFractionCurrent:function(number){
          $('.media .control .page').text(number);
          return '0'+ number;          
        },
        formatFractionTotal:function(number){
          return '0'+number;          
        },      
      },
      navigation: {
        nextEl: '.media .button-next',
        prevEl: '.media .button-prev',
      },
    })
    var gallerySwiper = new Swiper('.gallery .swiper-container', {
      pagination: {
        el: '.gallery .swiper-pagination',
        type: 'fraction',
        clickable: true,
        formatFractionCurrent:function(number){
          $('.gallery .control .page').text(number);
          return '0'+ number;          
        },
        formatFractionTotal:function(number){
          return '0'+number;          
        }, 
      },
      navigation: {
        nextEl: '.gallery .button-next',
        prevEl: '.gallery .button-prev',
      },
      loop:true
    });

});