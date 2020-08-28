function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}
function findTag(el, tag) {
  while ((el = el.parentElement) && !(el.tagName === tag) );
  return el;
}
function getIndex(target) {
  const parent = target.parentNode;
    for(let i = 0; i < parent.children.length; i++) {
      if(parent.children[i] === target) return i;
    }
}
function swapBackLi(item) {
  const li = findTag(item, "LI");
  if (li.dataset.key) {
    li.parentNode.insertBefore(li, li.parentNode.children[+li.dataset.key + 1]);
  }
}
function swapTopLi(item) {
  const li = findTag(item, "LI");
  li.dataset.key = getIndex(li);
  li.parentNode.insertBefore(li, li.parentNode.firstChild);    
}
function hideSubmenu(notHide) {
  const submenus = document.getElementsByClassName('submenu');
  for(let i = 0; i < submenus.length; i++) {
    if (submenus[i] != notHide) {
      swapBackLi(submenus[i]);
      const openmenu = submenus[i].parentNode.getElementsByClassName('opensubmenu')[0].children[0];
      if (openmenu.classList.contains('open') ) {
        openmenu.classList.remove("open");
        openmenu.classList.add("close");  
      }
      submenus[i].classList.remove("show");
      submenus[i].classList.remove("showmenu");  
    }
  }
}

const openmenu = document.getElementById('openmenu');
openmenu.onclick = () => {
  const menu = document.getElementById('menu');
  if ( menu.classList.contains('show') ) {
    menu.classList.remove("show");
    menu.classList.remove("showmenu");
    document.getElementById('wrapper').classList.remove("shadow");
    openmenu.src = "hamburger.png";
    hideSubmenu();
  } else {
    menu.classList.add("show");
    menu.classList.add("showmenu");
    document.getElementById('wrapper').classList.add("shadow");
    openmenu.src = "close.png";
  }
};
const opensubmenus = document.getElementsByClassName('opensubmenu');
for(let i = 0; i < opensubmenus.length; i++) {
  opensubmenus[i].onclick = function() {
  	const menu = this.parentNode.nextElementSibling;
    if ( menu.classList.contains('show') ) {;
      swapBackLi(this);
      menu.classList.remove("show");
      menu.classList.remove("showmenu");
      /* Анимация стрелки */
      this.children[0].classList.remove("open");
      this.children[0].classList.add("close");
    } else {
      /* Проверка на наличие родительского подменю */
      const parentSubmenu = findAncestor(this, "submenu"); 
      hideSubmenu(parentSubmenu);
      swapTopLi(this);  
      menu.classList.add("show");
      menu.classList.add("showmenu");
      /* Анимация стрелки */
      this.children[0].classList.add("open");
      this.children[0].classList.remove("close");
    }
  }
}
