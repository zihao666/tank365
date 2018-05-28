package model

import Config
import business.*
import core.Painter
import enums.Direction
import kotlin.js.Date
import kotlin.js.Math.random


/**
 * ClassName:Enemy
 * Description:敌机
 */
class Enemy(override var x: Int, override var y: Int) : Moveable, AutoMoveable, Blockable, AutoShotAble, SufferAble, DestoryAble {
    override var blood: Int = 3

    override fun notifyAttack(attack: AttackAble): Array<View>? {
        //不要误伤友军
        if(attack.owner is Enemy) return null
        blood--
        return arrayOf(Blast(x,y))
    }

    override val interval: Int = 1000
    override var badBlock: Blockable? = null
    override var badDirection: Direction? = null
    override val speed: Int = 4

    val directions by lazy { Direction.values() }
    override fun autoMove() {
        if(direction==badDirection){
            direction = randomDirection(badDirection)
            return
        }
        when(direction){
            Direction.UP -> y -= speed
            Direction.DOWN -> y += speed
            Direction.LEFT -> x -= speed
            Direction.RIGHT -> x += speed
        }
    }

    /**
     * 自动产生一个方向移动
     */
    private fun randomDirection(badDirection: Direction?): Direction {
        //0到3随机数
        val random = (random()*4).toInt()
        val newDirection = directions.get(random)
        if(newDirection==badDirection){
           return randomDirection(badDirection)
        }
        return newDirection

//        val randomIndex = Random().nextInt(4)
//        //新方向
//        var newDirection = when(randomIndex){
//            0->Direction.UP
//            1->Direction.DOWN
//            2->Direction.LEFT
//            3->Direction.RIGHT
//            else->Direction.UP
//        }
//        //判断是否和碰撞的方向一致
//        if(newDirection==badDirection){
//            randomDirection(badDirection)
//        }
        return Direction.RIGHT
    }

    override var direction: Direction = Direction.DOWN


    override fun notifyCollision(badBlock: Blockable?, badDirection: Direction?) {
        this.badBlock = badBlock
        this.badDirection = badDirection
    }

    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    override fun draw() {
        Painter.drawImage(when (direction) {
            Direction.UP -> "img/enemy_1_u.gif"
            Direction.DOWN -> "img/enemy_1_d.gif"
            Direction.LEFT -> "img/enemy_1_l.gif"
            Direction.RIGHT -> "img/enemy_1_r.gif"
        }, x, y)
    }

    var startTime = Date().getTime().toLong()

    override fun autoShot(): Bullet? {
        //判断时间间隔是否够
        var cur = Date().getTime().toLong()
        if(cur-startTime<interval)return null
        startTime = cur

        //计算向上的子弹位置
        var bulletX = 0
        var bulletY = 0

        return Bullet(this,direction){bulletWidth,bulletHeight->
            when(direction){
                Direction.UP->{
                    bulletX = x+(width-bulletWidth)/2
                    bulletY = y-bulletHeight/2
                }
                Direction.DOWN->{
                    bulletX = x+(width-bulletWidth)/2
                    bulletY = y+height-bulletHeight/2
                }
                Direction.LEFT->{
                    bulletX = x - bulletWidth/2
                    bulletY = y + (height-bulletHeight)/2

                }
                Direction.RIGHT->{
                    bulletX = x +width-bulletWidth/2
                    bulletY = y + (height-bulletHeight)/2
                }
            }

            bulletX to bulletY
        }
    }

    override fun needDestory(): Boolean = blood<=0
}