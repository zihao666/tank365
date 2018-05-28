if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'tank_js'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'tank_js'.");
}
var tank_js = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var throwUPAE = Kotlin.throwUPAE;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var lines = Kotlin.kotlin.text.lines_gw00vp$;
  var unboxChar = Kotlin.unboxChar;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var addAll = Kotlin.kotlin.collections.addAll_ye1y7v$;
  var equals = Kotlin.equals;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var lazy = Kotlin.kotlin.lazy_klfg04$;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var numberToInt = Kotlin.numberToInt;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  Direction.prototype = Object.create(Enum.prototype);
  Direction.prototype.constructor = Direction;
  GameWindow.prototype = Object.create(Window.prototype);
  GameWindow.prototype.constructor = GameWindow;
  function main(args) {
    (new GameWindow('canvas', Config_getInstance().gameWidth, Config_getInstance().gameHeight)).start();
  }
  function AttackAble() {
  }
  AttackAble.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AttackAble',
    interfaces: [View]
  };
  function AutoMoveable() {
  }
  AutoMoveable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AutoMoveable',
    interfaces: [View]
  };
  function AutoShotAble() {
  }
  AutoShotAble.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AutoShotAble',
    interfaces: [View]
  };
  function Blockable() {
  }
  Blockable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Blockable',
    interfaces: [View]
  };
  function DestoryAble() {
  }
  DestoryAble.prototype.showDestory = function () {
    return null;
  };
  DestoryAble.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'DestoryAble',
    interfaces: [View]
  };
  function Moveable() {
  }
  Moveable.prototype.willCollsion_pky0ex$ = function (block) {
    var x = this.x;
    var y = this.y;
    switch (this.direction.name) {
      case 'UP':
        y = y - this.speed | 0;
        break;
      case 'DOWN':
        y = y + this.speed | 0;
        break;
      case 'LEFT':
        x = x - this.speed | 0;
        break;
      case 'RIGHT':
        x = x + this.speed | 0;
        break;
    }
    if (y >= (block.y + block.height | 0) || (y + this.height | 0) <= block.y || x >= (block.x + block.width | 0) || (x + this.width | 0) <= block.x) {
      if (x < 0 || x > (Config_getInstance().blockSize * 12 | 0) || y < 0 || y > (Config_getInstance().blockSize * 10 | 0)) {
        return this.direction;
      }
      return null;
    }
     else {
      return this.direction;
    }
  };
  Moveable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Moveable',
    interfaces: [View]
  };
  function SufferAble() {
  }
  SufferAble.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'SufferAble',
    interfaces: [View]
  };
  function Config() {
    Config_instance = this;
    this.blockSize = 64;
    this.gameWidth = this.blockSize * 13 | 0;
    this.gameHeight = this.blockSize * 11 | 0;
  }
  Config.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Config',
    interfaces: []
  };
  var Config_instance = null;
  function Config_getInstance() {
    if (Config_instance === null) {
      new Config();
    }
    return Config_instance;
  }
  function Composer() {
    Composer_instance = this;
  }
  Composer.prototype.play_61zpoe$ = function (path) {
    var tmp$;
    var ele = Kotlin.isType(tmp$ = document.createElement('audio'), HTMLAudioElement) ? tmp$ : throwCCE();
    ele.src = path;
    ele.play();
  };
  Composer.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Composer',
    interfaces: []
  };
  var Composer_instance = null;
  function Composer_getInstance() {
    if (Composer_instance === null) {
      new Composer();
    }
    return Composer_instance;
  }
  function Painter() {
    Painter_instance = this;
    this.ctx_ttteh1$_0 = this.ctx_ttteh1$_0;
  }
  Object.defineProperty(Painter.prototype, 'ctx', {
    get: function () {
      if (this.ctx_ttteh1$_0 == null)
        return throwUPAE('ctx');
      return this.ctx_ttteh1$_0;
    },
    set: function (ctx) {
      this.ctx_ttteh1$_0 = ctx;
    }
  });
  Painter.prototype.initCtx_f69bme$ = function (ctx) {
    this.ctx = ctx;
  };
  Painter.prototype.drawColor_64vbwm$ = function (color, x, y, w, h) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
    this.ctx.fillStyle = '#00000000';
  };
  Painter.prototype.drawImage_3m52m6$ = function (imgPath, x, y) {
    var tmp$;
    var ele = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    ele.src = imgPath;
    this.ctx.drawImage(ele, x, y);
  };
  function Painter$size$lambda(closure$block, closure$ele) {
    return function (it) {
      closure$block([closure$ele.naturalWidth, closure$ele.naturalHeight]);
      return Unit;
    };
  }
  Painter.prototype.size_4nnzgd$ = function (imgPath, block) {
    var tmp$;
    var ele = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    ele.src = imgPath;
    ele.onload = Painter$size$lambda(block, ele);
  };
  Painter.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Painter',
    interfaces: []
  };
  var Painter_instance = null;
  function Painter_getInstance() {
    if (Painter_instance === null) {
      new Painter();
    }
    return Painter_instance;
  }
  function Window(id, width, height) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.time = 50;
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    Painter_getInstance().initCtx_f69bme$(ctx);
  }
  function Window$start$lambda(this$Window) {
    return function (it) {
      var tmp$;
      Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : throwCCE();
      this$Window.onKeyPressed_za3lpa$(it.keyCode);
      return Unit;
    };
  }
  function Window$start$lambda_0(this$Window) {
    return function () {
      this$Window.onDisplay();
      this$Window.onRefresh();
      return Unit;
    };
  }
  Window.prototype.start = function () {
    this.onCreate();
    window.onkeypress = Window$start$lambda(this);
    window.setInterval(Window$start$lambda_0(this), this.time);
  };
  Window.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Window',
    interfaces: []
  };
  function Direction(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Direction_initFields() {
    Direction_initFields = function () {
    };
    Direction$UP_instance = new Direction('UP', 0);
    Direction$DOWN_instance = new Direction('DOWN', 1);
    Direction$LEFT_instance = new Direction('LEFT', 2);
    Direction$RIGHT_instance = new Direction('RIGHT', 3);
  }
  var Direction$UP_instance;
  function Direction$UP_getInstance() {
    Direction_initFields();
    return Direction$UP_instance;
  }
  var Direction$DOWN_instance;
  function Direction$DOWN_getInstance() {
    Direction_initFields();
    return Direction$DOWN_instance;
  }
  var Direction$LEFT_instance;
  function Direction$LEFT_getInstance() {
    Direction_initFields();
    return Direction$LEFT_instance;
  }
  var Direction$RIGHT_instance;
  function Direction$RIGHT_getInstance() {
    Direction_initFields();
    return Direction$RIGHT_instance;
  }
  Direction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Direction',
    interfaces: [Enum]
  };
  function Direction$values() {
    return [Direction$UP_getInstance(), Direction$DOWN_getInstance(), Direction$LEFT_getInstance(), Direction$RIGHT_getInstance()];
  }
  Direction.values = Direction$values;
  function Direction$valueOf(name) {
    switch (name) {
      case 'UP':
        return Direction$UP_getInstance();
      case 'DOWN':
        return Direction$DOWN_getInstance();
      case 'LEFT':
        return Direction$LEFT_getInstance();
      case 'RIGHT':
        return Direction$RIGHT_getInstance();
      default:throwISE('No enum constant enums.Direction.' + name);
    }
  }
  Direction.valueOf_61zpoe$ = Direction$valueOf;
  function GameWindow(id, width, height) {
    Window.call(this, id, width, height);
    this.viewList = ArrayList_init();
    this.tank_t3svno$_0 = lazy(GameWindow$tank$lambda);
    this.camp_sugcy5$_0 = lazy(GameWindow$camp$lambda);
    this.gameOver = false;
    this.totalEnemy = 9;
    this.boneNumber = 0;
    this.showEnemyNumber = 3;
    this.initLocations = ArrayList_init();
    this.index = 0;
  }
  Object.defineProperty(GameWindow.prototype, 'tank', {
    get: function () {
      return this.tank_t3svno$_0.value;
    }
  });
  Object.defineProperty(GameWindow.prototype, 'camp', {
    get: function () {
      return this.camp_sugcy5$_0.value;
    }
  });
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  function GameWindow$onCreate$lambda(this$GameWindow) {
    return function (result) {
      var $receiver = lines(result);
      var tmp$, tmp$_0;
      var index = 0;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var item = tmp$.next();
        var this$GameWindow_0 = this$GameWindow;
        var lineIndex = (tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0);
        var tmp$_1, tmp$_0_0;
        var index_0 = 0;
        tmp$_1 = iterator(item);
        while (tmp$_1.hasNext()) {
          var item_0 = unboxChar(tmp$_1.next());
          var rowIndex = (tmp$_0_0 = index_0, index_0 = tmp$_0_0 + 1 | 0, tmp$_0_0);
          switch (unboxChar(toBoxedChar(item_0))) {
            case 30742:
              this$GameWindow_0.viewList.add_11rb$(new Wall(Kotlin.imul(rowIndex, Config_getInstance().blockSize), Kotlin.imul(lineIndex, Config_getInstance().blockSize)));
              break;
            case 38081:
              this$GameWindow_0.viewList.add_11rb$(new Steel(Kotlin.imul(rowIndex, Config_getInstance().blockSize), Kotlin.imul(lineIndex, Config_getInstance().blockSize)));
              break;
            case 33609:
              this$GameWindow_0.viewList.add_11rb$(new Grass(Kotlin.imul(rowIndex, Config_getInstance().blockSize), Kotlin.imul(lineIndex, Config_getInstance().blockSize)));
              break;
            case 27700:
              this$GameWindow_0.viewList.add_11rb$(new Water(Kotlin.imul(rowIndex, Config_getInstance().blockSize), Kotlin.imul(lineIndex, Config_getInstance().blockSize)));
              break;
            case 25932:
              this$GameWindow_0.initLocations.add_11rb$(to(Kotlin.imul(rowIndex, Config_getInstance().blockSize), Kotlin.imul(lineIndex, Config_getInstance().blockSize)));
              break;
          }
        }
      }
      return Unit;
    };
  }
  GameWindow.prototype.onCreate = function () {
    this.readMap_hyc7mn$('map/1.map', GameWindow$onCreate$lambda(this));
    this.viewList.add_11rb$(this.tank);
    this.viewList.add_11rb$(this.camp);
  };
  GameWindow.prototype.onDisplay = function () {
    Painter_getInstance().drawColor_64vbwm$('#000000', 0.0, 0.0, this.width, this.height);
    var tmp$;
    tmp$ = this.viewList.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw();
    }
  };
  GameWindow.prototype.onKeyPressed_za3lpa$ = function (code) {
    switch (code) {
      case 97:
        this.tank.move_dhk16l$(Direction$LEFT_getInstance());
        break;
      case 100:
        this.tank.move_dhk16l$(Direction$RIGHT_getInstance());
        break;
      case 119:
        this.tank.move_dhk16l$(Direction$UP_getInstance());
        break;
      case 115:
        this.tank.move_dhk16l$(Direction$DOWN_getInstance());
        break;
      case 13:
        var bullet = this.tank.shot();
        this.viewList.add_11rb$(bullet);
        break;
    }
  };
  GameWindow.prototype.onRefresh = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var $receiver = this.viewList;
    var destination = ArrayList_init();
    var tmp$_7;
    tmp$_7 = $receiver.iterator();
    while (tmp$_7.hasNext()) {
      var element = tmp$_7.next();
      if (Kotlin.isType(element, DestoryAble))
        destination.add_11rb$(element);
    }
    var tmp$_8;
    tmp$_8 = destination.iterator();
    while (tmp$_8.hasNext()) {
      var element_0 = tmp$_8.next();
      var tmp$_9;
      Kotlin.isType(tmp$_9 = element_0, DestoryAble) ? tmp$_9 : throwCCE();
      if (element_0.needDestory()) {
        this.viewList.remove_11rb$(element_0);
        var destoryArray = element_0.showDestory();
        if (destoryArray != null) {
          addAll(this.viewList, destoryArray);
        }
      }
    }
    if (this.gameOver)
      return;
    var $receiver_0 = this.viewList;
    var destination_0 = ArrayList_init();
    var tmp$_10;
    tmp$_10 = $receiver_0.iterator();
    while (tmp$_10.hasNext()) {
      var element_1 = tmp$_10.next();
      if (Kotlin.isType(element_1, Moveable))
        destination_0.add_11rb$(element_1);
    }
    var moveList = destination_0;
    var $receiver_1 = this.viewList;
    var destination_1 = ArrayList_init();
    var tmp$_11;
    tmp$_11 = $receiver_1.iterator();
    while (tmp$_11.hasNext()) {
      var element_2 = tmp$_11.next();
      if (Kotlin.isType(element_2, Blockable))
        destination_1.add_11rb$(element_2);
    }
    var blockList = destination_1;
    tmp$ = moveList.iterator();
    while (tmp$.hasNext()) {
      var move = tmp$.next();
      Kotlin.isType(tmp$_0 = move, Moveable) ? tmp$_0 : throwCCE();
      var badBlock = null;
      var badDirection = null;
      tmp$_1 = blockList.iterator();
      blockTag: while (tmp$_1.hasNext()) {
        var block = tmp$_1.next();
        if (equals(block, move))
          continue blockTag;
        Kotlin.isType(tmp$_2 = block, Blockable) ? tmp$_2 : throwCCE();
        var direction = move.willCollsion_pky0ex$(block);
        if (direction != null) {
          badBlock = block;
          badDirection = direction;
          break blockTag;
        }
      }
      move.notifyCollision_cdwrb2$(badBlock, badDirection);
    }
    var $receiver_2 = this.viewList;
    var destination_2 = ArrayList_init();
    var tmp$_12;
    tmp$_12 = $receiver_2.iterator();
    while (tmp$_12.hasNext()) {
      var element_3 = tmp$_12.next();
      if (Kotlin.isType(element_3, AutoMoveable))
        destination_2.add_11rb$(element_3);
    }
    var tmp$_13;
    tmp$_13 = destination_2.iterator();
    while (tmp$_13.hasNext()) {
      var element_4 = tmp$_13.next();
      var tmp$_14;
      Kotlin.isType(tmp$_14 = element_4, AutoMoveable) ? tmp$_14 : throwCCE();
      element_4.autoMove();
    }
    var $receiver_3 = this.viewList;
    var destination_3 = ArrayList_init();
    var tmp$_15;
    tmp$_15 = $receiver_3.iterator();
    while (tmp$_15.hasNext()) {
      var element_5 = tmp$_15.next();
      if (Kotlin.isType(element_5, AttackAble))
        destination_3.add_11rb$(element_5);
    }
    var attackList = destination_3;
    var $receiver_4 = this.viewList;
    var destination_4 = ArrayList_init();
    var tmp$_16;
    tmp$_16 = $receiver_4.iterator();
    while (tmp$_16.hasNext()) {
      var element_6 = tmp$_16.next();
      if (Kotlin.isType(element_6, SufferAble))
        destination_4.add_11rb$(element_6);
    }
    var sufferList = destination_4;
    tmp$_3 = attackList.iterator();
    while (tmp$_3.hasNext()) {
      var attack = tmp$_3.next();
      Kotlin.isType(tmp$_4 = attack, AttackAble) ? tmp$_4 : throwCCE();
      tmp$_5 = sufferList.iterator();
      while (tmp$_5.hasNext()) {
        var suffer = tmp$_5.next();
        if (equals(attack.owner, suffer))
          continue;
        if (equals(attack, suffer))
          continue;
        Kotlin.isType(tmp$_6 = suffer, SufferAble) ? tmp$_6 : throwCCE();
        if (attack.willCollision_xc3ei1$(suffer)) {
          attack.notifyAttack_xc3ei1$(suffer);
          var blast = suffer.notifyAttack_sz95g0$(attack);
          if (blast != null) {
            addAll(this.viewList, blast);
          }
        }
      }
    }
    var $receiver_5 = this.viewList;
    var destination_5 = ArrayList_init();
    var tmp$_17;
    tmp$_17 = $receiver_5.iterator();
    while (tmp$_17.hasNext()) {
      var element_7 = tmp$_17.next();
      if (Kotlin.isType(element_7, AutoShotAble))
        destination_5.add_11rb$(element_7);
    }
    var tmp$_18;
    tmp$_18 = destination_5.iterator();
    while (tmp$_18.hasNext()) {
      var element_8 = tmp$_18.next();
      var tmp$_19;
      Kotlin.isType(tmp$_19 = element_8, AutoShotAble) ? tmp$_19 : throwCCE();
      var bullet = element_8.autoShot();
      if (bullet != null) {
        this.viewList.add_11rb$(bullet);
      }
    }
    var tmp$_20 = this.boneNumber < this.totalEnemy;
    if (tmp$_20) {
      var $receiver_6 = this.viewList;
      var destination_6 = ArrayList_init();
      var tmp$_21;
      tmp$_21 = $receiver_6.iterator();
      while (tmp$_21.hasNext()) {
        var element_9 = tmp$_21.next();
        if (Kotlin.isType(element_9, Enemy))
          destination_6.add_11rb$(element_9);
      }
      tmp$_20 = destination_6.size < this.showEnemyNumber;
    }
    if (tmp$_20) {
      this.index = this.index % this.initLocations.size;
      var pair = this.initLocations.get_za3lpa$(this.index);
      this.viewList.add_11rb$(new Enemy(pair.first, pair.second));
      this.index = this.index + 1 | 0;
      this.boneNumber = this.boneNumber + 1 | 0;
    }
    var $receiver_7 = this.viewList;
    var destination_7 = ArrayList_init();
    var tmp$_22;
    tmp$_22 = $receiver_7.iterator();
    while (tmp$_22.hasNext()) {
      var element_10 = tmp$_22.next();
      if (Kotlin.isType(element_10, Camp))
        destination_7.add_11rb$(element_10);
    }
    var tmp$_23 = destination_7.isEmpty();
    if (!tmp$_23) {
      var $receiver_8 = this.viewList;
      var destination_8 = ArrayList_init();
      var tmp$_24;
      tmp$_24 = $receiver_8.iterator();
      while (tmp$_24.hasNext()) {
        var element_11 = tmp$_24.next();
        if (Kotlin.isType(element_11, Enemy))
          destination_8.add_11rb$(element_11);
      }
      tmp$_23 = destination_8.isEmpty();
    }
    if (tmp$_23) {
      this.gameOver = true;
    }
  };
  function GameWindow$readMap$lambda(closure$xmlhttp, closure$block) {
    return function (it) {
      if (closure$xmlhttp.readyState === 4) {
        if (closure$xmlhttp.status === 200) {
          var result = closure$xmlhttp.responseText;
          closure$block(result);
        }
      }
      return Unit;
    };
  }
  GameWindow.prototype.readMap_hyc7mn$ = function (path, block) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = GameWindow$readMap$lambda(xmlhttp, block);
    xmlhttp.open('GET', path, true);
    xmlhttp.send(null);
  };
  function GameWindow$tank$lambda() {
    return new Tank(10 * Config_getInstance().blockSize | 0, 10 * Config_getInstance().blockSize | 0);
  }
  function GameWindow$camp$lambda() {
    return new Camp((5 * Config_getInstance().blockSize | 0) + 32 | 0, (10 * Config_getInstance().blockSize | 0) - 32 | 0);
  }
  GameWindow.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameWindow',
    interfaces: [Window]
  };
  function Blast(x, y) {
    this.x_drj22r$_0 = x;
    this.y_drj21w$_0 = y;
    this.width_io6mvl$_0 = Config_getInstance().blockSize;
    this.height_jh34tk$_0 = Config_getInstance().blockSize;
    this.list = ArrayList_init();
    this.index = 0;
    var tmp$;
    tmp$ = (new IntRange(1, 32)).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.list.add_11rb$('img/blast_' + element + '.png');
    }
  }
  Object.defineProperty(Blast.prototype, 'x', {
    get: function () {
      return this.x_drj22r$_0;
    },
    set: function (x) {
      this.x_drj22r$_0 = x;
    }
  });
  Object.defineProperty(Blast.prototype, 'y', {
    get: function () {
      return this.y_drj21w$_0;
    },
    set: function (y) {
      this.y_drj21w$_0 = y;
    }
  });
  Object.defineProperty(Blast.prototype, 'width', {
    get: function () {
      return this.width_io6mvl$_0;
    }
  });
  Object.defineProperty(Blast.prototype, 'height', {
    get: function () {
      return this.height_jh34tk$_0;
    }
  });
  Blast.prototype.draw = function () {
    this.index = this.index % this.list.size;
    Painter_getInstance().drawImage_3m52m6$(this.list.get_za3lpa$(this.index), this.x, this.y);
    this.index = this.index + 1 | 0;
  };
  Blast.prototype.needDestory = function () {
    return this.index === this.list.size;
  };
  Blast.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Blast',
    interfaces: [DestoryAble]
  };
  function Bullet(owner, direction, block) {
    this.owner_yddcya$_0 = owner;
    this.direction_eywf4u$_0 = direction;
    this.blood_uc4pfr$_0 = 1;
    this.attackPower_olx5j8$_0 = 1;
    this.speed_wl76qu$_0 = 8;
    this.x_9csgaf$_0 = 0;
    this.y_9csg9k$_0 = 0;
    this.width_usvl39$_0 = 0;
    this.height_uo3qfg$_0 = 0;
    this.needDestory_0 = false;
    this.imgpath_uq25ax$_0 = lazy(Bullet$imgpath$lambda(this));
    var size = Painter_getInstance().size_4nnzgd$(this.imgpath, Bullet_init$lambda(this, block));
  }
  Object.defineProperty(Bullet.prototype, 'owner', {
    get: function () {
      return this.owner_yddcya$_0;
    },
    set: function (owner) {
      this.owner_yddcya$_0 = owner;
    }
  });
  Object.defineProperty(Bullet.prototype, 'direction', {
    get: function () {
      return this.direction_eywf4u$_0;
    },
    set: function (direction) {
      this.direction_eywf4u$_0 = direction;
    }
  });
  Object.defineProperty(Bullet.prototype, 'blood', {
    get: function () {
      return this.blood_uc4pfr$_0;
    },
    set: function (blood) {
      this.blood_uc4pfr$_0 = blood;
    }
  });
  Bullet.prototype.notifyAttack_sz95g0$ = function (attack) {
    this.blood = this.blood - 1 | 0;
    return null;
  };
  Object.defineProperty(Bullet.prototype, 'attackPower', {
    get: function () {
      return this.attackPower_olx5j8$_0;
    },
    set: function (attackPower) {
      this.attackPower_olx5j8$_0 = attackPower;
    }
  });
  Object.defineProperty(Bullet.prototype, 'speed', {
    get: function () {
      return this.speed_wl76qu$_0;
    }
  });
  Object.defineProperty(Bullet.prototype, 'x', {
    get: function () {
      return this.x_9csgaf$_0;
    },
    set: function (x) {
      this.x_9csgaf$_0 = x;
    }
  });
  Object.defineProperty(Bullet.prototype, 'y', {
    get: function () {
      return this.y_9csg9k$_0;
    },
    set: function (y) {
      this.y_9csg9k$_0 = y;
    }
  });
  Object.defineProperty(Bullet.prototype, 'width', {
    get: function () {
      return this.width_usvl39$_0;
    },
    set: function (width) {
      this.width_usvl39$_0 = width;
    }
  });
  Object.defineProperty(Bullet.prototype, 'height', {
    get: function () {
      return this.height_uo3qfg$_0;
    },
    set: function (height) {
      this.height_uo3qfg$_0 = height;
    }
  });
  Object.defineProperty(Bullet.prototype, 'imgpath', {
    get: function () {
      return this.imgpath_uq25ax$_0.value;
    }
  });
  Bullet.prototype.draw = function () {
    Painter_getInstance().drawImage_3m52m6$(this.imgpath, this.x, this.y);
  };
  Bullet.prototype.autoMove = function () {
    switch (this.direction.name) {
      case 'UP':
        this.y = this.y - this.speed | 0;
        break;
      case 'DOWN':
        this.y = this.y + this.speed | 0;
        break;
      case 'LEFT':
        this.x = this.x - this.speed | 0;
        break;
      case 'RIGHT':
        this.x = this.x + this.speed | 0;
        break;
    }
  };
  Bullet.prototype.needDestory = function () {
    return this.needDestory_0 || this.x < 0 || this.x > Config_getInstance().gameWidth || this.y < 0 || this.y > Config_getInstance().gameHeight ? true : false;
  };
  Bullet.prototype.willCollision_xc3ei1$ = function (suffer) {
    return this.y > (suffer.y + suffer.height | 0) || (this.y + this.height | 0) < suffer.y || this.x > (suffer.x + suffer.width | 0) || (this.x + this.width | 0) < suffer.x ? false : true;
  };
  Bullet.prototype.notifyAttack_xc3ei1$ = function (suffer) {
    this.needDestory_0 = true;
  };
  function Bullet$imgpath$lambda(this$Bullet) {
    return function () {
      switch (this$Bullet.direction.name) {
        case 'UP':
          return 'img/bullet_u.gif';
        case 'DOWN':
          return 'img/bullet_d.gif';
        case 'LEFT':
          return 'img/bullet_l.gif';
        case 'RIGHT':
          return 'img/bullet_r.gif';
        default:return Kotlin.noWhenBranchMatched();
      }
    };
  }
  function Bullet_init$lambda(this$Bullet, closure$block) {
    return function (it) {
      this$Bullet.width = it[0];
      this$Bullet.height = it[1];
      var pair = closure$block(this$Bullet.width, this$Bullet.height);
      this$Bullet.x = pair.first;
      this$Bullet.y = pair.second;
      return Unit;
    };
  }
  Bullet.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Bullet',
    interfaces: [SufferAble, AttackAble, DestoryAble, AutoMoveable]
  };
  function Camp(x, y) {
    this.x_bhwrca$_0 = x;
    this.y_bhwrd5$_0 = y;
    this.blood_oed8ew$_0 = 12;
    this.width_ei9gys$_0 = 2 * Config_getInstance().blockSize | 0;
    this.height_wfr5it$_0 = Config_getInstance().blockSize + 32 | 0;
  }
  Object.defineProperty(Camp.prototype, 'x', {
    get: function () {
      return this.x_bhwrca$_0;
    },
    set: function (x) {
      this.x_bhwrca$_0 = x;
    }
  });
  Object.defineProperty(Camp.prototype, 'y', {
    get: function () {
      return this.y_bhwrd5$_0;
    },
    set: function (y) {
      this.y_bhwrd5$_0 = y;
    }
  });
  Camp.prototype.needDestory = function () {
    return this.blood <= 0;
  };
  Camp.prototype.showDestory = function () {
    return [new Blast(this.x - 32 | 0, this.y - 32 | 0), new Blast(this.x, this.y - 32 | 0), new Blast(this.x + 32 | 0, this.y - 32 | 0), new Blast(this.x - 32 | 0, this.y), new Blast(this.x, this.y), new Blast(this.x + 32 | 0, this.y), new Blast(this.x - 32 | 0, this.y + 32 | 0), new Blast(this.x, this.y + 32 | 0), new Blast(this.x + 32 | 0, this.y + 32 | 0)];
  };
  Object.defineProperty(Camp.prototype, 'blood', {
    get: function () {
      return this.blood_oed8ew$_0;
    },
    set: function (blood) {
      this.blood_oed8ew$_0 = blood;
    }
  });
  Camp.prototype.notifyAttack_sz95g0$ = function (attack) {
    this.blood = this.blood - attack.attackPower | 0;
    if (this.blood === 3 || this.blood === 6) {
      var x = this.x - 32 | 0;
      var y = this.y - 32 | 0;
      return [new Blast(x, y), new Blast(x + 32 | 0, y), new Blast(x + Config_getInstance().blockSize | 0, y), new Blast(x + Config_getInstance().blockSize + 32 | 0, y), new Blast(x + (Config_getInstance().blockSize * 2 | 0) | 0, y), new Blast(x, y + 32 | 0), new Blast(x, y + Config_getInstance().blockSize | 0), new Blast(x, y + Config_getInstance().blockSize + 32 | 0), new Blast(x + (Config_getInstance().blockSize * 2 | 0) | 0, y + 32 | 0), new Blast(x + (Config_getInstance().blockSize * 2 | 0) | 0, y + Config_getInstance().blockSize | 0), new Blast(x + (Config_getInstance().blockSize * 2 | 0) | 0, y + Config_getInstance().blockSize + 32 | 0)];
    }
    return null;
  };
  Object.defineProperty(Camp.prototype, 'width', {
    get: function () {
      return this.width_ei9gys$_0;
    },
    set: function (width) {
      this.width_ei9gys$_0 = width;
    }
  });
  Object.defineProperty(Camp.prototype, 'height', {
    get: function () {
      return this.height_wfr5it$_0;
    },
    set: function (height) {
      this.height_wfr5it$_0 = height;
    }
  });
  Camp.prototype.draw = function () {
    if (this.blood <= 3) {
      this.width = Config_getInstance().blockSize;
      this.height = Config_getInstance().blockSize;
      this.x = (Config_getInstance().gameWidth / 2 | 0) - 32 | 0;
      this.y = Config_getInstance().gameHeight - Config_getInstance().blockSize | 0;
      Painter_getInstance().drawImage_3m52m6$('img/camp.gif', this.x, this.y);
    }
     else if (this.blood <= 6) {
      Painter_getInstance().drawImage_3m52m6$('img/camp.gif', this.x + 32 | 0, this.y + 32 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x + 32 | 0, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x + 64 | 0, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x + 96 | 0, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x, this.y + 32 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x, this.y + 64 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x + 96 | 0, this.y + 32 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/wall_small.gif', this.x + 96 | 0, this.y + 64 | 0);
    }
     else {
      Painter_getInstance().drawImage_3m52m6$('img/camp.gif', this.x + 32 | 0, this.y + 32 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x + 32 | 0, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x + 64 | 0, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x + 96 | 0, this.y);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x, this.y + 32 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x, this.y + 64 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x + 96 | 0, this.y + 32 | 0);
      Painter_getInstance().drawImage_3m52m6$('img/steel_small.gif', this.x + 96 | 0, this.y + 64 | 0);
    }
  };
  Camp.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Camp',
    interfaces: [DestoryAble, SufferAble, Blockable, View]
  };
  function Enemy(x, y) {
    this.x_wtzsj1$_0 = x;
    this.y_wtzsjw$_0 = y;
    this.blood_fs0c4r$_0 = 3;
    this.interval_kchzyi$_0 = 1000;
    this.badBlock_tkht5z$_0 = null;
    this.badDirection_io21it$_0 = null;
    this.speed_nvshxa$_0 = 4;
    this.directions_ntg3x7$_0 = lazy(Enemy$directions$lambda);
    this.direction_le1p1i$_0 = Direction$DOWN_getInstance();
    this.width_po43kv$_0 = Config_getInstance().blockSize;
    this.height_5j0lt4$_0 = Config_getInstance().blockSize;
    this.startTime = Kotlin.Long.fromNumber((new Date()).getTime());
  }
  Object.defineProperty(Enemy.prototype, 'x', {
    get: function () {
      return this.x_wtzsj1$_0;
    },
    set: function (x) {
      this.x_wtzsj1$_0 = x;
    }
  });
  Object.defineProperty(Enemy.prototype, 'y', {
    get: function () {
      return this.y_wtzsjw$_0;
    },
    set: function (y) {
      this.y_wtzsjw$_0 = y;
    }
  });
  Object.defineProperty(Enemy.prototype, 'blood', {
    get: function () {
      return this.blood_fs0c4r$_0;
    },
    set: function (blood) {
      this.blood_fs0c4r$_0 = blood;
    }
  });
  Enemy.prototype.notifyAttack_sz95g0$ = function (attack) {
    if (Kotlin.isType(attack.owner, Enemy))
      return null;
    this.blood = this.blood - 1 | 0;
    return [new Blast(this.x, this.y)];
  };
  Object.defineProperty(Enemy.prototype, 'interval', {
    get: function () {
      return this.interval_kchzyi$_0;
    }
  });
  Object.defineProperty(Enemy.prototype, 'badBlock', {
    get: function () {
      return this.badBlock_tkht5z$_0;
    },
    set: function (badBlock) {
      this.badBlock_tkht5z$_0 = badBlock;
    }
  });
  Object.defineProperty(Enemy.prototype, 'badDirection', {
    get: function () {
      return this.badDirection_io21it$_0;
    },
    set: function (badDirection) {
      this.badDirection_io21it$_0 = badDirection;
    }
  });
  Object.defineProperty(Enemy.prototype, 'speed', {
    get: function () {
      return this.speed_nvshxa$_0;
    }
  });
  Object.defineProperty(Enemy.prototype, 'directions', {
    get: function () {
      return this.directions_ntg3x7$_0.value;
    }
  });
  Enemy.prototype.autoMove = function () {
    if (equals(this.direction, this.badDirection)) {
      this.direction = this.randomDirection_0(this.badDirection);
      return;
    }
    switch (this.direction.name) {
      case 'UP':
        this.y = this.y - this.speed | 0;
        break;
      case 'DOWN':
        this.y = this.y + this.speed | 0;
        break;
      case 'LEFT':
        this.x = this.x - this.speed | 0;
        break;
      case 'RIGHT':
        this.x = this.x + this.speed | 0;
        break;
    }
  };
  Enemy.prototype.randomDirection_0 = function (badDirection) {
    var random = numberToInt(Math.random() * 4);
    var newDirection = this.directions[random];
    if (equals(newDirection, badDirection)) {
      return this.randomDirection_0(badDirection);
    }
    return newDirection;
  };
  Object.defineProperty(Enemy.prototype, 'direction', {
    get: function () {
      return this.direction_le1p1i$_0;
    },
    set: function (direction) {
      this.direction_le1p1i$_0 = direction;
    }
  });
  Enemy.prototype.notifyCollision_cdwrb2$ = function (badBlock, badDirection) {
    this.badBlock = badBlock;
    this.badDirection = badDirection;
  };
  Object.defineProperty(Enemy.prototype, 'width', {
    get: function () {
      return this.width_po43kv$_0;
    }
  });
  Object.defineProperty(Enemy.prototype, 'height', {
    get: function () {
      return this.height_5j0lt4$_0;
    }
  });
  Enemy.prototype.draw = function () {
    var tmp$, tmp$_0;
    tmp$_0 = Painter_getInstance();
    switch (this.direction.name) {
      case 'UP':
        tmp$ = 'img/enemy_1_u.gif';
        break;
      case 'DOWN':
        tmp$ = 'img/enemy_1_d.gif';
        break;
      case 'LEFT':
        tmp$ = 'img/enemy_1_l.gif';
        break;
      case 'RIGHT':
        tmp$ = 'img/enemy_1_r.gif';
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    tmp$_0.drawImage_3m52m6$(tmp$, this.x, this.y);
  };
  function Enemy$autoShot$lambda(this$Enemy, closure$bulletX, closure$bulletY) {
    return function (bulletWidth, bulletHeight) {
      switch (this$Enemy.direction.name) {
        case 'UP':
          closure$bulletX.v = this$Enemy.x + ((this$Enemy.width - bulletWidth | 0) / 2 | 0) | 0;
          closure$bulletY.v = this$Enemy.y - (bulletHeight / 2 | 0) | 0;
          break;
        case 'DOWN':
          closure$bulletX.v = this$Enemy.x + ((this$Enemy.width - bulletWidth | 0) / 2 | 0) | 0;
          closure$bulletY.v = this$Enemy.y + this$Enemy.height - (bulletHeight / 2 | 0) | 0;
          break;
        case 'LEFT':
          closure$bulletX.v = this$Enemy.x - (bulletWidth / 2 | 0) | 0;
          closure$bulletY.v = this$Enemy.y + ((this$Enemy.height - bulletHeight | 0) / 2 | 0) | 0;
          break;
        case 'RIGHT':
          closure$bulletX.v = this$Enemy.x + this$Enemy.width - (bulletWidth / 2 | 0) | 0;
          closure$bulletY.v = this$Enemy.y + ((this$Enemy.height - bulletHeight | 0) / 2 | 0) | 0;
          break;
      }
      return to(closure$bulletX.v, closure$bulletY.v);
    };
  }
  Enemy.prototype.autoShot = function () {
    var cur = Kotlin.Long.fromNumber((new Date()).getTime());
    if (cur.subtract(this.startTime).compareTo_11rb$(Kotlin.Long.fromInt(this.interval)) < 0)
      return null;
    this.startTime = cur;
    var bulletX = {v: 0};
    var bulletY = {v: 0};
    return new Bullet(this, this.direction, Enemy$autoShot$lambda(this, bulletX, bulletY));
  };
  Enemy.prototype.needDestory = function () {
    return this.blood <= 0;
  };
  function Enemy$directions$lambda() {
    return Direction$values();
  }
  Enemy.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Enemy',
    interfaces: [DestoryAble, SufferAble, AutoShotAble, Blockable, AutoMoveable, Moveable]
  };
  function Grass(x, y) {
    this.x_5bm7nj$_0 = x;
    this.y_5bm7oe$_0 = y;
    this.width_21cwy7$_0 = Config_getInstance().blockSize;
    this.height_11a6wa$_0 = Config_getInstance().blockSize;
  }
  Object.defineProperty(Grass.prototype, 'x', {
    get: function () {
      return this.x_5bm7nj$_0;
    },
    set: function (x) {
      this.x_5bm7nj$_0 = x;
    }
  });
  Object.defineProperty(Grass.prototype, 'y', {
    get: function () {
      return this.y_5bm7oe$_0;
    },
    set: function (y) {
      this.y_5bm7oe$_0 = y;
    }
  });
  Object.defineProperty(Grass.prototype, 'width', {
    get: function () {
      return this.width_21cwy7$_0;
    }
  });
  Object.defineProperty(Grass.prototype, 'height', {
    get: function () {
      return this.height_11a6wa$_0;
    }
  });
  Grass.prototype.draw = function () {
    Painter_getInstance().drawImage_3m52m6$('img/grass.gif', this.x, this.y);
  };
  Grass.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Grass',
    interfaces: [View]
  };
  function Steel(x, y) {
    this.x_r2p3be$_0 = x;
    this.y_r2p3c9$_0 = y;
    this.blood_fx0te0$_0 = 0;
    this.width_pt4ku4$_0 = Config_getInstance().blockSize;
    this.height_9ufgrv$_0 = Config_getInstance().blockSize;
  }
  Object.defineProperty(Steel.prototype, 'x', {
    get: function () {
      return this.x_r2p3be$_0;
    },
    set: function (x) {
      this.x_r2p3be$_0 = x;
    }
  });
  Object.defineProperty(Steel.prototype, 'y', {
    get: function () {
      return this.y_r2p3c9$_0;
    },
    set: function (y) {
      this.y_r2p3c9$_0 = y;
    }
  });
  Object.defineProperty(Steel.prototype, 'blood', {
    get: function () {
      return this.blood_fx0te0$_0;
    },
    set: function (blood) {
      this.blood_fx0te0$_0 = blood;
    }
  });
  Steel.prototype.notifyAttack_sz95g0$ = function (attack) {
    return null;
  };
  Object.defineProperty(Steel.prototype, 'width', {
    get: function () {
      return this.width_pt4ku4$_0;
    }
  });
  Object.defineProperty(Steel.prototype, 'height', {
    get: function () {
      return this.height_9ufgrv$_0;
    }
  });
  Steel.prototype.draw = function () {
    Painter_getInstance().drawImage_3m52m6$('img/steel.gif', this.x, this.y);
  };
  Steel.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Steel',
    interfaces: [SufferAble, Blockable]
  };
  function Tank(x, y) {
    this.x_n3c13z$_0 = x;
    this.y_n3c134$_0 = y;
    this.blood_6oxk0v$_0 = 10;
    this.width_gl1bgz$_0 = Config_getInstance().blockSize;
    this.height_802md0$_0 = Config_getInstance().blockSize;
    this.direction_ce42py$_0 = Direction$UP_getInstance();
    this.badBlock_86jb2l$_0 = null;
    this.badDirection_lvxocf$_0 = null;
    this.speed_esppte$_0 = 8;
  }
  Object.defineProperty(Tank.prototype, 'x', {
    get: function () {
      return this.x_n3c13z$_0;
    },
    set: function (x) {
      this.x_n3c13z$_0 = x;
    }
  });
  Object.defineProperty(Tank.prototype, 'y', {
    get: function () {
      return this.y_n3c134$_0;
    },
    set: function (y) {
      this.y_n3c134$_0 = y;
    }
  });
  Tank.prototype.needDestory = function () {
    return this.blood <= 0;
  };
  Object.defineProperty(Tank.prototype, 'blood', {
    get: function () {
      return this.blood_6oxk0v$_0;
    },
    set: function (blood) {
      this.blood_6oxk0v$_0 = blood;
    }
  });
  Tank.prototype.notifyAttack_sz95g0$ = function (attack) {
    this.blood = this.blood - 1 | 0;
    return [new Blast(this.x, this.y)];
  };
  Object.defineProperty(Tank.prototype, 'width', {
    get: function () {
      return this.width_gl1bgz$_0;
    }
  });
  Object.defineProperty(Tank.prototype, 'height', {
    get: function () {
      return this.height_802md0$_0;
    }
  });
  Object.defineProperty(Tank.prototype, 'direction', {
    get: function () {
      return this.direction_ce42py$_0;
    },
    set: function (direction) {
      this.direction_ce42py$_0 = direction;
    }
  });
  Object.defineProperty(Tank.prototype, 'badBlock', {
    get: function () {
      return this.badBlock_86jb2l$_0;
    },
    set: function (badBlock) {
      this.badBlock_86jb2l$_0 = badBlock;
    }
  });
  Object.defineProperty(Tank.prototype, 'badDirection', {
    get: function () {
      return this.badDirection_lvxocf$_0;
    },
    set: function (badDirection) {
      this.badDirection_lvxocf$_0 = badDirection;
    }
  });
  Object.defineProperty(Tank.prototype, 'speed', {
    get: function () {
      return this.speed_esppte$_0;
    }
  });
  Tank.prototype.move_dhk16l$ = function (dir) {
    if (this.direction !== dir) {
      this.direction = dir;
      return;
    }
    if (equals(this.direction, this.badDirection))
      return;
    switch (this.direction.name) {
      case 'UP':
        this.y = this.y - this.speed | 0;
        break;
      case 'DOWN':
        this.y = this.y + this.speed | 0;
        break;
      case 'LEFT':
        this.x = this.x - this.speed | 0;
        break;
      case 'RIGHT':
        this.x = this.x + this.speed | 0;
        break;
    }
  };
  Tank.prototype.draw = function () {
    var tmp$, tmp$_0;
    tmp$_0 = Painter_getInstance();
    switch (this.direction.name) {
      case 'UP':
        tmp$ = 'img/tank_u.gif';
        break;
      case 'DOWN':
        tmp$ = 'img/tank_d.gif';
        break;
      case 'LEFT':
        tmp$ = 'img/tank_l.gif';
        break;
      case 'RIGHT':
        tmp$ = 'img/tank_r.gif';
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    tmp$_0.drawImage_3m52m6$(tmp$, this.x, this.y);
  };
  Tank.prototype.notifyCollision_cdwrb2$ = function (badBlock, badDirection) {
    this.badBlock = badBlock;
    this.badDirection = badDirection;
  };
  function Tank$shot$lambda(this$Tank, closure$bulletX, closure$bulletY) {
    return function (bulletWidth, bulletHeight) {
      println('\u5BBD\u5EA6:' + bulletWidth + ' \u9AD8\u5EA6:' + bulletHeight);
      switch (this$Tank.direction.name) {
        case 'UP':
          closure$bulletX.v = this$Tank.x + ((this$Tank.width - bulletWidth | 0) / 2 | 0) | 0;
          closure$bulletY.v = this$Tank.y - (bulletHeight / 2 | 0) | 0;
          break;
        case 'DOWN':
          closure$bulletX.v = this$Tank.x + ((this$Tank.width - bulletWidth | 0) / 2 | 0) | 0;
          closure$bulletY.v = this$Tank.y + this$Tank.height - (bulletHeight / 2 | 0) | 0;
          break;
        case 'LEFT':
          closure$bulletX.v = this$Tank.x - (bulletWidth / 2 | 0) | 0;
          closure$bulletY.v = this$Tank.y + ((this$Tank.height - bulletHeight | 0) / 2 | 0) | 0;
          break;
        case 'RIGHT':
          closure$bulletX.v = this$Tank.x + this$Tank.width - (bulletWidth / 2 | 0) | 0;
          closure$bulletY.v = this$Tank.y + ((this$Tank.height - bulletHeight | 0) / 2 | 0) | 0;
          break;
      }
      return to(closure$bulletX.v, closure$bulletY.v);
    };
  }
  Tank.prototype.shot = function () {
    var bulletX = {v: 0};
    var bulletY = {v: 0};
    return new Bullet(this, this.direction, Tank$shot$lambda(this, bulletX, bulletY));
  };
  Tank.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Tank',
    interfaces: [DestoryAble, SufferAble, Blockable, Moveable]
  };
  function View() {
  }
  View.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'View',
    interfaces: []
  };
  function Wall(x, y) {
    this.x_kwrvcx$_0 = x;
    this.y_kwrvds$_0 = y;
    this.blood_657d1b$_0 = 3;
    this.width_g1b4hf$_0 = Config_getInstance().blockSize;
    this.height_8zhe98$_0 = Config_getInstance().blockSize;
  }
  Object.defineProperty(Wall.prototype, 'x', {
    get: function () {
      return this.x_kwrvcx$_0;
    },
    set: function (x) {
      this.x_kwrvcx$_0 = x;
    }
  });
  Object.defineProperty(Wall.prototype, 'y', {
    get: function () {
      return this.y_kwrvds$_0;
    },
    set: function (y) {
      this.y_kwrvds$_0 = y;
    }
  });
  Wall.prototype.needDestory = function () {
    return this.blood <= 0;
  };
  Object.defineProperty(Wall.prototype, 'blood', {
    get: function () {
      return this.blood_657d1b$_0;
    },
    set: function (blood) {
      this.blood_657d1b$_0 = blood;
    }
  });
  Object.defineProperty(Wall.prototype, 'width', {
    get: function () {
      return this.width_g1b4hf$_0;
    }
  });
  Object.defineProperty(Wall.prototype, 'height', {
    get: function () {
      return this.height_8zhe98$_0;
    }
  });
  Wall.prototype.draw = function () {
    Painter_getInstance().drawImage_3m52m6$('img/wall.gif', this.x, this.y);
  };
  Wall.prototype.notifyAttack_sz95g0$ = function (attack) {
    this.blood = this.blood - attack.attackPower | 0;
    Composer_getInstance().play_61zpoe$('snd/hit.wav');
    return [new Blast(this.x, this.y)];
  };
  Wall.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Wall',
    interfaces: [DestoryAble, SufferAble, Blockable]
  };
  function Water(x, y) {
    this.x_cnnv3y$_0 = x;
    this.y_cnnv4t$_0 = y;
    this.width_cvhbcg$_0 = Config_getInstance().blockSize;
    this.height_z22mev$_0 = Config_getInstance().blockSize;
  }
  Object.defineProperty(Water.prototype, 'x', {
    get: function () {
      return this.x_cnnv3y$_0;
    },
    set: function (x) {
      this.x_cnnv3y$_0 = x;
    }
  });
  Object.defineProperty(Water.prototype, 'y', {
    get: function () {
      return this.y_cnnv4t$_0;
    },
    set: function (y) {
      this.y_cnnv4t$_0 = y;
    }
  });
  Object.defineProperty(Water.prototype, 'width', {
    get: function () {
      return this.width_cvhbcg$_0;
    }
  });
  Object.defineProperty(Water.prototype, 'height', {
    get: function () {
      return this.height_z22mev$_0;
    }
  });
  Water.prototype.draw = function () {
    Painter_getInstance().drawImage_3m52m6$('img/water.gif', this.x, this.y);
  };
  Water.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Water',
    interfaces: [Blockable]
  };
  _.main_kand9s$ = main;
  var package$business = _.business || (_.business = {});
  package$business.AttackAble = AttackAble;
  package$business.AutoMoveable = AutoMoveable;
  package$business.AutoShotAble = AutoShotAble;
  package$business.Blockable = Blockable;
  package$business.DestoryAble = DestoryAble;
  package$business.Moveable = Moveable;
  package$business.SufferAble = SufferAble;
  Object.defineProperty(_, 'Config', {
    get: Config_getInstance
  });
  var package$core = _.core || (_.core = {});
  Object.defineProperty(package$core, 'Composer', {
    get: Composer_getInstance
  });
  Object.defineProperty(package$core, 'Painter', {
    get: Painter_getInstance
  });
  package$core.Window = Window;
  Object.defineProperty(Direction, 'UP', {
    get: Direction$UP_getInstance
  });
  Object.defineProperty(Direction, 'DOWN', {
    get: Direction$DOWN_getInstance
  });
  Object.defineProperty(Direction, 'LEFT', {
    get: Direction$LEFT_getInstance
  });
  Object.defineProperty(Direction, 'RIGHT', {
    get: Direction$RIGHT_getInstance
  });
  var package$enums = _.enums || (_.enums = {});
  package$enums.Direction = Direction;
  _.GameWindow = GameWindow;
  var package$model = _.model || (_.model = {});
  package$model.Blast = Blast;
  package$model.Bullet = Bullet;
  package$model.Camp = Camp;
  package$model.Enemy = Enemy;
  package$model.Grass = Grass;
  package$model.Steel = Steel;
  package$model.Tank = Tank;
  package$model.View = View;
  package$model.Wall = Wall;
  package$model.Water = Water;
  Blast.prototype.showDestory = DestoryAble.prototype.showDestory;
  Bullet.prototype.showDestory = DestoryAble.prototype.showDestory;
  Enemy.prototype.willCollsion_pky0ex$ = Moveable.prototype.willCollsion_pky0ex$;
  Enemy.prototype.showDestory = DestoryAble.prototype.showDestory;
  Tank.prototype.willCollsion_pky0ex$ = Moveable.prototype.willCollsion_pky0ex$;
  Tank.prototype.showDestory = DestoryAble.prototype.showDestory;
  Wall.prototype.showDestory = DestoryAble.prototype.showDestory;
  main([]);
  Kotlin.defineModule('tank_js', _);
  return _;
}(typeof tank_js === 'undefined' ? {} : tank_js, kotlin);
