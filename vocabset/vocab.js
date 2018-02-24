document.getElementsByClassName("content")[0].innerHTML=`
<button type="button" name="button" id="prevButton">Prev</button>
<button type="button" name="button" id="nextButton">Next</button>
<div id="stack">
  <button type="button" name="button" id="submitButton">submit</button>
</div>
`;
!function ($) {
    var Stacker = function (element, options) {
        this.element = $(element);
        var hasOptions = typeof options == 'object';
        this.basePosition = this.element.position();
        this.activeItemIndex = 0;
        this.items = new Array();
        this.itemTemplate = '<div class="stack-item"></div>';
        this.content = $(this.element.children()[0]);
        this.nextCardNumber = 1;
        this.maxVisibleItems = 10;
        if (hasOptions && typeof options.maxVisibleItems == 'number') {
            this.maxVisibleItems = options.maxVisibleItems;
        }
        this.add();
    };

    Stacker.prototype = {
        constructor: Stacker,
        add: function () {
            var newItem = $(this.itemTemplate);
            this.activeItemIndex = this.items.length;
            newItem.attr('data-id', this.nextCardNumber);
            this.nextCardNumber++;
            this.items.push(newItem);
            this._draw();
            this._triggerActiveItemChanged();
        },

        remove: function () {
            if (this.items.length == 0) return;
            this.items.splice(this.activeItemIndex, 1);
            if (this.activeItemIndex > 0)
                this.activeItemIndex--;
            if (this.items.length == 0)
                this.activeItemIndex = -1;
            this._draw();
            this._triggerActiveItemChanged();
        },

        previous: function () {
            if (this.activeItemIndex == -1 || this.activeItemIndex == this.items.length - 1) return;
            this.activeItemIndex++;
            this._draw();
            this._triggerActiveItemChanged();
        },

        id: function(){
          return this.activeItemIndex;
        },

        next: function () {
            if (this.activeItemIndex <= 0) return;
            this.activeItemIndex--;
            this._draw();
            this._triggerActiveItemChanged();
        },

        _draw: function () {
            this.element.empty();
            if (this.items.length == 0) return;

            var offset = 25;
            var itemsOnTop = this.items.length;
            if (this.items.length > this.maxVisibleItems) {
                itemsOnTop = this.maxVisibleItems;
            }
            if (this.activeItemIndex < this.maxVisibleItems)
                itemsOnTop = this.activeItemIndex + 1;

            var itemsBeneath = this.activeItemIndex;
            if (itemsBeneath > this.maxVisibleItems - 1)
                itemsBeneath = this.maxVisibleItems - 1;
            var bottomIndex = this.activeItemIndex - itemsBeneath;

            this.content.animate({ opacity: 0 }, 0);
            this.content.hide();
            for (var i = bottomIndex; i <= this.activeItemIndex; i++) {
                var index = i - bottomIndex;
                var item = this.items[i];
                item.css('position', 'absolute');
                item.css('zIndex', index);


                var id = item.data('id');
                item.html('<span class="stack-index">' + id + '</span>');

                this.element.prepend(item);

                var top = this.basePosition.top + offset * (itemsOnTop - index - 1);
                var left = this.basePosition.left + offset * (itemsOnTop - index - 1);

                item.animate({
                    top: top + "px",
                    left: left + "px"
                }, 100);

                item.on('click', { item: item }, $.proxy(this._setActiveItem, this));
            }

            this.content.css('position', 'absolute');
            this.content.css('zIndex', this.maxVisibleItems);
            this.content.css('left', '100px');
            this.content.css('top', '300px');
            this.element.prepend(this.content);

            this.content.show();
            this.content.animate({ opacity: 1 }, 250);
        },

        _setActiveItem: function (e) {
            var index = $.inArray(e.data.item, this.items);
            if (index == -1 || this.activeItemIndex == index) return;
            this.activeItemIndex = index;
            this._draw();
            this._triggerActiveItemChanged();
        },

        _triggerActiveItemChanged: function () {
            var item = this.items[this.activeItemIndex];
            this.element.trigger({
                type: 'activeItemChanged',
                count: this.items.length,
                activeItemIndex: this.activeItemIndex,
                id: item ? item.data('id') : -1,
                container: this.content
            });
        }
    };

    $.fn.stacker = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
				data = $this.data('stacker'),
				options = typeof option == 'object' && option;

            if (!data) {
                $this.data('stacker', new Stacker(this, $.extend({}, $.fn.stacker().defaults, options)));
            }
            if (typeof option == 'string' && typeof data[option] == 'function') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.stacker.defaults = {};

    $.fn.stacker.constructor = Stacker;
}(window.jQuery);
$('#stack').stacker();
// $('#stack').stacker('add');
document.getElementById('nextButton').addEventListener('click',function()
{
  $('#stack').stacker('next');
});
document.getElementById('prevButton').addEventListener('click',function()
{
  $('#stack').stacker('previous');
});


var dbRef=firebase.database().ref("vocab");
var totalLevelSet=0;
//this function is called when firebase return db
dbRef.on("value",function(snapshot)
{
  var vocabListAll=snapshot.val();
    var leftside=Object.keys(vocabListAll); //only array with level name
    var rightside=Object.values(vocabListAll);  //json for the rest of db
    for(var i=0;i<leftside.length-1;i++)
    {
      $('#stack').stacker('add');
    }
    var card=document.getElementsByClassName("stack-item");
    for(var i=0;i<leftside.length;i++)
    {
      card[i].style.backgroundImage =`url(${rightside[i].url})`;
    }
    var stacker = $('#stack').stacker();
    var currentId=1;

    stacker.on("activeItemChanged", function (e) {
    currentId=leftside.length-e.id+1;
});
    document.getElementById('submitButton').addEventListener('click',function(){
      // console.log(currentId);
             window.location.href=`/vocab/study/${currentId}`;
    });
});

// var dbRef=firebase.database().ref("vocab");
// var totalLevelSet=0;
// //this function is called when firebase return db
// dbRef.on("value",function(snapshot)
// {
//   var vocabListAll=snapshot.val();
//   var leftside=Object.keys(vocabListAll); //only array with level name
//   var rightside=Object.values(vocabListAll);  //json for the rest of db
//   //add picture of different levelset
//   document.querySelector('.content').innerHTML=
//   `<div class='char-book'>
//   ${leftside.map(function(levelset,index){
//     totalLevelSet=index;
//     return `<img src="${rightside[index].url}" id="Level${index}">`
//   }).join('')}
//   </div>`;
//   //add event listener for all picture
//   for(var i=0;i<totalLevelSet+1;i++)
//   {
//     document.getElementById('Level'+i).addEventListener("click",function()
//     {
//       var clickedPic=this.id;
//       var targetNum=Number(clickedPic.split("Level")[1])+1;
//       window.location.href=`/vocab/study/${targetNum}`;
//     });
//   }
// });
