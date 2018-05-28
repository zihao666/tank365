import business.*
import core.Painter
import core.Window
import enums.Direction
import model.Camp
import model.Enemy
import model.View
import org.w3c.xhr.XMLHttpRequest

/**
 * ClassName:GameWindow
 * Description:游戏窗体
 */
class GameWindow(id: String, width: Int, height: Int) : Window(id, width, height) {
    val viewList = ArrayList<View>()

    val tank by lazy { model.Tank(10 * Config.blockSize, 10 * Config.blockSize) }

    //大本营
    val camp by lazy { Camp(5 * Config.blockSize + 32, 10 * Config.blockSize - 32) }

    //游戏是否结束
    var gameOver = false

    //定义敌方坦克数量
    var totalEnemy = 9
    //已经出生的坦克
    var boneNumber = 0
    //敌方坦克最多显示个数
    var showEnemyNumber = 3
    //敌方出生点位置
    var initLocations = ArrayList<Pair<Int, Int>>()
    //出生地点下标
    var index = 0

    override fun onCreate() {
        //添加我方坦克
        readMap("map/1.map") { result ->
            result.lines().forEachIndexed { lineIndex, s ->
                s.forEachIndexed { rowIndex, c ->
                    when (c) {
                        '砖' -> viewList.add(model.Wall(rowIndex * Config.blockSize, lineIndex * Config.blockSize))
                        '铁' -> viewList.add(model.Steel(rowIndex * Config.blockSize, lineIndex * Config.blockSize))
                        '草' -> viewList.add(model.Grass(rowIndex * Config.blockSize, lineIndex * Config.blockSize))
                        '水' -> viewList.add(model.Water(rowIndex * Config.blockSize, lineIndex * Config.blockSize))
                        '敌' -> initLocations.add(rowIndex * Config.blockSize to  lineIndex * Config.blockSize)
                    }
                }
            }
        }

        //添加坦克
        viewList.add(tank)

        //添加大本营
        viewList.add(camp)
    }

    override fun onDisplay() {
        //绘制背景
        Painter.drawColor("#000000", 0.0, 0.0, width.toDouble(), height.toDouble())
        //绘制元素
        viewList.forEach { it.draw() }
    }

    override fun onKeyPressed(code: Int) {
        when (code) {
            97 -> {//A
                tank.move(Direction.LEFT)
            }
            100 -> {//D
                tank.move(Direction.RIGHT)
            }
            119 -> {//W
                tank.move(Direction.UP)
            }
            115 -> {//S
                tank.move(Direction.DOWN)
            }
            13 -> {//Enter
                val bullet = tank.shot()
                viewList.add(bullet)
            }
        }
    }

    override fun onRefresh() {
        /*---------------------------- 界面中元素的销毁 ----------------------------*/
        viewList.filter { it is DestoryAble }.forEach {
            it as DestoryAble
            if (it.needDestory()) {
                viewList.remove(it)
                val destoryArray = it.showDestory()
                destoryArray?.let {
                    viewList.addAll(destoryArray)
                }
            }
        }

        //判断游戏是否结束
        if (gameOver) return
        /*---------------------------- 判断坦克和阻挡物的碰撞 ----------------------------*/
        val moveList = viewList.filter { it is Moveable }
        val blockList = viewList.filter { it is Blockable }

        for (move in moveList) {
            move as Moveable
            //碰撞物
            var badBlock: Blockable? = null
            //碰撞方向
            var badDirection: Direction? = null

            blockTag@ for (block in blockList) {
                if (block == move) continue@blockTag

                block as Blockable
                //碰撞结果
                val direction = move.willCollsion(block)
                //检测到碰撞跳出里层循环
                if (direction != null) {
                    badBlock = block
                    badDirection = direction
                    break@blockTag
                }
            }

            //通知发生碰撞了
            move.notifyCollision(badBlock, badDirection)
        }


        /*---------------------------- 自动移动的物体 ----------------------------*/
        viewList.filter { it is AutoMoveable }.forEach {
            it as AutoMoveable
            it.autoMove()
        }
        /*---------------------------- 判断攻与受 ----------------------------*/
        val attackList = viewList.filter { it is AttackAble }
        val sufferList = viewList.filter { it is SufferAble }

        for (attack in attackList) {
            attack as AttackAble
            for (suffer in sufferList) {
                //如果是子弹的所有者就不用检测了
                if (attack.owner == suffer) continue
                //如果是自己也不用检测了
                if (attack == suffer) continue
                suffer as SufferAble
                if (attack.willCollision(suffer)) {
                    //受攻击
                    //通知攻击者发生了碰撞
                    attack.notifyAttack(suffer)
                    //通知受攻击者发生了碰撞
                    val blast = suffer.notifyAttack(attack)
                    //爆炸物
                    blast?.let {
                        viewList.addAll(it)
                    }
                }
            }
        }
        /*---------------------------- 敌方坦克自动射击 ----------------------------*/
        viewList.filter { it is AutoShotAble }.forEach {
            it as AutoShotAble
            val bullet = it.autoShot()
            bullet?.let {
                viewList.add(it)
            }
        }

        /*---------------------------- 检测敌方出生 ----------------------------*/
        if (boneNumber<totalEnemy && viewList.filter { it is Enemy }.size < showEnemyNumber) {
            index %= initLocations.size
            val pair = initLocations[index]
            viewList.add(Enemy(pair.first, pair.second))
            index++
            boneNumber++
        }
        /*---------------------------- 判断游戏是否结束 ----------------------------*/
        if (viewList.filter { it is Camp }.isEmpty() || viewList.filter { it is Enemy }.isEmpty()) {
            gameOver = true
        }
    }

    /**
     * 读取地图
     */
    fun readMap(path: String, block: (String) -> Unit) {
        val xmlhttp = XMLHttpRequest()
        xmlhttp.onreadystatechange = {
            if (xmlhttp.readyState.toInt() == 4) {
                if (xmlhttp.status.toInt() == 200) {
                    val result = xmlhttp.responseText
                    block(result)
                }
            }
        }
        xmlhttp.open("GET", path, true);
        xmlhttp.send(null);
    }
}