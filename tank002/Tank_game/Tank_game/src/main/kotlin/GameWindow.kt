import business.*
import enums.Direction
import javafx.scene.input.KeyCode
import javafx.scene.input.KeyEvent
import model.*
import org.itheima.kotlin.game.core.Window
import java.io.File
import java.util.*
import java.util.concurrent.CopyOnWriteArrayList

/**
 * ClassName:GameWindow
 * Description:游戏窗体
 */
class GameWindow : Window(title = "坦克大战", icon = "img/logo.jpg", width = Config.gameWidth, height = Config.gameHeight) {
    //保存元素的集合Vector
    val list = CopyOnWriteArrayList<View>()
    //保存我方坦克
    lateinit var tank: Tank
    //大本营
    val camp by lazy { Camp(Config.gameWidth/2-Config.blockSize,Config.gameHeight-Config.blockSize-32) }

    //游戏是否停止子弹
    var gameOver = false

    //敌方坦克总量
    val totalEnemy = 10
    //已经出生的坦克数量
    var bornEnemy = 0
    //界面中最大显示敌机的数量
    val showEnemy = 3
    //保存敌机出生地集合
    val locationList = ArrayList<Pair<Int,Int>>()
    //记录出生index
    var bornIndex = 0

    override fun onCreate() {
        //加载地图  需要的对象创建出来
        //获取文件路劲
        val path = javaClass.getResource("map/1.map").path
        val file = File(path)
        //按照行读取
        val lines = file.readLines()
        //遍历每一行
        lines.forEachIndexed { lineIndex, s ->
            //行
            s.forEachIndexed { rowIndex, c ->
                //列
                when (c) {
                    '砖' -> {
                        //创建砖对象
                        val wall = Wall(rowIndex * Config.blockSize, lineIndex * Config.blockSize)
                        //通过容器保存对象
                        list.add(wall)
                    }
                    '铁' -> {
                        //创建砖对象
                        val steel = Steel(rowIndex * Config.blockSize, lineIndex * Config.blockSize)
                        //通过容器保存对象
                        list.add(steel)
                    }
                    '水' -> {
                        //创建砖对象
                        val water = Water(rowIndex * Config.blockSize, lineIndex * Config.blockSize)
                        //通过容器保存对象
                        list.add(water)
                    }
                    '草' -> {
                        //创建砖对象
                        val grass = Grass(rowIndex * Config.blockSize, lineIndex * Config.blockSize)
                        //通过容器保存对象
                        list.add(grass)
                    }
                    '敌' -> {
                        locationList.add(rowIndex * Config.blockSize to lineIndex * Config.blockSize)
//                        //创建砖对象
//                        val enemy = Enemy()
//                        //通过容器保存对象
//                        list.add(enemy)
                    }
                    '我' -> {
                        //创建砖对象
                        tank = Tank(rowIndex * Config.blockSize, lineIndex * Config.blockSize)
                        //通过容器保存对象
                        list.add(tank)
                    }
                }
            }

        }

        //排序
        list.sortBy { it.code }
        //添加大本营
        list.add(camp)
    }

    override fun onDisplay() {
        list.forEach { it.draw() }
    }

    override fun onKeyPressed(event: KeyEvent) {
        //游戏停止  不能移动
        if(gameOver)return
        when (event.code) {
            KeyCode.A -> tank.move(Direction.LEFT)
            KeyCode.D -> tank.move(Direction.RIGHT)
            KeyCode.W -> tank.move(Direction.UP)
            KeyCode.S -> tank.move(Direction.DOWN)
            KeyCode.ENTER -> {
                //发射一枚子弹
                //创建Bullet对象 添加到集合中
                val bullet: Bullet = tank.shot()
                list.add(bullet)
            }
        }
    }

    override fun onRefresh() {
        /*---------------------------- 销毁物体 ----------------------------*/
        val desList = list.filter { it is DestoryAble }
        desList.forEach {
            it as DestoryAble
            if (it.needDestory()) {
                //需要销毁
                list.remove(it)
                //显示销毁效果
                val result = it.destoryXg()
                result?.let { list.addAll(result) }
            }
        }
        /*---------------------------- 游戏结束判断 ----------------------------*/
        if(gameOver)return

        /*---------------------------- 移动和碰撞逻辑检测 ----------------------------*/
        //每一个移动的物体和阻挡的物体做碰撞检测
        val moveList = list.filter { it is MoveAble }
        val blockList = list.filter { it is BlockAble }

        //碰撞检测
//        moveList.forEach {move->
//            move as MoveAble
//            blockList.forEach {block->
//                block as BlockAble
//                //有没有碰撞方法
//                val direction = move.willCollision(block)
//                //有没有碰撞
//                if(direction!=null){
//                    //有碰撞
//                    //跳出内部循环
//                    break
//                    //通知移动的物品发生碰撞了
//                }
//            }
//        }
        for (move in moveList) {
            move as MoveAble
            //碰撞物
            var badBlock: BlockAble? = null
            //碰撞方向
            var badDirection: Direction? = null

            innerTag@ for (block in blockList) {
                block as BlockAble
                //排除自己
                if(move==block)continue

                //有没有碰撞方法
                val direction = move.willCollision(block)
                //有没有碰撞
                if (direction != null) {
                    //有碰撞
                    //通知移动的物品发生碰撞了(通知碰撞物  碰撞方向)
                    badBlock = block
                    badDirection = direction
                    //跳出内部循环
                    break@innerTag
                }
            }
            //通知碰撞情况
            move.notifyCollision(badBlock, badDirection)
        }

        /*---------------------------- 自动移动的物体 ----------------------------*/
        val autoMoveList = list.filter { it is AutoMoveAble }
        autoMoveList.forEach {
            it as AutoMoveAble
            it.autoMove()
        }

        /*---------------------------- 攻与受的碰撞判断 ----------------------------*/
        val attacList = list.filter { it is AttackAble }
        val sufferList = list.filter { it is SufferAble }

        for (attack in attacList) {
            attack as AttackAble
            for (suffer in sufferList) {
                suffer as SufferAble
                //自己发射的子弹 打到自己了
                if(attack.owner==suffer)continue

                //子弹自己不能碰撞自己
                if(attack==suffer)continue

                //判断攻与受的碰撞结果
                val result = attack.checkAttack(suffer)
                if (result) {
                    //找到碰撞者
                    //通知攻击者(受攻击者)
                    attack.notifyAttack(suffer)
                    //通知受攻击者(攻击者)
                    val blast = suffer.notifyAttack(attack)
                    blast?.let { list.addAll(it) }
                    //跳出里层循环
                    break
                }
            }
        }
        /*---------------------------- 敌机自动射击 ----------------------------*/
        val enemyList = list.filter { it is AutoShotAble }
        enemyList.forEach {
            it as AutoShotAble
            val bullet = it.autoShot()
            bullet?.let { list.add(it) }

        }
        /*---------------------------- 检测敌方出生 ----------------------------*/
        if(bornEnemy<totalEnemy&&list.filter { it is Enemy }.size<showEnemy){
            //随机
            //防止越界
            bornIndex %= locationList.size
            val pair = locationList[bornIndex]
            val enemy = Enemy(pair.first,pair.second)
            list.add(enemy)
            bornEnemy++
            bornIndex++
        }
        /*---------------------------- 判断游戏是否结束 ----------------------------*/
        if(list.find { it is Camp }==null||list.filter { it is Enemy }.isEmpty()){
            gameOver = true
        }

    }
}