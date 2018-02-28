$(() => {
/* global filestack */
  const client = filestack.init('AB6Lmdk1RRjG0sQAhRSpsz');
  const storedScrollTop = window.localStorage.getItem('scrollTop');
  const $burger = $('.navbar-burger');
  const $menu = $('.navbar-menu');
  const $voteButtons = $('.voteButtons');
  const $fave = $('.fave');

  function uploadImage(e) {
    client.pick()
      .then(res => {
        $(e.target).siblings('[type=hidden]').val(res.filesUploaded[0].url);
        $('.imgPreview').attr('src', res.filesUploaded[0].url);
      })
      .catch(err => console.log(err));
  }

  if(storedScrollTop) {
    $(window).scrollTop(storedScrollTop);
    window.localStorage.removeItem('scrollTop');
  }

  $voteButtons.on('click', (e) => {
    console.log('i clicked up');
    // e.preventDefault();
    // get window position
    window.localStorage.setItem('scrollTop', $(window).scrollTop());
    e.target.click();
  });

  $fave.on('click', (e) => {
    console.log('i clicked up');
    // e.preventDefault();
    // get window position
    window.localStorage.setItem('scrollTop', $(window).scrollTop());
    e.target.click();
  });

  // $burger.on('click', () => {
  //   $burger.toggleClass('is-active');
  //   $menu.toggleClass('is-active');
  // });

  $('form').validate();
  const uploadBtn = $('button.image-upload');
  uploadBtn.on('click', uploadImage);
});
