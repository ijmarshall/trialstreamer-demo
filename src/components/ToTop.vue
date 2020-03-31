<template>
<button class="goTop"
        v-if="isVisible"
        title="Back to top"
        @click="backToTop">
  <b-icon icon="caret-up-fill"  />
</button>
</template>

<script>
import $ from 'jquery'

export default {
  title: 'ToTop',
  data: function() {
    return {
      isVisible: false
    };
  },
  methods: {
    initToTopButton: function() {
      $(document).bind('scroll', function() {
        var backToTopButton = $('.goTop');
        if ($(document).scrollTop() > 250) {
          backToTopButton.addClass('isVisible');
          this.isVisible = true;
        } else {
          backToTopButton.removeClass('isVisible');
          this.isVisible = false;
        }
      }.bind(this));
    },
    backToTop: function() {
      $('html,body').stop().animate({
        scrollTop: 0
      }, 'slow', 'swing');
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initToTopButton();
    });
  }
};
</script>

<style scoped lang="scss">
.goTop {
  border-radius: 5px;
  background-color: rgb(1,14,27);
  background-color: rgba(1, 14, 27, .7);
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 15px;
  bottom: 15px;
  color: white;
  border: none;
  opacity: 0;
  z-index: -1;
  .fa {
    color: white;
    font-size: 22px;
  }
  &:hover {
    opacity: 1;
    background-color: rgb(1,14,27);
    background-color: rgba(1, 14, 27, .9);
  }
}

.isVisible {
  opacity: .8;
  z-index: 4;
  transition: all .4s ease-in;
}
</style>
