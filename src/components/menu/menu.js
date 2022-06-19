import './menu.scss'
import $ from "jquery"

export function Menu() { 
    //открываем меню по кнопке
    document.querySelector('.menu_btn').addEventListener('click', () => {
        document.querySelector('.menu').classList.add('active');
    })
    //закрываем меню по кнопке
    document.querySelector('.close_menu_btn').addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('active');
    })
    //при скроле, закрываем меню
    $(window).on('scroll',function() {
        document.querySelector('.menu').classList.remove('active');
    });

    //аккордеон
    $(function() {
        var accordion = function(el, multiple) {
          this.el = el || {};
          // more then one submenu open?
          this.multiple = multiple || false;
          
          var dropdown = this.el.find('.dropdown');
          dropdown.on('click',
                          { el: this.el, multiple: this.multiple },
                          this.dropdown);
        };
        
        accordion.prototype.dropdown = function(e) {
          var $el = e.data.el,
              $this = $(this),
              //this is the ul.submenuItems
              $next = $this.next();
          
          $next.slideToggle();
          $this.parent().toggleClass('open');
          
          if(!e.data.multiple) {
            //show only one menu at the same time
            $el.find('.menu-items').not($next).slideUp().parent().removeClass('open');
          }
        }
        var accordion = new accordion($('.accordion-menu'), false);
    })
}
