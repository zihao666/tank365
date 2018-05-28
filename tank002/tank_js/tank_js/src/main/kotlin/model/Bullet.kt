package model

import Config
import business.AttackAble
import business.AutoMoveable
import business.DestoryAble
import business.SufferAble
import core.Painter
import enums.Direction


/**
 * ClassName:Bullet
 * Description:子弹
 */
class Bullet(override var owner: View, override var direction: Direction, block: (Int, Int) -> Pair<Int, Int>) : AutoMoveable, DestoryAble, AttackAble, SufferAble {
    override var blood: Int = 1

    override fun notifyAttack(attack: AttackAble): Array<View>? {
        blood--
        return null
    }

    override var attackPower: Int = 1

    override val speed: Int = 8
    override var x: Int = 0
    override var y: Int = 0

    override var width: Int = 0
    override var height: Int = 0
    //如果和墙碰撞 就需要销毁
    private var needDestory = false

    val imgpath by lazy {
        when (direction) {
            Direction.UP -> "img/bullet_u.gif"
            Direction.DOWN -> "img/bullet_d.gif"
            Direction.LEFT -> "img/bullet_l.gif"
            Direction.RIGHT -> "img/bullet_r.gif"
        }
    }

    init {
        val size = Painter.size(imgpath) {
            width = it[0]
            height = it[1]
            val pair = block(width, height)
            x = pair.first
            y = pair.second
        }


    }

    override fun draw() {
        Painter.drawImage(imgpath, x, y)
    }

    override fun autoMove() {
        when (direction) {
            Direction.UP -> y -= speed
            Direction.DOWN -> y += speed
            Direction.LEFT -> x -= speed
            Direction.RIGHT -> x += speed
        }
    }

    override fun needDestory(): Boolean {
        //是否碰撞
        return if (needDestory || x < 0 || x > Config.gameWidth || y < 0 || y > Config.gameHeight) true else false
    }

    override fun willCollision(suffer: SufferAble): Boolean {
        return if (y > suffer.y + suffer.height || y + height < suffer.y || x > suffer.x + suffer.width || x + width < suffer.x) false else true

//        if(y>=suffer.y+suffer.height){
//            return false
//        }else if(y+height<=suffer.y){
//            return false
//        }else if(x>=suffer.x+suffer.width){
//            return false
//        }else if(x+width<=suffer.x){
//            return false
//        }else {
//            return true
//        }
    }

    override fun notifyAttack(suffer: SufferAble) {
        needDestory = true
    }
}