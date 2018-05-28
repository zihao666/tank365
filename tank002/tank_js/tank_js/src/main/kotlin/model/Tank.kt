package model

import Config
import business.*
import core.Painter
import enums.Direction


/**
 * ClassName:Tank
 * Description:我方坦克
 */
class Tank(override var x: Int, override var y: Int) :Moveable,Blockable,SufferAble,DestoryAble {
    override fun needDestory(): Boolean = blood<=0


    override var blood: Int = 10

    override fun notifyAttack(attack: AttackAble): Array<View>? {
        blood--
        return arrayOf(Blast(x,y))
    }

    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    //坦克方向
    override var direction = Direction.UP
    //碰撞物
    override var badBlock:Blockable? = null
    //碰撞方向
    override var badDirection:Direction? = null

    //坦克的速度
    override val speed = 8

    //修改坦克方向
    fun move(dir:Direction){
        //可以先改变方向
        if(this.direction!=dir) {
            //修改坦克方向
            this.direction = dir
            return
        }

        //判断是否是碰撞方向
        if(this.direction == badDirection)return

        //修改坦克位置
        when(direction){
            Direction.UP -> y -= speed
            Direction.DOWN -> y += speed
            Direction.LEFT -> x -= speed
            Direction.RIGHT -> x += speed
        }

    }

    override fun draw() {
        Painter.drawImage(when (direction) {
            Direction.UP -> "img/tank_u.gif"
            Direction.DOWN -> "img/tank_d.gif"
            Direction.LEFT -> "img/tank_l.gif"
            Direction.RIGHT -> "img/tank_r.gif"
        }, x, y)
    }


    override fun notifyCollision(badBlock: Blockable?, badDirection: Direction?) {
        this.badBlock = badBlock
        this.badDirection = badDirection
    }

    /**
     * 射击方法
     * @return 子弹对象
     */
    fun shot():Bullet {
        //计算向上的子弹位置
        var bulletX = 0
        var bulletY = 0

        return model.Bullet(this,direction){ bulletWidth, bulletHeight->
            println("宽度:$bulletWidth 高度:$bulletHeight")
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
}