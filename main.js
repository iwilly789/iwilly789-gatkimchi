/* ================================================================
   main.js — 돌산수연갓김치 홍보 웹페이지 JavaScript
   담당 기능:
     1. 모바일 햄버거 메뉴 토글
     2. 스크롤 탑 버튼 표시/숨김
     3. 스크롤 진입 시 fade-up 애니메이션 (IntersectionObserver)
     4. 헤더 스크롤 시 배경 강화 효과
     5. 상품 카드 클릭 시 공식몰 이동
     6. 모바일 슬라이더 퍼센트단위 백분율 정합성 보정
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
      1. 햄버거 메뉴 토글 (모바일 전용)
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger'); 
  const navMenu   = document.getElementById('nav-menu');  

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ----------------------------------------------------------
      2. 스크롤 탑 버튼
     ---------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');    
      } else {
        scrollTopBtn.classList.remove('show'); 
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ----------------------------------------------------------
      3. 스크롤 진입 애니메이션 (IntersectionObserver)
     ---------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');   
          fadeObserver.unobserve(entry.target);    
        }
      });
    },
    {
      threshold: 0.1 /* 모바일 가독 환경을 위해 감지 시점 15% -> 10% 최적화 */
    }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));


  /* ----------------------------------------------------------
      4. 헤더 스크롤 효과
     ---------------------------------------------------------- */
  const header = document.querySelector('header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.style.background = '#FEF3E2';
        header.style.boxShadow  = '0 2px 16px rgba(0,0,0,0.08)';
      } else {
        header.style.background = '#FEF3E2';
        header.style.boxShadow  = 'none';
      }
    });
  }


  /* ----------------------------------------------------------
      5. 상품 카드 클릭 → 공식 쇼핑몰 새 탭 열기
     ---------------------------------------------------------- */
  const SHOP_URL = 'http://www.suyeonkimchi.com/mall/index.php';

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      window.open(SHOP_URL, '_blank'); 
    });
  });


  /* ----------------------------------------------------------
      6. 히어로 메인 비주얼 좌우 슬라이드 전환 슬라이더
      - 백분율 트랙 비율을 동적 매칭하여 가로 너비 넘침 버그 차단
     ---------------------------------------------------------- */
  const sliderTrack = document.getElementById('hero-slider-track');
  const sliderImgs  = document.querySelectorAll('#hero-slider-track .slider-img');
  
  if (sliderTrack && sliderImgs.length > 0) {
    let currentImgIndex = 0;             
    const totalImgs = sliderImgs.length; 
    const originalCount = totalImgs - 1; 

    setInterval(() => {
      currentImgIndex++;
      
      sliderTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
      
      const movePercentage = -(currentImgIndex * (100 / totalImgs));
      sliderTrack.style.transform = `translateX(${movePercentage}%)`;

      if (currentImgIndex === originalCount) {
        setTimeout(() => {
          sliderTrack.style.transition = 'none';
          sliderTrack.style.transform = 'translateX(0%)';
          currentImgIndex = 0;
        }, 800); 
      }
    }, 3000); 
  }

});
// [중요] 모든 기능이 끝나는 DOMContentLoaded 이벤트의 마감 괄호입니다.