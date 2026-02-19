$(function () {
  //  DOM 요소 변수 선언
  const subNav = $('.sub-nav-wrap');             // 데스크탑 서브 메뉴 전체 영역
  const mainNav = $('.main-nav li a');           // 데스크탑 네비게이션 메뉴 링크
  const header = $('header');                    // 헤더 (검색창 열림 상태 클래스 제어용)
  const schOpenBtn = $('.sch-open-btn');         // 검색 열기 버튼
  const schCloseBtn = $('.sch-c-btn');           // 검색 닫기 버튼
  const searchWrap = $('.search-wrap');          // 검색창 래퍼

  const subList = $('.sub-list');                // 모바일 서브메뉴 리스트
  const body = $('body');                        // 전체 페이지 (모바일 메뉴 상태 제어용)
  const btnMmenu = $('.btn-m-menu');             // 모바일 메뉴 토글 버튼
  const subNavBtn = $('.sub-nav>li>span.blind'); // 모바일 서브메뉴 열기 버튼 (접근성용)


  // 상태 변수
  let schOpen = false;           // 검색창 열림 여부
  let dskSubNavState = false;    // 데스크탑 서브메뉴 열림 여부


  //  공통 함수

  // 데스크탑 상태 리셋 (메뉴 및 검색창 초기화)
  function dskReset() {
    subNav.removeAttr('style');
    header.removeClass('schOpen');
  }

  // 모바일 상태 리셋 (서브메뉴 및 모바일 전체메뉴 닫기)
  function mobReset() {
    subList.removeAttr('style');
    subNavBtn.parent('li').removeClass('on');
    body.removeClass('mob-mOpen');
  }

  //  검색 관련 함수
  function openSearch() {
    if (!schOpen) {
      // 데스크탑 메뉴 열려 있으면 닫기
      if (dskSubNavState) {
        subNav.stop().slideUp();
        dskSubNavState = false;
      }

      //모바일 메뉴 열려 있으면 닫기
      if (body.hasClass('mob-mOpen')) {
        body.removeClass('mob-mOpen');
      }

      header.addClass('schOpen');
      searchWrap.fadeIn();
      schOpen = true;
    }
  }

  function closeSearch() {
    if (schOpen) {
      header.removeClass('schOpen');
      searchWrap.fadeOut();
      schOpen = false;
    }
  }

  // 데스크탑 메뉴 함수
  // 데스크탑 메뉴 열기 (검색창은 자동 닫힘)
  function dskNavOpen() {
    if (schOpen) {
      closeSearch();
    }

    if (!dskSubNavState) {
      subNav.stop().slideDown();
      dskSubNavState = true;
    }
  }

  // 데스크탑 메뉴 닫기 (mouseleave 시)
  function dskNavClose() {
    if (window.innerWidth >= 1024) {
      setTimeout(function () {
        subNav.stop().slideUp();
        dskSubNavState = false;
      }, 500);
    }
  }

  //  모바일 메뉴 토글
  btnMmenu.on('click', (e) => {
    e.preventDefault();
    if (schOpen) {
      closeSearch()
    }
    body.toggleClass('mob-mOpen');
  });


  // 모바일 서브 메뉴 토글
  subNavBtn.on('click', function () {
    const $parentLi = $(this).parent('li');
    const $siblingSub = $(this).siblings('.sub-list');

    if ($parentLi.hasClass('on')) {
      $parentLi.removeClass('on');
      $siblingSub.slideUp();
    } else {
      $parentLi
        .addClass('on')
        .siblings()
        .removeClass('on')
        .children('.sub-list')
        .slideUp();

      $siblingSub.slideDown();
    }
  });

  // 반응형 전환 시 초기화
  $(window).on('resize load', () => {
    let winWidth = window.innerWidth;

    if (winWidth < 1024) {
      dskReset(); // 모바일 전환 시 데스크탑 메뉴 초기화
      schOpen = false
    }

    if (winWidth >= 1024) {
      mobReset(); // 데스크탑 전환 시 모바일 메뉴 초기화
      schOpen = false
    }

    console.log(winWidth); // 확인용 로그
  });

  //  검색 버튼 이벤트 바인딩
  schOpenBtn.on('click', function (e) {
    e.preventDefault();
    openSearch();
  });

  schCloseBtn.on('click', function (e) {
    closeSearch();
  });

  //  데스크탑 메뉴 이벤트
  mainNav.on('mouseenter', dskNavOpen);      // 메인 메뉴 hover 시 서브 메뉴 열기
  subNav.on('mouseleave', dskNavClose);      // 서브 메뉴 영역을 벗어나면 닫기

}); // jQuery ready end

// fixedTop
const fixedTopBtn = document.querySelector('.fixedTop')

window.addEventListener('scroll', () => {
  let scroll = window.scrollY

  console.log(scroll)

  if (scroll > 100) {
    fixedTopBtn.classList.add('On')
  } else {

    fixedTopBtn.classList.remove('On')
  }
})

fixedTopBtn.addEventListener('click', (e) => {
  e.preventDefault()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

});

// depth5 tab(공지사항, 언론보도)
const dep5Tabs = document.querySelectorAll('.notice-media-wrap h2 span')
const dep5Contents = document.querySelectorAll('.content-wrap>ul')

dep5Tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    console.log(i);
    dep5Tabs.forEach((tab) => tab.classList.remove('on'))
    dep5Contents.forEach((content) => content.classList.remove('Active'))

    tab.classList.add('on')
    dep5Contents[i].classList.add('Active')
  })
})

const heroSlider = new Swiper(".hero-slider", {
  effect: 'fade',
  pagination: {
    el: ".hero-slider .swiper-pagination",
    clickable: true, // 페이지네이션 클릭 가능하도록 설정
  },
  loop: true
});

const newsSlider = new Swiper(".news-slider", {
  direction: "vertical",
  navigation: {
    nextEl: ".news-slider .swiper-button-next",
    prevEl: ".news-slider .swiper-button-prev",
    clickable: true, // 페이지네이션 클릭 가능하도록 설정
  }
});

// in slider
const cultureSlider = new Swiper(".culture-slider", {
  autoplay: true,
  pagination: {
    el: ".culture-slider .swiper-pagination",
    clickable: true,
  },
});

const eventSlider = new Swiper(".event-slider", {
  autoplay: true,
  pagination: {
    el: ".event-slider .swiper-pagination",
    clickable: true,
  },
});

// card slider
const card2025 = new Swiper(".card2025-slider", {
  autoplay: true,
  pagination: {
    el: ".card2025-slider .swiper-pagination",
    clickable: true,
  },
});

const card2024 = new Swiper(".card2024-slider", {
  autoplay: true,
  pagination: {
    el: ".card2024-slider .swiper-pagination",
    clickable: true,
  },
});

const card2023 = new Swiper(".card2023-slider", {
  autoplay: true,
  pagination: {
    el: ".card2023-slider .swiper-pagination",
    clickable: true,
  },
});

// footer slider
const siteSlider = new Swiper('.site', {
  breakpoints: { // 중단점 설정
    0: { // 0 ~ 649
      slidesPerView: 1,
      navigation: {
        nextEl: 'footer .dep1 .btn-wrap .swiper-button-next',
        prevEl: 'footer .dep1 .btn-wrap .swiper-button-prev',
        clickable: true
      }
    }, // 650 이상
      650: {
      slidesPerView: 5
    }
  }
})