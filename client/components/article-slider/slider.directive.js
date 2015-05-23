angular.module('faeloApp').directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope:{
      articles: '=',
      dish: '=' // {index: X, amount: xx}
    },
    link: function (scope, elem, attrs) {

      scope.currentIndex=0;



      scope.next=function(){
        scope.currentIndex<scope.articles.length-1?scope.currentIndex++:scope.currentIndex=0;
      };

      scope.prev=function(){
        scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
      };

      scope.sum=function(index){
        if(scope.dish.index !== index) scope.dish.amount = 0;
        scope.dish.index = index;
        scope.dish.amount++;
      };

      scope.substract=function(index){
        if(scope.dish.index !== index) scope.dish.amount = 0;
        scope.dish.index = index;
        scope.dish.amount--;
        if(scope.dish.amount < 0) scope.dish.amount = 0;
      };

      scope.$watch('currentIndex',function(){
        if(scope.articles){
          scope.articles.forEach(function(image){
            image.visible=false;
          });
          scope.articles[scope.currentIndex].visible=true;
        }
      });

      scope.$watch('articles',function(newObj){
        if(newObj && newObj.length)
          $timeout(function(){
            elem.css('height', 350 + 'px');
          }, 500);
      });


    },
    templateUrl:'components/article-slider/slider.html'
  }
});
